---
title: 卸载浪潮安装的 IP-GUARD 监控软件
categories:
  - Internship
tags:
  - Windows
date: 2020-02-11 17:07:43
cover: https://davidz-blog.oss-cn-beijing.aliyuncs.com/img/langchao-1599636307.jpg
---

## 前言

> 屋漏更遭连夜雨，船迟又遇打头风。

刚刚处理完 Docker 里面的“病毒”，又发现自己的笔记本被安装了监控软件，身后一阵凉风。

## 发现

> 事发突然，因为影响我开发，所以也没有来得及截图。

为了使用 WSL2 里面的 Docker，我加入了 `Windows 预览体验计划 - 慢`，把系统升级到了 Windows 10 2004。结果怪事就出现了——基本上所有的命令行都会在执行前显示一个错误。

```shell
ANOMALY: use of REX.w is meaningless (default operand size is 64)
```

从来没见过这个错误，我进入安全模式发现竟然也会报错，在百度 + 谷歌 + stackoverflow 依然无任何有效答案后，陷入了绝望:cry:。

本来呢，这个只是报个错，并不是什么大问题（~~我本身有一点强迫症，不能忍~~），但是 JetBrains 全家桶全部报错找不到 Git，CLion 报错找不到 VS。这就严重影响我开发了。Windows 预览体验计划还非常坑，不能回退，于是我又尝试了`Windows 预览体验计划 - 快`，结果问题依旧。

终于我突发奇想在 Github 上搜了一下（~~不是到我当时咋想的，病急乱投医把~~），发现了一个叫[mhook](https://github.com/martona/mhook)的项目，在其类库代码中发现了[disasm_x86](https://github.com/martona/mhook/blob/master/disasm-lib/disasm_x86.c#L1749)这个文件，在第 1749 行发现了错误提示的源代码。

```c
if (!SuppressErrors) printf("[0x%08I64X] ANOMALY: use of REX.w is meaningless (default operand size is 64)\n", VIRTUAL_ADDRESS);
```

现在我大体知道了这个问题产生的原因。

1. disasm 是一个 hook（钩子）库，可以注入到别的程序。
2. 更新系统后，这个钩子库和新的系统发生了冲突，于是报错，理论上所有被注入的程序都会报错。
3. 这个钩子应该是个**监控软件**或者病毒木马之类的。

我想起了在浪潮实习的时候，我的老师给我说浪潮作为面向政府国企的公司，对内部信息安全非常重视，所以会在员工的电脑里面安装监控软件，监控员工的一举一动，我当时感觉应该不会对实习生下手吧，想不到。。。回想起来，应该是入职浪潮的时候安装的那个上网小助手吧。

于是我下载了[freefixer](https://www.freefixer.com/)，查找注入的钩子，果不出其然，发现了在系统中安装的[IP-GUARD](http://www.ip-guard.net/)。按照官网的介绍，监控能力之强，范围之广令人汗颜，从网络到文件，邮件，应用等等，简直神通广大。

## 处理

我已经离职多日，第一时间肯定是卸载这个监控软件，直接删除文件肯定不行，结果 freefixer 也卸不掉（卸载完重启又出现），没有办法，只能到 WinPE 中手动逐一筛查，删除。

基本步骤如下

### 1. 进入 WinPE

> 安全模式也会打开例如 explorer.exe 这样的系统进程，而监控软件也注入到了其中，所以安装全模式也不能删除

这里免费帮[优启通](https://www.itsk.com/forum.php?mod=viewthread&tid=404842)做个广告。

下载上面这个 PE 安装到本地或者 U 盘 都行，然后重启进入 WinPE 就好了。

### 2. 到系统盘中删除对应的所有文件

想不到这个公司还是很良心的，所有程序文件都签了名，在 freefixer 上查得到，叫[T.E.C Solutions (G.Z.)Limited](<https://www.freefixer.com/library/publisher/t.e.c%20solutions%20(g.z.)limited/>)。

> 下面这些文件都是在 freefixer 上有记录的文件，可以作为检测 IP-GUARD 是否安装的标志。

|                                    File Name                                    |
| :-----------------------------------------------------------------------------: |
|  [ONacAgent.exe](https://www.freefixer.com/library/file/ONacAgent.exe-211770/)  |
| [TIjtdrvd64.dll](https://www.freefixer.com/library/file/TIjtdrvd64.dll-261434/) |
| [thooksv364.dll](https://www.freefixer.com/library/file/thooksv364.dll-261436/) |
|  [ONacAgent.exe](https://www.freefixer.com/library/file/ONacAgent.exe-206855/)  |
| [winhadnt64.dll](https://www.freefixer.com/library/file/winhadnt64.dll-95360/)  |
|  [DtFrame32.dll](https://www.freefixer.com/library/file/DtFrame32.dll-206842/)  |
|   [winrdgv3.exe](https://www.freefixer.com/library/file/winrdgv3.exe-122257/)   |
|   [winrdlv3.exe](https://www.freefixer.com/library/file/winrdlv3.exe-177929/)   |
| [winhafnt64.dll](https://www.freefixer.com/library/file/winhafnt64.dll-211772/) |
| [TIjtdrvd64.dll](https://www.freefixer.com/library/file/TIjtdrvd64.dll-211775/) |
|      [ipnpf.sys](https://www.freefixer.com/library/file/ipnpf.sys-225950/)      |
| [thooksv364.dll](https://www.freefixer.com/library/file/thooksv364.dll-211779/) |
|   [winhadnt.dll](https://www.freefixer.com/library/file/winhadnt.dll-239634/)   |

我们可以利用 Windows Explorer 的按公司分组，快速找到所有相关文件。

1. 打开系统盘（这里假设是 C 盘），右键 - 分组依据 - 更多 - 勾选 公司 - 确定。
2. 右键 - 分组依据 - 公司。
3. 查看 - 选项 - 查看 - 应用到文件夹。
4. 在下面的路径中找到所有公司为`T.E.C Solutions (G.Z.)Limited`的文件，删除。

```cmd
C:\Program Files\Common Files\System
C:\Program Files (x86)\Common Files\System
C:\WINDOWS
C:\WINDOWS\System32
C:\WINDOWS\System32\drivers
C:\WINDOWS\SysWOW64
C:\WINDOWS\SysWOW64\drivers
```

### 3. 重启

再次运行 freefixer 检查是否删干净了。

## 想法

像浪潮这样主要客户是政府，国企的企业，确实需要证明其安全能力，在他的员工的电脑上安装监控软件确实是有效措施，我能够理解。但是，这么大一企业，安装监控时没有主动告知（至少应该告知监控我的哪些行为），毕竟是我自己私人的笔记本，不是企业配发的，也没让我签字。离职时就算知道了也找不到卸载方法（那个上网小助手也是我进入安全模式手动删除的，因为正常卸载需要密码，我嫌麻烦就自己删了），所有面向实习生的文档教程都只有安装方法，我不知道是不是因为实习生的缘故，全程只有我的那个老师给我口头说了一声，我现在感觉自己受到了欺骗，个人隐私受到了严重侵犯，很难受，同时也非常生气，可是又很无力，因为这件事情可大可小，从网上的评论来看在各大企业中都很正常。

希望这样的事情以后不会发生了吧。:pray:
