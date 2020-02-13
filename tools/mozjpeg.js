const fs = require('fs')
const path = require('path')

const WORK_DIR = fs.realpathSync(__dirname + '/../')
const { startProcess } = require(WORK_DIR + '/tools/util.js')
const TMP_DIR = WORK_DIR + '/tmp/'

function main() {
    const tmpList = fs.readdirSync(TMP_DIR)
    tmpList.forEach(tmp => {
        const pathname1 = `${TMP_DIR}${tmp}`
        const pathname2 = `${TMP_DIR}~tmp.jpeg`
        const args = [
            '-quality',
            '80',
            '-outfile',
            pathname2,
            pathname1
        ]
        startProcess('mozjpeg', args, 'MozJpeg')
        fs.renameSync(pathname2, pathname1)
    })
}

main()