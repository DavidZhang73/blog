---
title: 宜家家居组装数据集
date: 2020-10-08 11:36:43
categories:
  - Paper Review
tags:
  - CV
  - Dataset
preview: 300
cover: https://davidz-blog.oss-cn-beijing.aliyuncs.com/img/library-1602131491.jpg
mp3:
---

> 原创发表于 [DavidZ Blog](https://blog.davidz.cn)，遵循 [CC 4.0 BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode) 版权协议，转载请附上原文出处链接及本声明。

## 简介

|    Title     | The IKEA ASM Dataset: Understanding People Assembling Furniture through Actions, Objects and Pose |
| :----------: | :-----------------------------------------------------------------------------------------------: |
|    Author    |                                         Yizhak Ben-Shabat                                         |
| Publish Year |                                               2020                                                |
|     Link     |                                 https://arxiv.org/abs/2007.00394                                  |
|     Code     |                            https://github.com/IkeaASM/IKEA_ASM_Dataset                            |

这个是我的导师小组里的研究员 Itzik 发布的一个组装宜家家居的视频数据集。其中数据集包括三个视角的 RGBD 图像，原子动作标注，人体姿势标注，物体分割标注，相机标定以及相关的辅助代码。

## 总结

### 数据集

背景方面，有 48 个人物，5 个场景，场景是动态的，存在有无关人员走过的情况。每个场景下都组装两遍，一次在桌子上，一次在地板上，所以一共是 10 中场景设置。

家具方面，4 种家居，side table, coffee table, TV bench, and drawer，每种三个颜色，white, oak, and black。

标注方面，人工标注视频的$1%$左右，人工复核过。

### 基准

#### Action recognition

![Action recognition](https://davidz-blog.oss-cn-beijing.aliyuncs.com/img/table2-1602211486.png)

#### Multi-view and multi-modal action recognition

![Multi-view and multi-modal action recognition](https://davidz-blog.oss-cn-beijing.aliyuncs.com/img/table3-1602211507.png)

#### Instance segmentation

#### Multiple furniture part tracking

#### Human pose
