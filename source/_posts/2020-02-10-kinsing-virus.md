---
title: Kinsing - "寄生"于 Docker 的病毒
categories:
  - DevOps
tags:
  - Shell
  - Docker
preview: 300
date: 2020-02-10 17:20:49
mp3:
cover:
---

2020 年开年不顺，2019 新型冠状病毒肺炎爆发，从年三十居家隔离到了正月十五，没想到自己的服务器也”感染“上了病毒 - Kinsing(进程的名字，姑且这样称呼)。

## 发现

![netdata](//davidz.cn/static/blog/2020-02-10-kinsing-virus/netdata.png)

偶然看了看服务器状态，发现 CPU 占用一直保持在 100%上下，有些蹊跷。

难道是我的博客访问量~~暴增~~？？？那是当然不可能的，然后我去看了看[Portainer](https://github.com/portainer/portainer)看了看，果然，

![portainer](//davidz.cn/static/blog/2020-02-10-kinsing-virus/portainer.png)

这个随机名称的容器就是 Kinsing 基于 Ubuntu 的容器，CPU 占用 100%。

![进程](//davidz.cn/static/blog/2020-02-10-kinsing-virus/process.png)

简单看了看容器里面的进程表，第一个运行了一个 shell 脚本，这个病毒就是这个脚本下载启动的关键，我打开看了看，~~也没看懂~~，大概是下载了几个可执行文件。第二个是 cron，这个是定时脚本，我猜应该是病毒定时检查一下运行情况？第三个好像是个守护进程，第四个应该是用于容器保持，第五个在网上能搜到，是个[挖矿的程序](https://www.baidu.com/s?wd=kdevtmpfsi)。

无聊的我还简单看了看这个脚本的服务器 IP，

![ip](//davidz.cn/static/blog/2020-02-10-kinsing-virus/ip.png)

难道是俄罗斯大佬？？？

这个时候我突然想起来，前几天为了调试[certbot](https://certbot.eff.org/)的 Dockerfile, 我直接打开了 Docker 的[远程访问](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-socket-option)，在默认的情况下是没有任何加密措施的。

这样，就真相大白了，这个病毒通过未加密的接口，在我的服务器上运行了挖矿的容器来盈利，同时也占用了服务器全部的 CPU:cry:.

## 处理

Kinsing 病毒还是很良心的（至少我遇到的这个是），把自己”关“在了容器里面，反正后来我也没有在别的地方发现相关文件。

所以处理起来也简单，

1. 删掉容器和镜像
2. 关闭 Docker 远程访问即可。如果不想关闭的话也可以[用 https 的方式加密](https://docs.docker.com/engine/security/https/)。

## 小想法

其实这个 Kinsing 病毒实现起来还是很简单的，

1. 扫描全网的 2375 这个默认端口
2. 用 Docker API 连接并部署容器
3. 执行脚本运行挖矿程序

~~突然有一个邪恶的想法，一台机器一天就算 1 毛钱好啦~~，哈哈哈，但是违法的事情不能做呀:smile:。

大家一定要注意呀，时刻谨记服务器安全，不要随意开放服务器端口。
