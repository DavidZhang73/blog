---
title: ANU COMP2310(2019) Assignment 1
categories:
  - Study
tags:
  - Ada
  - ANU
mp3: "//davidz.cn/static/blog/mp3/daiquan---qingshanbaiyun.mp3"
cover: "//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/cover.png"
preview: 300
date: 2020-01-11 18:04:26
---

> 原创发表于 [DavidZ Blog](https://blog.davidz.cn)，遵循 [CC 4.0 BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode) 版权协议，转载请附上原文出处链接及本声明。

> **敬告**
>
> <div style="color: red">本博客请供参考，请不要抄袭。</div>

## 前言

这是 ANU [COMP2310](http://courses.cecs.anu.edu.au/courses/COMP2310/)的第一次大作业，历时一个月左右，也是这个学期我写的最认真的一次作业，所以在博客搭建伊始，我先把这个记录下来。

## 问题

根据[Assignment 1 PDF](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/assignment-1.pdf)中的描述，大概的意思就是在三维空间中有许多的`车`，具有速度和加速度（都是三维向量），而且不管是否加速，都会消耗一定的能量，当然加速也会加快能量的消耗。然后就是有一个或多个`能量球`，当然也是在运动中的，同样具有速度和加速度。当`车`和`能量球`靠近的时候，`车`能够获取到`能量球`的信息（加速度，速度，位置），并且加满能量，而当`车`与`车`靠近的时候，能够互相交换一次信息，这个信息的内容是自己定义的。`车`在能量耗尽后就消失了，而我们需要做的就是在一定的时间内，保证尽可能多的`车`存活。

## 分析

其实这个问题最关键的地方在于，没有一个中央的控制节点，也就是说对于每一个`车`来说都是完全平等且独立的。所以我们需要他们能够尽可能的一直处在能够交流的状态，并且都能知道`能量球`在哪里。

> **注意**
> 这个问题在没有中央控制时**不存在**最优解，我们只能无线接近最优解。
> 我采用的是**球形模型**，这个模型参考于这次作业的 [Examples](https://cs.anu.edu.au/courses/comp2310/1-Labs-Assignments.html)。
> 在和我的同学互相交流时，这个模型是最普遍的，解决方案是最多的，效果也是相对最好的。

![3D球形模型](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure1.svg)

![2D球形模型](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure2.svg)

球形模型设计的两大重点是：

1. 所有的`车`都均匀平等地分布在球面上（球面是个相对概念，可以是球壳？？？）。
2. 所有的`车`都能随时交流，也就是说大家形成一个通讯网络。

## 实现

> **注意**
> 所有的 Ada 代码都是示意性的，有可能不能直接在项目中使用。

### Stage A&B

这个阶段中，能量球只有一个，我们让所有的`车`都围绕这个能量球运动来实现一个基本的球形模型。

#### 基本程序结构（Basic Program Structure）

程序基本的结构是一个死循环，每次循环分为 4 个步骤：

1. 判断`能量球`信息
2. 发送信息
3. 接受信息
4. 设置目的地和油门

#### 消息结构（Message Structure）

最基础的消息需要包括：

1. `能量球`的信息
2. 获得`能量球`信息的时间戳

#### 中央控制（Central Control）

允许中央控制是 Stage 1 中的条件，我在作业中跳过了这一部分，因为

1. 在允许中央控制时，该问题存在最优解，该最优解应该是一个数学问题，对我来说难度过大。
2. 后面的 Stage 2,3,4 均不允许中央控制。

#### 能量球位置估计（Energy Globe Position Estimation）

![能量球位置估计](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure3.svg)

这个问题类似于一个追击问题（红球是一个匀速导弹，蓝球是拦截导弹），我们需要求的是预计追击时间$T_e$。

`能量球`到追击点$P_m$，两个坐标相同，所以，

$$
P_m=VeT_{total}+P_e
$$

易得总时间，

$$
T_{total}=T_f-T_n+T_e
$$

通过边相等得，

$$
P_e+(T_f-T_n+T_e)V_e=V_vT_e+\frac{1}{2}A_vT_e^2+P_v
$$

即可解出$T_e$。

> **注意**
> 存在无法追击的情况，即($\Delta<0$)，因为我们这里是严格的计算，实际上整个追击过程只有 1-2 秒，并且在不断地更新`能量球`的信息，所以预计的那一段时间$T_e$通常可以忽略不计。但是在可以计算时，能够提供更加准确的预计到达时间，从而让`车`能够更加精准的决策何时去充电。

#### 充电决策（Charge Determination）

当同时满足以下两个条件时：

1. `车`知道`能量球`的信息
2. `车`的预计剩余能量小于等于警戒能量

预计剩余能量：

```ada
Left_Charge := Current_Charge - Current_Discharge_Per_Sec * Estimated_Time;
```

#### 半径决策（Radius Determination）

![半径决策](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure4.svg)

半径向量：

```ada
Radius_Vector := Radius_Distance * Norm (Position - Vehicle_Message.EG.Position);
```

`车`的位置：

```ada
Destination := Vehicle_Message.EG.Position + Radius_Vector;
```

其中有些变量的值或初始值是由经验确定的

1. `Radius_Distance`的值是`0.3`，是因为多次实验发现在 64 个，128 个，256 个`车`的情况下`0.3`表现均衡。
2. `Destination`的初始值是`(0, 0, 0)`，这样能够避免一开始时`车`四散，导致失去联系，不能构成球形。

#### 使用当前能量优化半径（Radius Optimization With Current Charge）

![使用当前能量优化半径](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure5.svg)

```ada
Radius_Vector = (0.75 + 0.25 * Current_Charge) * Radius_Vector;
```

`0.75`和`0.25`都是人为确定的，没什么依据:smile:。

#### 一个解决碰撞的机制（A Solution To Collision）

> **注意**
> 这个机制未经过控制变量实验验证，只是理论上分析得到的。

![一个解决碰撞的机制](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure6.svg)

因为`车`和`车`离的足够近时会发生碰撞，表现为大家都减速不动。所以当一个`车`从外层到`能量球`去加油时，周围的`车`减速会一定程度的减少碰撞的发生。

实现时，需要在消息结构中添加`Vehicle_Charge`来判断谁的能量更低。

### Stage C

这个阶段中，能量球有两个或更多。我们遇到的新问题有：

1. 如何决策去围绕哪一个`能量球`运动
2. 如何自适应球形模型大小的变化

#### 多个`能量球`决策（Multiple Energy Globes Decision）

当有多个`能量球`时（`能量球`还有可能凭空消失），每个`车`都要独立的选择其中一个作为他所在球形模型的球心，而且这个过程时动态的。

我们分两种情况去讨论这个问题：

##### 1. `车`发现了两个以上`能量球`

这种情况比较简单，我们只需要从中选择最近的哪一个即可。距离公式如下：

```ada
distance := EG.Position + (Clock - EG_Find_Time) * EG.Velocity - Vehicle_Position
```

##### 2. `车`从别的`车`获得的信息中有新的`能量球`

这种情况实际上是非常复杂的，因为存在一种情况：两个`车`说的时同一个`能量球`，但是不是同时发现的，很难判断是否是同一个`能量球`。

我们可以使用时间戳来判断获得更新的`能量球`。但是这个更新不能以时间戳作为唯一判据，因为存在一种情况，`车A`知道一个旧的`能量球`，但是发现的时间已经过去很久了，`车B`发现一个新的`能量球`，从远处靠近`车A`，时，两车交换信息，该如何选择呢？

所以，我又加入了一个失效时间，来解决上述问题。

```ada
Clock - Vehicle_Message.EG_Update_Time > Vehicle_Message_Expire_Time
```

当上述条件为真时，`车`才会选择更新的信息。

#### 使用旋转优化（Optimization With Rotation）

![旋转半径](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure7.svg)

![旋转轴](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure8.svg)

![2D旋转半径](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure9.svg)

![3D旋转](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure10.svg)

相对于静态的在球面等待，动态的在球面旋转在实验中取得了更稳定的表现。

> **注意**
> 这个优化措施可能无效，我的同学们对这个优化反应褒贬不一，但是我觉得确实让这个模型更好看啦:smile:

旋转半径向量与旋转轴垂直：

$$
X_rX_a+Y_rY_a+Z_rZ_a=0
$$

易得无数个解，但是为了尽量让两个`车`不会面对面相撞（随机赋值的话），这里手动赋值$X_a$和$Y_a$为$1$，求得唯一解。

#### 自动半径适应（Automatic Radius Adaptation）

![通讯环](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure11.svg)

![通讯环内](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure12.svg)

![通讯环外](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/figure13.svg)

我们在 Stage A&B 中的半径是手动设置的，但是在 Stage C 中，每个球星模型的`车`的数量是动态的，如果半径不跟随数量变化，那么就有可能丢失通讯。

在理想的球星模型中，我们可以发现一个通讯环，在通讯环中的所有`车`都是互联的，并且中心的`能量球`很难突破这层环。在`车`进出通讯环时，我们可以通过当时的位置，动态修正半径大小。

我们分三种情况讨论该模型：

1. 半径过大，此时会有更多的`车`进到通讯环以内，从而使得半径变小。
2. 半径国小，此时会有更多的`车`进到通讯环以外，从而使得半径变大。
3. 半径正好，进到通讯环以内的`车`和进到通讯环以外的`车`大致是相同的，所以半径会稳定在某一个数值。

在自动修正半径时，我们需要一个学习率参数`Track_Correction_Rate`，来确保不会因为充能量的不确定性而使得半径不稳定。

要实现该模型，我们还需要存在一个弹出通讯环的效果，即`车`在`能量球`加完能量后，弹出到通讯环外。实现如下，

```ada
Actual_Radius_Vector := 1.5 * Rotated_Radius_Vector;
```

### Stage D

最后一个阶段，要求`车`之间随机协商出一定数量的`车`存活，剩下的自主“死亡“，比如一开始是 64 个，最终要求剩下 42 个。

这个问题最简单的解决方案是直接从 1 开始分配编号，按照编号顺序“死亡”就好啦，但是我觉得这个方案无法体现`随机`。

通过分析，这个类似于现在大火的`区块链`中最重要的一个问题，即分布式节点如何达成共识，解决方案也是一样的：共识算法。

推荐观看[李永乐老师：拜占庭将军问题是什么？区块链如何防范恶意节点？](https://www.bilibili.com/video/av78588312?from=search&seid=1453987515383608625)

#### 共识算法(Consensus Algorithm)[^consensus]

[^consensus]: 共识算法：https://en.wikipedia.org/wiki/Consensus_decision-making

在这里我们仅利用共识算法的思想（不解决恶意节点问题），利用时间戳达成共识。

在`车`与`车`的通讯过程中，我们约定以下原则：

1. 在消息中添加三个字段：`Vehicle_No`数组，`Target_No_of_Elements`数组长度和`Vehicle_List_Update_Time`上一次更新时间。
2. 所有的`车`一直都能接受和发送信息。
3. 在最开始，所有的`车`都把自己的编号放到数组的第一个位置。
4. 如果`车`接收到的信息与自身存储的信息不同（数组长度不同，或者上一次更新时间不同），那么按照下面的规则确定保留哪个
   保留数组更长的那个
   选择上一次更新时间更早的那个
5. 检查自己的编号是否在`Vehicle_No`数组中，若不在并且仍有空间，那么就把自己的编号加进去。
6. 在上一次更新时间又`Confirm_Time_Interval`秒后，如果数组已满并且自己的编号不在里面，那么该`车`就不能再去加能量了。

经过实验，在 64 个`车`，缩减到 42 个的情况下，`Confirm_Time_Interval`设置为 1 秒就可以满足要求。

## 结果[^env]

[^env]: 测试平台： 笔记本 Intel I7 处理器 @ 3.43GHz，16GB 内存。因为我是用 Python 编写测试脚本，通过识别当前程序线程数量来判断`车`的数量的，所以测试结果可能不准确。

### 截图

![截图](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/cover.png)

### Stage A&B(`Single_Globe_In_Orbit`)

| Initial Number | Target Number | Duration | Test times | Average Result | Survival Rate | Average Frame Rate |
| :------------: | :-----------: | :------: | :--------: | :------------: | :-----------: | :----------------: |
|       32       |      32       |  5 min   |     5      |      31.8      |    0.99375    |       30 Hz        |
|       64       |      64       |  5 min   |     5      |      63.4      |   0.990625    |       28 Hz        |
|      128       |      128      |  5 min   |     5      |     126.8      |   0.990625    |       20 Hz        |
|      256       |      256      |  5 min   |     5      |      233       |   0.910156    |        9 Hz        |

![Stage A&B](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/table1.svg)

### Stage C(`Random_Globes_In_Orbits`)

| Initial Number | Target Number | Duration | Test times | Average Result | Survival Rate | Average Frame Rate |
| :------------: | :-----------: | :------: | :--------: | :------------: | :-----------: | :----------------: |
|       32       |      32       |  5 min   |     5      |      26.8      |    0.8375     |       30 Hz        |
|       64       |      64       |  5 min   |     5      |      60.2      |   0.940625    |       28 Hz        |
|      128       |      128      |  5 min   |     5      |     109.2      |   0.853125    |       20 Hz        |
|      256       |      256      |  5 min   |     5      |     208.2      |   0.813281    |        9 Hz        |

![Stage C](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/table2.svg)

### Stage D(`Random_Globes_In_Orbits`)

| Initial Number | Target Number | Duration | Test times | Average Result | Survival Rate | Average Frame Rate |
| :------------: | :-----------: | :------: | :--------: | :------------: | :-----------: | :----------------: |
|       32       |      42       |  5 min   |     5      |       24       |   0.571429    |       30 Hz        |
|       64       |      42       |  5 min   |     5      |      37.4      |   0.890476    |       28 Hz        |
|      128       |      100      |  5 min   |     5      |      83.4      |     0.834     |       20 Hz        |
|      256       |      150      |  5 min   |     5      |      133       |   0.886667    |        9 Hz        |

![Stage D](//davidz.cn/static/blog/2020-01-11-anu-comp2310-assignment1/table3.svg)

## 感谢

感谢所有在作业中帮助过我的同学，辅导员和老师:heart:。
