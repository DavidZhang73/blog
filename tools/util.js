const fs = require('fs')
const superagent = require('superagent')
const { spawnSync } = require('child_process')
const moment = require('moment')

/**
 * 运行一个进程
 * @param cmd 程序名
 * @param args 参数表
 * @param name 名称
 * @param stdio 选项
 */
function startProcess(cmd, args, name, stdio) {
  name && console.log(name + ':')
  if (!stdio) {
    const p = spawnSync(cmd, args)
    p.stdout && process.stdout.write(p.stdout.toString())
    p.stderr && process.stderr.write(p.stderr.toString())
  } else {
    spawnSync(cmd, args, { stdio })
  }
}

/**
 * Hexo Clean
 */
function hexoClean() {
  const cmd = 'node'
  const args = [
    'E:\\Lang\\js\\node\\node_modules\\npm\\bin\\npm-cli.js',
    'run',
    'clean',
    '--scripts-prepend-node-path=auto',
  ]
  startProcess(cmd, args, 'Hexo Clean')
}

/**
 * Hexo Generate
 */
function hexoGenerate() {
  const cmd = 'node'
  const args = [
    'E:\\Lang\\js\\node\\node_modules\\npm\\bin\\npm-cli.js',
    'run',
    'build',
    '--scripts-prepend-node-path=auto',
  ]
  startProcess(cmd, args, 'Hexo Generate')
}

/**
 * Hexo Deploy
 */
function hexoDeploy() {
  const cmd = 'node'
  const args = [
    'E:\\Lang\\js\\node\\node_modules\\npm\\bin\\npm-cli.js',
    'run',
    'deploy',
    '--scripts-prepend-node-path=auto',
  ]
  startProcess(cmd, args, 'Hexo Deploy')
}

/**
 * 从 public/baidusitemap.xml 中获取所有url
 */
function getUrlsFromXML() {
  let urls = []
  const xmlPath = "public/baidusitemap.xml"
  let xml = fs.readFileSync(xmlPath, "utf-8")
  const reg = /<loc>(.+)<\/loc>/g
  while (res = reg.exec(xml)) {
    urls.push(res[1])
  }
  return urls.join('\n')
}

/**
 * 主动送推送百度 Sitemap
 */
function pushBaiduSitemap() {
  console.log('Baidu Sitemap Push:')
  const url = 'http://data.zz.baidu.com/urls?site=https://blog.davidz.cn&token=chvBQnYZ7wDH8kgu'
  // const postData = getUrlsFromXML()
  superagent
    .post(url)
    .set({ 'Content-Type': 'text/plain' })
    .send(getUrlsFromXML())
    .end((err, res) => {
      if (err) {
        throw new Error(err)
      } else {
        console.log(`baidu sitemap: ${res.text}`)
      }
    })
}

/**
 * git commit
 */
function gitCommit() {
  const cmd = 'git'
  const args = [
    'commit',
    '-a',
    '-m',
    moment().format('YYYY-MM-DD')
  ]
  startProcess(cmd, args, 'Git Comment')
}

/**
 * git push
 */
function gitPush() {
  const cmd = 'git'
  const args = [
    'push',
    'origin',
    'master'
  ]
  startProcess(cmd, args, 'Git Push')
}

/**
 * 执行任务函数列表
 * @param taskList 任务函数列表
 */
function executeTaskList(taskList) {
  const len = taskList.length
  for (let i = 0; i < len; i++) {
    console.log('**************************************************')
    console.log(`当前: ${i + 1} / ${len}`)
    taskList[i]()
    console.log('**************************************************')
  }
}

module.exports = {
  startProcess,
  hexoClean,
  hexoGenerate,
  hexoDeploy,
  pushBaiduSitemap,
  gitCommit,
  gitPush,
  executeTaskList
}
