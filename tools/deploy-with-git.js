const { realpathSync } = require('fs')
const WORK_DIR = realpathSync(__dirname + '/../')
const {
  startProcess,
  hexoGenerate,
  hexoDeploy,
  pushBaiduSitemap,
  gitCommit,
  gitPush,
  executeTaskList
} = require(WORK_DIR + '/tools/util.js')
const SSH = 'root@davidz.cn'

/**
 * 远程 git pull
 */
function remotePull() {
  const cmd = 'ssh'
  const args = [
    SSH,
    'bash',
    '-c',
    '"cd /docker/blog/public/ && git pull"',
  ]
  startProcess(cmd, args, 'Remote Pull')
}

/**
 * 重启nginx
 */
function restartNginx() {
  const cmd = 'ssh'
  const args = [
    SSH,
    'bash',
    '-c',
    '"docker restart nginx"',
  ]
  startProcess(cmd, args, 'Restart Nginx')
}

/**
 * 主函数
 */
function main() {
  executeTaskList([
    hexoGenerate,
    pushBaiduSitemap,
    hexoDeploy,
    remotePull,
    restartNginx,
    gitCommit,
    gitPush
  ])
}

main()