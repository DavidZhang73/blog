---
title: 技巧速记：更改 Rattle 的语言
categories:
  - Workaround
tags:
  - R
preview: 300
date: 2020-05-17 15:16:07
mp3: "https://davidz-blog.oss-cn-beijing.aliyuncs.com/music/Delacey - Dream It Possible.mp3"
cover: https://davidz-blog.oss-cn-beijing.aliyuncs.com/img/20200907211531-1599484533.png
---

> 原创发表于 [DavidZ Blog](https://blog.davidz.cn)，遵循 [CC 4.0 BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode) 版权协议，转载请附上原文出处链接及本声明。

## Q

如何把Rattle的语言设置成英文，从而避免显示`XXX`。

## A

在`R_HOME/etc/Rprofile.site`的最后添加，

```R
Sys.setenv(LANG="en")
```
