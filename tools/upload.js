const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const pinyin = require('pinyin')
const util = require('util')

const WORK_DIR = fs.realpathSync(__dirname + '/../')
const DRAFT_DIR = WORK_DIR + '/source/_drafts/'
const POST_DIR = WORK_DIR + '/source/_posts/'
const TMP_DIR = WORK_DIR + '/tmp/'
const REMOTE_DIR = '/docker/nginx/www/static/blog/'
const SSH = 'root@davidz.cn'
const { startProcess } = require(WORK_DIR + '/tools/util.js')

function normalizeFilename (filename) {
  const tokens = pinyin(filename, {
    style: pinyin.STYLE_NORMAL,
  })
  let str = ''
  tokens.forEach(e => {
    str += e
  })
  return str.trim().toLowerCase().replace(/\s/g, '-')
}

function getPostAndDraftList () {
  let ret = []
  const draftList = fs.readdirSync(DRAFT_DIR)
  const postList = fs.readdirSync(POST_DIR)
  for (let i = 0; i < draftList.length; i++) {
    if (fs.statSync(DRAFT_DIR + draftList[i]).isFile()) {
      ret.push(draftList[i].split('.')[0])
    }
  }
  for (let i = 0; i < postList.length; i++) {
    if (fs.statSync(POST_DIR + postList[i]).isFile()) {
      ret.push(postList[i].split('.')[0])
    }
  }
  return ret.sort((a, b) => {
    if (a === b) {
      return 0
    } else {
      return a < b ? 1 : -1
    }
  })
}

function getMarkdown (name, pathname) {
  return `![${name}](${pathname.replace(REMOTE_DIR,
    '//davidz.cn/static/blog/')})`
}

function getFileUploadMap (post, fileList) {
  let ret = []
  for (let i = 0; i < fileList.length; i++) {
    const fileExt = path.extname(fileList[i])
    const filename = fileList[i].replace(fileExt, '')
    const remoteName = normalizeFilename(fileList[i])
    let remotePathname
    if (fileExt === '.mp3' || fileExt === '.flac') {
      remotePathname = `${REMOTE_DIR}mp3/${remoteName}`
    } else {
      remotePathname = `${REMOTE_DIR}${post}/${remoteName}`
    }
    ret.push({
      name: fileList[i],
      localPathname: TMP_DIR + fileList[i],
      remotePathname: remotePathname,
      markdown: getMarkdown(filename, remotePathname),
    })
  }
  return ret
}

function uploadUseScp (localPathName, remotePathName) {
  let cmd = 'ssh'
  let args = [
    SSH,
    'bash',
    '-c',
    `"mkdir ${path.dirname(remotePathName)}"`,
  ]
  startProcess(cmd, args, null)
  cmd = 'scp'
  args = [
    '-B', // 使用批处理模式（传输过程中不询问传输口令或短语）
    '-C', // 允许压缩。（将-C标志传递给ssh，从而打开压缩功能）
    '-p', // 保留原文件的修改时间，访问时间和访问权限。
    localPathName,
    `${SSH}:${remotePathName}`,
  ]
  startProcess(cmd, args, null, ['ignore', 'inherit', 'inherit'])
}

function uploadHandle (post, fileList) {
  const fileUploadMap = getFileUploadMap(post, fileList)
  console.table(fileUploadMap, ['name', 'remotePathname', 'markdown'])
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'ifUpload',
      message: 'File(s) above will be uploaded, are you sure?',
      default: false,
    },
  ]).then(answers => {
    if (answers.ifUpload) {
      fileUploadMap.forEach(file => {
        uploadUseScp(file.localPathname, file.remotePathname)
        fs.unlinkSync(file.localPathname)
      })
    }
  })
}

function main () {
  inquirer.prompt([
    {
      type: 'list',
      name: 'post',
      message: 'Which post?',
      choices: getPostAndDraftList(),
    },
  ]).then(answers => {
    const tmpList = fs.readdirSync(TMP_DIR)
    const post = answers.post
    if (tmpList.length) {
      uploadHandle(post, tmpList)
    } else {
      console.log('No file, bye')
    }
  })
}

main()
