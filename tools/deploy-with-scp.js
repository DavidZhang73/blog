const { realpathSync } = require('fs')
const WORK_DIR = realpathSync(__dirname + '/../')
const { startProcess, hexoClean, hexoGenerate } = require(WORK_DIR + '/tools/util.js')
const SSH = 'root@davidz.cn'

/**
 * 删除旧的文件
 */
function deleteOldFile() {
  const cmd = 'ssh'
  const args = [
    SSH,
    'bash',
    '-c',
    '"rm -rf /docker/blog/public/"',
  ]
  startProcess(cmd, args, 'Delete Old File')
}

/**
 * 上传新的文件
 */
function uploadNewFile() {
  let cmd = 'scp'
  const args = [
    '-B', // 使用批处理模式（传输过程中不询问传输口令或短语）
    '-C', // 允许压缩。（将-C标志传递给ssh，从而打开压缩功能）
    '-p', // 保留原文件的修改时间，访问时间和访问权限。
    '-r', // 递归复制整个目录。
    // '-v', // 详细方式显示输出。scp和ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。
    WORK_DIR + '/public\\', // 源
    `${SSH}:/docker/blog/`,
  ]
  startProcess(cmd, args, 'Upload New File', ['ignore', 'inherit', 'inherit'])
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
  hexoClean()
  hexoGenerate()
  deleteOldFile()
  uploadNewFile()
  restartNginx()
}

main()
