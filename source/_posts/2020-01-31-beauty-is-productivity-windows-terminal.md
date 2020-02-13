---
title: 颜值是第一生产力 - Windows Terminal
categories:
  - Productivity
tags:
  - Open-Source
  - Windows
  - Terminal
preview: 300
date: 2020-01-31 18:21:12
mp3: //davidz.cn/static/blog/mp3/chenyixun---hongmeigui.mp3
cover: //davidz.cn/static/blog/2020-01-31-beauty-is-productivity-windows-terminal/cover.jpg
---

## 回顾

![CMD](//davidz.cn/static/blog/2020-01-31-beauty-is-productivity-windows-terminal/cmd.png)

记得我最早的时候用 Visual Studio 写了第一个 Hello World 程序，激动的点运行，出来个黑框一闪就过去了，啥也没看到。

![PowerShell](//davidz.cn/static/blog/2020-01-31-beauty-is-productivity-windows-terminal/powershell.png)

后来偶然了解 PowerShell，又变成了一个蓝色的框，还会有进度提示，红的，黑的，突兀得很:cry:。

![bash](//davidz.cn/static/blog/2020-01-31-beauty-is-productivity-windows-terminal/bash.png)

后来上了大学终于在 Ubuntu 上见到了 bash，完全改变了我对 Shell 的认知。

傻傻分不清 Shell 和 Terminal 的我，激动的打开 Git 自带的 bash，它却长成了这样。

![Git-Bash](//davidz.cn/static/blog/2020-01-31-beauty-is-productivity-windows-terminal/git-bash.png)

一番优化之后也不是不能用，后来还入坑了 [Cmder](https://github.com/cmderdev/cmder)，用于替代 [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/) 那个更加原始的 terminal。

终于，2019 年微软开始进入开源世界，为我们带来了颜狗的胜利: [Windows Terminal](https://github.com/microsoft/terminal)。

<iframe
  src="//player.bilibili.com/player.html?aid=51700920&cid=90502402&page=1&high_quality=1&danmaku=0"
  allowfullscreen="true"
  width="100%"
  height="600"
  scrolling="no"
  frameborder="0"
  sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
  >
</iframe>

## 下载&安装

> 截止 2020 年 2 月 1 号，Windows Terminal 还处在测试阶段，但是已经相对比较完善了，正常使用没有什么大问题了。

### 方法 1: 通过 Windows Store

[点击这里安装](https://www.microsoft.com/en-us/p/windows-terminal-preview/9n0dx20hk701)

### 方法 2: 通过 Github

在 Github 的 [Release](https://github.com/microsoft/terminal/releases) 中下载最新的那个双击安装就好啦，和方法 1 是一样的。

### 方法 3: 通过 Scoop

> **不推荐**
> 用 wt 命令启动时会有一个 CMD 窗口，逼死强迫症。

Windows Terminal 在 Scoop 的 extras bucket 里面。

```powershell
scoop install windows-terminal
```

## 配置

通过配置，最终 terminal 可以长成这个样子。

![windows terminal](//davidz.cn/static/blog/2020-01-31-beauty-is-productivity-windows-terminal/windows-terminal.png)

现阶段只有 json 格式的配置文件，还没有图形化配置界面，项目组说正式版会有，最终应该会与 Vscode 的配置一样。

根据官网给出的 [Profiles Schema](https://raw.githubusercontent.com/microsoft/terminal/master/doc/cascadia/profiles.schema.json)，我们可以很快的配置我们自己定制化的 Terminal。

下面是我自己用的配置文件，

```json
{
  "$schema": "https://aka.ms/terminal-profiles-schema",
  "defaultProfile": "{807502AB-0C92-4DF7-9C7C-1E9F7A2A47DE}", // 默认配置的 GUID， 和下面的 profiles.list 中的一个相同
  "alwaysShowTabs": true, // 无论有几个 tab 是否都显示标签栏
  "requestedTheme": "dark", // "light","dark","system"
  "copyOnSelect": true, // 选择时复制
  "launchMode": "maximized", // "maximized","default"
  "profiles": {
    // shell 或程序的配置
    "defaults": {
      // 所有 shell 或程序配置的默认值
      "acrylicOpacity": 0.7, // 背景透明度
      "useAcrylic": true, // 是否启用透明背景
      "colorScheme": "One Half Dark", // 色彩配置，和下面 schemes 中的一个相同
      "fontFace": "JetBrains Mono", // 字体
      "fontSize": 12, // 字号
      "startingDirectory": ".", // 工作路径，设置成 “.” 可以实现在资源管理器的地址栏输入 wt 直接打开时工作目录是当前目录
      "closeOnExit": "always" // "never","graceful","always"
    },
    "list": [
      {
        "guid": "{807502AB-0C92-4DF7-9C7C-1E9F7A2A47DE}", // 唯一 GUID
        "name": "powershell core", // 在下拉框中显示的名称
        "commandline": "pwsh.exe -nol", // 执行的命令，-nol 的作用是不显示 Microsoft 那些提示
        "icon": "path/to/icon" // 标签栏和下拉菜单中显示的图标
      },
      {
        "guid": "{85933BC0-E5D2-4299-9FBC-AC6C9F6DFD46}",
        "name": "davidz.cn",
        "commandline": "ssh.exe root@davidz.cn", // ssh 也可以，用于代替 Putty
        "icon": "path/to/icon"
      }
    ]
  },
  "schemes": [
    // 配色
    {
      "name": "One Half Dark", // 我最喜欢的主题，Vscode，VS，JetBrains 全家桶都有类似主题，关键词 atom one dark
      "background": "#282C34",
      "black": "#282C34",
      "blue": "#61AFEF",
      "brightBlack": "#5A6374",
      "brightBlue": "#61AFEF",
      "brightCyan": "#56B6C2",
      "brightGreen": "#98C379",
      "brightPurple": "#C678DD",
      "brightRed": "#E06C75",
      "brightWhite": "#DCDFE4",
      "brightYellow": "#E5C07B",
      "cyan": "#56B6C2",
      "foreground": "#DCDFE4",
      "green": "#98C379",
      "purple": "#C678DD",
      "red": "#E06C75",
      "white": "#DCDFE4",
      "yellow": "#E5C07B"
    }
  ]
}
```

> GUID 可以使用这个[在线网站](https://www.guidgen.com) 或者 Visual Studio 自带的工具 guidgen 生成。

### 主题

除了我最喜欢的这个 One Half Dark，你还可以在[这里](https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/windowsterminal)选择自己喜欢的主题，复制到配置文件即可。

### 字体

我推荐使用 JetBrains 推出的字体 [JetBrains Mono](https://www.jetbrains.com/lp/mono/)，这是一款适合写代码的带连字的字体。类似的字体还有微软特意为 Windows Terminal 开发的 [Cascadia Code](https://github.com/microsoft/cascadia-code)，或者是 Mozilla 主推由 Nikita Prokopov 开发的 [Fira Code](https://github.com/tonsky/FiraCode)。

这些字体都在积极的维护和更新中，除了双击安装之外，还可以使用 Scoop 安装方便更新。在 Scoop 的 nerd-fonts bucket 中。

```powershell
scoop install JetBrains-Mono
```

## [PowerShell Core](https://github.com/PowerShell/PowerShell)

PowerShell Core 是微软推出的基于 .Net Core 跨平台开源脚本语言，用于代替 PowerShell 和更加原始的 CMD。目前来看在国内基本上没什么影响力，国外相对好一些。除非大家都用 Windows Server 作为服务器，否则我感觉前景也不是很乐观。但是作为个人使用起来还是很好用的。

PowerShell Core 也有自己的模块管理平台 [PowerShell Gallery](https://www.powershellgallery.com)。

搜索

```powershell
Find-Module xxx
```

安装

```powershell
Install-Module xxx
```

卸载

```powershell
Uninstall-Module xxx
```

更新

```powershell
Update-Module xxx
```

类似于 `.bashrc` 之与 bash， `.zshrc` 之与 zsh，PowerShell 也有自己的配置文件`Microsoft.PowerShell_profile.ps1`，可以通过`$PROFILE`访问。

使用模块`Module`时，

```powershell
Import-Module xxx
```

如果每次启动 PowerShell 都想引用该插件，则在`Microsoft.PowerShell_profile.ps1`中添加`Import-Module xxx`即可。

### [oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh)

这个是 oh-my-zsh 的 PowerShell 版本，但是只能管理主题。

![robbyrussel](//davidz.cn/static/blog/2020-01-31-beauty-is-productivity-windows-terminal/robbyrussel.png)

我比较喜欢的是这个 robbyrussel 主题，因为比较简洁。

![my-theme](//davidz.cn/static/blog/2020-01-31-beauty-is-productivity-windows-terminal/my-theme.png)

后来参考了[dotfiles](https://github.com/spencerwooo/dotfiles#powershell)，自己按照 oh-my-zsh 的 ys 主题魔改了一个，为了区分不同环境，我把最前面的符号改成了`PS`。

[我的主题](https://github.com/DavidZhang73/Config/blob/master/themes/MyTheme.psm1)

### [z](https://github.com/vincpa/z)

类似于 autojump，实现原理就是每次 cd 都记录下来，然后 z name 会去匹配访问最多的那个路径，直接跳转到。非常实用。

## Linux or [Windows Subsystem for Linux](https://docs.microsoft.com/zh-cn/windows/wsl/about)

我用了好久好久的 bash 才终于知道了还有像 zsh，fish 这样更加人性化的 shell。从前者切换到后者，就像从 dos 切换到 windows 一样惊艳。

### [ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

这个是 zsh 的插件平台，支持添加主题，工具等等插件。

#### z（内置）

和上面 PowerShell 中的 z 是一样的。

#### git（内置）

这个主要是 git 命令的提示与自动补全（我没怎么用过）。

#### sudo（内置）

当你输入`apt update`提示无法获得锁的时候，按上键加两下`esc`就可以自动加上`sudo`啦。

#### extract（内置）

你背的过不同压缩文件的解压命令吗？？？背不过的话还是用用`extract`吧。

#### [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/)

根据命令历史记录自动建议，按右键自动补全。

#### [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

命令高亮。

具体的配置文件可以参考[这里](https://github.com/DavidZhang73/Config/blob/master/dotfiles/.zshrc)。同时，如果你和我一样闲的话，也可以写一个简单的[一键配置脚本](https://github.com/DavidZhang73/Config)，这样只需要有网络链接的环境下，就可以一键还原 zsh 环境了。

### dircolors

在 WSL 里面使用默认的`.dircolors`可能会亮瞎眼，所以可以使用 [dircolors-solarize](https://github.com/seebi/dircolors-solarized)作为代替。

下载后放到用户目录里面，在`.zshrc`里面添加

```shell
eval $(dircolors -b $HOME/.dircolors)
```

即可。

## 推荐阅读

[Dev on Windows with WSL](https://dowww.spencerwoo.com/) - 强烈推荐

[5 个 PowerShell 主题，让你的 Windows 终端更好看](https://sspai.com/post/52907)

[告别 Windows 终端的难看难用，从改造 PowerShell 的外观开始](https://sspai.com/post/52868)
