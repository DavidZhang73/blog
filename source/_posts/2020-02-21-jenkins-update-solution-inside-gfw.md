---
title: 墙内 Jenkins 插件下载的一种解决方案
categories:
  - 运维
tags:
  - Linux
date: 2020-02-21 15:48:41
cover: https://davidz-blog.oss-cn-beijing.aliyuncs.com/img/下载超时-1599485061.png
---

## 前言

闲来无聊，在家折腾 DevOps，第一步当然是部署一个 Jenkins 啦，然而一顿操作猛如虎，插件一个都下载不下来，总不能给 Jenkins 加个代理吧，所以有了下面这一通折腾。

## 原因

![下载超时](https://davidz-blog.oss-cn-beijing.aliyuncs.com/img/下载超时-1599485061.png)

根据经验，国外这些软件下载失败基本上都是因为链接不上服务器，换个源就好了。所以简单百度，找到大量相关教程，换了[清华源](https://mirrors.tuna.tsinghua.edu.cn/)在内的四五个镜像源，均无效。

这就非常奇怪了，所以我打开了清华源的[update-center.json](https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json)，仔细看了看，发现了蹊跷之处。原来，这个文件里面基本上所有插件的链接都指向了官网链接`http://updates.jenkins-ci.org/download/plugins/`。所以我们使用`https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json`只加速了下载这个文件的过程，而并没有加速下载插件的过程。

## 解决方案

那么解决方案就很简单了，我们只需要把`/var/jenkins_home/updates/default.json`这个文件中的所有

```htmlmixed
http://updates.jenkins-ci.org/download/plugins/
```

替换成，

```htmlmixed
https://mirrors.tuna.tsinghua.edu.cn/jenkins/plugins/
```

这样就好啦，但是总不能每次都自己手动替换吧，所以有下面这两个稍微复杂一点的自动化解决方案。

### 方案 1 使用 nginx 重定向

这个方法是参考的[jenkins 插件下载加速最终方案](https://my.oschina.net/VASKS/blog/3106314)

具体我没有试，但是我之前写过 Nginx 的重定向，简单来讲就是遇到官方的地址，就重定向到清华源，配置起来稍微复杂一点。

### 方案 2 自己搭建 Jenkins Update Center

这个是我自己尝试出来的，原理就是我在服务器上定时（每小时）从清华源下载`update-center.json`，然后再把里面的 URL 替换成正确的地址，然后对外提供服务。

但是 Jenkins 对于`update-center.json`的地址有验证，[具体验证方法](https://github.com/jenkins-zh/mirror-adapter)不清楚（~~我实在是懒的研究了~~）。

> 山重水复疑无路，柳暗花明又一村

我在 Jenkins 的 Issue 里面找到一个[老哥](https://issues.jenkins-ci.org/browse/JENKINS-11598?focusedCommentId=212431&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-212431)说验证这个功能可以通过属性参数关闭，于是，这个问题就很简单啦。

```shell
hudson.model.DownloadService.noSignatureCheck=true
```

加上这个属性就好啦。

[具体教程](https://jenkins-update.davidz.cn/)

哈，插件全秒！:smile:
