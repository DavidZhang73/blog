---
title: 技巧速记：更改 Rattle 的语言
date: 2020-05-17 15:16:07
categories:
  - Workaround
tags:
  - R
cover: https://davidz-blog.oss-cn-beijing.aliyuncs.com/img/idea-1602143497.jpg
---

## Q

如何把Rattle的语言设置成英文，从而避免显示`XXX`。

## A

在`R_HOME/etc/Rprofile.site`的最后添加，

```R
Sys.setenv(LANG="en")
