---
title: ANU COMP2310 Assignment1
categories:
  - STUDY
  - ANU
tags:
  - Ada
  - COMP2310
preview: 300
date: 2020-01-11 18:04:26
mp3: http://davidz.cn/static/blog/mp3/daiquan---qingshanbaiyun.mp3
cover: http://davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/cover.png
---

> **敬告**
>
> <div style="color: red">本博客请供参考，请不要抄袭。</div>

这是 ANU [COMP2310](http://courses.cecs.anu.edu.au/courses/COMP2310/)的第一次大作业，历时一个月左右，也是这个学期我写的最认真的一次作业，所以在博客搭建伊始，我先把这个记录下来。

## 问题

根据[Assignment 1 PDF](http://davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/assignment-1.pdf)中的描述，大概的意思就是在三维空间中有许多的`车`，具有速度和加速度（都是三维向量），而且不管是否加速，都会消耗一定的能量，当然加速也会加快电量的消耗。然后就是有一个或多个`能量球`，当然也是在运动中的，同样具有速度和加速度。当`车`和`能量球`靠近的时候，`车`能够获取到`能量球`的信息（加速度，速度，位置），并且加满能量，而当`车`与`车`靠近的时候，能够互相交换一次信息，这个信息的内容是自己定义的。`车`在能量耗尽后就消失了，而我们需要做的就是在一定的时间内，保证尽可能多的`车`存活。
