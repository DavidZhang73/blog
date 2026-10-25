"""Build output only: verify both staging trees, then publish with rollback."""
import hashlib
import os
from pathlib import Path
import re
import shlex
import subprocess
import tempfile

SITE = '/opt/1panel/www/sites/blog.davidz.cn'
TARGET = SITE + '/index/'

def run(argv, **kw):
    return subprocess.run(argv, check=True, **kw)


def main():
    release = os.environ['GITHUB_RUN_ID'] + '-' + os.environ['GITHUB_RUN_ATTEMPT']
    if not re.fullmatch(r'\d+-\d+', release):
        raise ValueError('Invalid release identifier')
    public = Path('public')
    files = sorted(p for p in public.rglob('*') if p.is_file())
    assert files and all(not p.is_symlink() for p in public.rglob('*'))
    for required in ('index.html',):
        assert (public / required).is_file()
    manifest = ''.join(hashlib.sha256(p.read_bytes()).hexdigest() + '  ' + str(p.relative_to(public)) + '\n' for p in files)
    with tempfile.TemporaryDirectory() as temp:
        key = Path(temp) / 'key'
        key.write_text(os.environ['SSH_PRIVATE_KEY'] + '\n')
        key.chmod(0o600)
        sums = Path(temp) / 'SHA256SUMS'
        sums.write_text(manifest)
        hosts = []
        for prefix, expected_host, expected_user in [('', '101.132.243.87', 'root'), ('SF_', '43.153.17.172', 'ubuntu')]:
            def env(name):
                return os.environ[prefix + name]
            assert env('DEPLOY_HOST') == expected_host
            assert env('DEPLOY_USER') == expected_user
            assert env('DEPLOY_PORT') == '22' and env('TARGET') == TARGET
            trust = Path(temp) / (prefix + 'known_hosts')
            trust.write_text(env('SSH_KNOWN_HOSTS') + '\n')
            trust.chmod(0o600)
            ssh = ['ssh', '-i', str(key), '-o', 'IdentitiesOnly=yes', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', '-o', 'UserKnownHostsFile=' + str(trust), '-p', '22']
            remote = expected_user + '@' + expected_host
            sudo = 'sudo -n ' if prefix else ''
            stage = SITE + '/.deploy/' + release
            backup = stage + '/previous'
            def command(script, ssh=ssh, remote=remote, sudo=sudo):
                return run(ssh + [remote, sudo + 'bash -se'], input=script, text=True)
            command(f'test -d {TARGET}; test ! -L {SITE}; test ! -L {TARGET}; command -v rsync; command -v sha256sum; test ! -e {stage}\n')
            hosts.append((expected_host, ssh, remote, sudo, stage, backup, command))
        # Both identities and existing privileges are checked before uploading.
        for host, ssh, remote, sudo, stage, backup, command in hosts:
            command(f'umask 022; mkdir -p {stage}/public\n')
            opts = ['rsync', '-rtz', '--chmod=D755,F644', '--stats', '-e', shlex.join(ssh), '--rsync-path=' + sudo + 'rsync']
            run(opts + ['public/', remote + ':' + stage + '/public/'])
            run(opts + [str(sums), remote + ':' + stage + '/SHA256SUMS'])
            command(f'cd {stage}/public; sha256sum --quiet -c ../SHA256SUMS; test "$(find . -type f | wc -l)" -eq {len(files)}; cp -a {TARGET.rstrip("/")} {backup}\n')
            print(host, 'staging verified', len(files), 'files', flush=True)
        attempted = []
        try:
            for host, ssh, remote, sudo, stage, backup, command in hosts:
                attempted.append((host, backup, command))
                # No live --delete: old fingerprint URLs remain available.
                command(f'rsync -rt --exclude="*.html" {stage}/public/ {TARGET}\nrsync -rt --include="*/" --include="*.html" --exclude="*" {stage}/public/ {TARGET}\ncd {TARGET}; sha256sum --quiet -c {stage}/SHA256SUMS\n')
                for route, filename in [('/', 'index.html')]:
                    response = Path(temp) / ('response-' + host)
                    run(['curl', '--fail', '--silent', '--show-error', '--max-time', '30', '--resolve', 'blog.davidz.cn:443:' + host, '-o', str(response), 'https://blog.davidz.cn' + route])
                    if hashlib.sha256(response.read_bytes()).digest() != hashlib.sha256((public / filename).read_bytes()).digest():
                        raise RuntimeError('Origin HTTPS body differs from this build: ' + host)
                print(host, 'published and HTTPS verified', os.environ['GITHUB_SHA'], flush=True)
        except BaseException:
            for host, backup, command in reversed(attempted):
                try:
                    # Exact site-only restoration from the prepublication snapshot.
                    command(f'test -d {backup}; test -f {backup}/index.html; test ! -L {TARGET}; rsync -a --delete {backup}/ {TARGET}\n')
                    print(host, 'rollback completed', flush=True)
                except Exception:
                    print(host, 'ROLLBACK FAILED: retained backup at', backup, flush=True)
            raise
        print('Both origins published; staging and previous versions retained.', flush=True)

if __name__ == '__main__':
    main()
