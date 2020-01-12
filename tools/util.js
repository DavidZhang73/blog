const { spawnSync } = require('child_process')

/**
 * 运行一个进程
 * @param cmd 程序名
 * @param args 参数表
 * @param name 名称
 * @param stdio 选项
 */
function startProcess (cmd, args, name, stdio) {
  name && console.log(name + ':')
  if (!stdio) {
    const p = spawnSync(cmd, args)
    p.stdout && process.stdout.write(p.stdout.toString())
    p.stderr && process.stderr.write(p.stderr.toString())
  } else {
    spawnSync(cmd, args, { stdio })
  }
}

module.exports = {
  startProcess,
}
