---
title: Windows 包管理器 - Scoop
categories:
  - Productivity
tags:
  - Open-Source
  - Windows
preview: 300
date: 2020-02-03 12:43:11
mp3: //davidz.cn/static/blog/mp3/wangsulong-_-by2---youdiantian.mp3
cover: //davidz.cn/static/blog/2020-02-03-windows-package-manager-scoop/cover.png
---

## 前言

一直以来，作为开发者，Windows 相较于 Linux 都缺少两样重要的工具，

1. **好用**的 Shell - 现在可以用 PowerShell Core 或者 WSL 暂时代替。
2. **好用**的包管理器 - 在开发时 C/Cpp 的库可以用[VCPKG](https://github.com/microsoft/vcpkg)，而日常使用的软件就可以使用本文的主角[Scoop](https://github.com/lukesampson/scoop) 了。

## 安装

> 按照官网的[教程](https://github.com/lukesampson/scoop/wiki/Quick-Start),只能使用 PowerShell 而不是 CMD 进行安装。

```powershell
# 指定 Scoop 的安装路径，之后安装的 APP 会安装在 path/to/scoop/apps/
$env:SCOOP='path/to/scoop'
[environment]::setEnvironmentVariable('SCOOP',$env:SCOOP,'User')
# 安装 Scoop
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
```

### [Buckets](https://github.com/lukesampson/scoop/wiki/Buckets)

Scoop 只是一个包安装器，我们还需要软件源。

使用，

```powershell
scoop bucket known
```

可以列出所有官方已知并推荐的源，使用，

```powershell
scoop bucket add <bucket-name>
```

即可安装源。

1. `main` - Scoop 官方默认主源，里面所有的软件符合[标准](https://github.com/lukesampson/scoop/wiki/Criteria-for-including-apps-in-the-main-bucket)。
2. `extras` - Scoop 官方扩展你源，里面的软件不完全符合标准。
3. `versions` - 可选版本的源。
4. `nightlies` - nightly 软件源，不推荐。
5. `nirsoft` - [Nir Sofer](https://nirsoft.net/)开发的软件。
6. `php` - 不同版本的 php。
7. `nerd-fonts` - [Nerd Fonts](https://github.com/ryanoasis/nerd-fonts) 和一些其他字体。
8. `nonportable` - 非便携软件（可能需要 UAC）。
9. `java` - 不同版本的 JDK，JRE。
10. `games` - 开源或免费的游戏以及游戏工具。
11. `jetbrains` - JetBrains 全家桶。

## 使用

和 Ubuntu 的 apt，CentOS 的 yum 基本相同。

```powershell
# 搜索
scoop search <package-name>
# 查看主页
scoop home <package-name>
# 安装
scoop install <package-name>
# 更新
scoop update <package-name>
# 卸载
scoop uninstall <package-name>
# 更新 Scoop，所有源，所有软件包
scoop update *
# 列出所有软件包
scoop list
```

## 推荐的软件包

### [aria2](https://aria2.github.io/)

基本上常见的所有开源下载软件都是基于这个，不但可以跑在 x86 的电脑上， mips 的路由器，arm 的手机都不是问题。

需要注意的是，安装 aria2 后，Scoop 的默认下载器会自动改成 aria2，并开启多线程下载。

### [7zip](https://www.7-zip.org/)

界面超原始，但是替代个收费的 WinRAR，以及一众国内带广告的解压软件不是问题。同时 Scoop 有时候也依赖于 7zip 来解压。

### [adb](https://developer.android.com/studio/releases/platform-tools.html)

有的时候连个安卓手机就需要这个东西，虽然我不做安卓开发，但是我玩过[微信跳一跳](https://github.com/chiqj/WechatJump)呀。

### [bat](https://github.com/sharkdp/bat)

![bat](//davidz.cn/static/blog/2020-02-03-windows-package-manager-scoop/bat.png)

用于代替 cat，带行号，带高亮，可`tail -f`。

### [cpu-z](https://www.cpuid.com/softwares/cpu-z.html)

![cpuz](//davidz.cn/static/blog/2020-02-03-windows-package-manager-scoop/cpuz.png)

著名的 CPU 信息查看软件。

### [fiddler](https://www.telerik.com/fiddler)

著名的抓包软件，大学机考神器（CCTR-E 的题目和答案一起传输，哈哈哈）。

### [figlet](https://github.com/lukesampson/figlet)

![figlet](//davidz.cn/static/blog/2020-02-03-windows-package-manager-scoop/figlet.png)

把字符串改成字符串图像，还有好几个主题，现在知道那些文档的开头是怎么生成了吧:smile:。

### [git](https://gitforwindows.org/)

什么，你没听说过 git ！！！，右上角，再见:cry:。

### [motrix](https://motrix.app/)

![motrix](//davidz.cn/static/blog/2020-02-03-windows-package-manager-scoop/motrix.png)

使用 Electron 开发的 aria2 GUI 客户端，可惜不能指定 aria2，只能使用自带的。

### [neofetch](https://github.com/dylanaraps/neofetch)

![neofetch](//davidz.cn/static/blog/2020-02-03-windows-package-manager-scoop/neofetch.png)

当你想截个屏，展示一下你的 Terminal 又不知道放什么内容时，就它了。

### [psutils](https://github.com/lukesampson/psutils)

Scoop 同开发者开发的一系列 PowerShell 工具，我就说 PS 在国外还是很火的吧。

- gitignore - 从 gitignore.io 获取 .gitignore 文件模板并打印出来。
- ln - 类似于 Linux 的 ln，实现"软连接"。
- runat - at 命令（微软从 Windows Server 2012 开始废弃）。
- say - 类似于 MacOS 的 say，让电脑说话。
- shasum - 类似于 Linux 下的 shasum，校验文件。
- sudo - 类似于 Linux 的 sudo，但是会显示 UAC 弹出窗口。
- time - 类似 Linux 的 time，显示程序运行时间。
- touch - 类似 Linux 的 touch，创建文件。
- vimtutor - 因为 Scoop 中的 vim 自带的 vimtutor 无法使用，所以有了这个。

### [snipaste](https://www.snipaste.com/)

![snipaste](https://i.v2ex.co/71Ftp04b.png)

带边缘检测的强大截图软件。

### [spacesniffer](http://www.uderzo.it/main_products/space_sniffer/index.html)

![spacesniffer](//davidz.cn/static/blog/2020-02-03-windows-package-manager-scoop/spacesniffer.png)

想知道那个文件夹占用了你的 C 盘最多？

### [teamviewer](https://www.teamviewer.com/)

在山威如何快速获得妹子的 QQ，微信和手机号？加入[极客鸟](https://www.baidu.com/link?url=FSXLyJOtkvCZMj4zl2J-mFLG0Q1GrF6rysPOH8fHKwIAF44VnyyhI7fUML9i99xH&wd=&eqid=cbce32e700025b47000000065e37cf45)，用 Teamviewer 帮妹子修电脑吧。

### [wget](https://eternallybored.org/misc/wget/)

下载个 1kb 的文本文件还需要动用迅雷？aria2？`wget`一行命令搞定。

### [win32-openssh](https://github.com/PowerShell/Win32-OpenSSH)

微软已经把 ssh 迁移到 Windows 平台上啦。

### [winscp](https://winscp.net/eng/docs/lang:chs)

![winscp](//davidz.cn/static/blog/2020-02-03-windows-package-manager-scoop/winscp.png)

图形化管理服务器的文件。

## 软件结构

![目录结构](//davidz.cn/static/blog/2020-02-03-windows-package-manager-scoop/tree.png)

虽然结构还是很清晰的，但不得不说，这几个名字起的太谜了。

### apps

这个目录下面时所有安装的软件包。每个软件包都是这样的，

![apps](//davidz.cn/static/blog/2020-02-03-windows-package-manager-scoop/apps.png)

每个 app 的 current 都指向最新的那个文件夹。

### buckets

![buckets](//davidz.cn/static/blog/2020-02-03-windows-package-manager-scoop/buckets.png)

这个目录下是所有安装的源。

实际上每个源只是一个单独的 git 仓库，仓库里面有该源的所有软件包的信息文件。Scoop 依照这个信息文件安装配置软件包。

比如 7zip 的，

```json
{
  "homepage": "https://www.7-zip.org/",
  "description": "A multi-format file archiver with high compression ratios",
  "license": {
    "identifier": "Freeware,LGPL-2.0-only,BSD-3-Clause",
    "url": "https://www.7-zip.org/license.txt"
  },
  "version": "19.00",
  "architecture": {
    "64bit": {
      "url": "https://7-zip.org/a/7z1900-x64.msi",
      "hash": "a7803233eedb6a4b59b3024ccf9292a6fffb94507dc998aa67c5b745d197a5dc"
    },
    "32bit": {
      "url": "https://7-zip.org/a/7z1900.msi",
      "hash": "b49d55a52bc0eab14947c8982c413d9be141c337da1368a24aa0484cbb5e89cd"
    }
  },
  "extract_dir": "Files/7-Zip",
  "bin": "7z.exe",
  "checkver": {
    "url": "https://www.7-zip.org/download.html",
    "regex": "Download 7-Zip ([\\d.]+)"
  },
  "autoupdate": {
    "architecture": {
      "64bit": {
        "url": "https://7-zip.org/a/7z$cleanVersion-x64.msi"
      },
      "32bit": {
        "url": "https://7-zip.org/a/7z$cleanVersion.msi"
      }
    }
  },
  "shortcuts": [["7zFM.exe", "7-Zip"]]
}
```

### cache

这个目录里面是下载的软件包安装程序等等缓存。

### persist

这个目录存放的是这些软件的配置之类的文件，这些文件的特点是在软件更新时不变。

### shims

这个目录是所有软件包的快捷方式。

每一个软件包都对应三个，

1. package-name.exe
2. package-name.ps1
3. package-name.shim

我其实有个疑问，我在命令行里输`package-name`，执行的是`package-name.exe`还是`package-name.ps1`呢？

简单的测试后发现，是根据使用的 shell 确定的，CMD 里面是`package-name.exe`，而 PowerShell 里面是 `package-name.ps1`。

## 软件包管理哲学

> ### 引用自 [SpencerWoo](https://sspai.com/u/spencerwoo/posts)
>
> 最后我还是想说一说：为什么我们推荐使用「包管理」？
> 在写这篇文章之前我也看了我派上面对包管理工具介绍的文章，我觉得这些文章其实都没太讲清为什么我们需要用「包管理」这个看上去复杂难用的命令行工具去下载、管理我们的软件。毕竟现在的软件管理哲学是「我去 App Store 下一个不就行了嘛？」
> 需要明确的是：包管理的设计初衷是为了方便开发者管理和搭建开发环境。用包管理工具能够快速的安装开发工具、开发依赖，从而免去复杂的路径、环境变量等信息的配置。而我们作为普通用户，实际上用「包管理」工具的过程，就是在借鉴这种「软件管理哲学」。
> 但更重要的，也是更对我们用户安装基本软件的过程来说的，是我前文提到的：
> 一行代码省去了搜索、筛选、下载等繁琐步骤
> 安装方便、更新方便、卸载也方便
> 同时也最大程度杜绝了流氓捆绑软件的安装（因为 Scoop 本身和 Scoop 安装过程参考的配置文件都是开源的，要安装什么一目了然）
> 这些都是传统的「搜索 - 筛选 - 下载」的软件管理过程带来的复杂过程和安全隐患的极佳解决方法。
> 尝试一下 Scoop 吧！如果你对这个简洁、克制却依旧强大的工具产生兴趣，你一定离高阶 Windows 用户不远了。

## 推荐阅读

[「一行代码」搞定软件安装卸载，用 Scoop 管理你的 Windows 软件](https://sspai.com/post/52496)
