---
title: 想法速记：SVD求齐次线性方程组 Ax=0 的解
categories:
  - Idea
tags:
  - null
preview: 300
cover: //davidz.cn/static/blog/img/workaround.jpg
date: 2020-06-04 21:43:53
mp3:
---

> 原创发表于 [DavidZ Blog](https://blog.davidz.cn)，遵循 [CC 4.0 BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode) 版权协议，转载请附上原文出处链接及本声明。

众所周知，SVD(奇异值分解)可以用于最小二乘法求齐次线性方程组$A\vec{x}=\vec{0}$的解。我看了很多资料，大多使用数学公式推导，得出结论。但是，曾经线性代数差点挂科的我，总觉得有些蹊跷。想了两天，终于有了一些感性的认知（不一定是对的:joy:），赶紧记录下来。

## 矩阵有何意义

按照我的理解，一个矩阵的实际意义是对应一个线性变换，这个变换可以理解为瞬间运动。例如，一个旋转矩阵，

$$
A=\begin{bmatrix}
cos\theta & sin\theta \\\\\\
-sin\theta & cos\theta
\end{bmatrix}
$$

它的意思是，把一个向量顺时针旋转$\theta$。也就是说，给定一个$\vec{v_1}=[-1, 1]^T$, 那么变换的结果就是$\vec{v_2}=A\vec{v_1}=[1, 1]^T$.

除了旋转，矩阵还可以表示包括缩放，投影在内的所有**线性变换**。

十分推荐大家去看 3Blue1Brown 的 _线性代数的本质_，B 站有[官方翻译版](https://www.bilibili.com/video/BV1ys411472E)，它完全颠覆了我对线性代数的认知。

## SVD到底干了什么

$$
A = U\Sigma V^T
$$

SVD把矩阵$A(m\times n)$分解成了,

- $U(m\times m)$: 左奇异矩阵
- $\Sigma(m\times n)$: 奇异值矩阵
- $V(n\times n)$: 右奇异矩阵

重点来了，SVD的意思就是，把一个本来由矩阵$A$表示的变换，转化成一个由$U,\Sigma,V$表示的变换。这个变换是，把一个向量，从以$V$为基向量的空间线性变换到成以$U$为基向量的空间中去（$\Sigma$的意义可以说是缩放，待证实，暂时忽略）。这样我们就可以更深入的理解这个变换了。

例如旋转$\vec{v_1}$90度得到$\vec{v_2}$，

![rotate 90](//davidz.cn/static/blog/2020-06-04-SVD-for-homogeneous-linear-equation/rotate90.svg)

其中，

$$
U=\begin{bmatrix}
0 & 1 \\\\\\
1 & 0
\end{bmatrix}
$$

$$
\Sigma=\begin{bmatrix}
1 & 1
\end{bmatrix}
$$

$$
V=\begin{bmatrix}
-1 & 0 \\\\\\
0 & 1
\end{bmatrix}
$$

也就是说，矩阵$A$可以被理解为，我们把一个向量$\vec{v_1}$，从以$\vec{e_1}=[-1, 0]^T,\vec{e_2}=[0, 1]^T$为基向量的空间线性变换到了以$\vec{e_1}=[0, 1]^T,\vec{e_2}=[1, 0]^T$为基向量的空间中。这个变换表现为旋转了90度。

## 所以如何理解

说回求齐次线性方程组$Ax=0$的解来。

按照矩阵的意义，我们这里要求的是，已知一个线性变换$A$，给定一个$\vec{x}$，使得线性变换后的结果为$\vec{0}$。

此时非常重要的是，如果$x=\vec{0}$，那一定成立，但是我们想找一个非平凡的解。

我们暂时不关心这个解是否存在，也就是说如果不存在，我们就找个最接近的（最小二乘法思想），我们直接使用SVD分解矩阵$A$，得到对应的$U,\Sigma,V$。

按照SVD的作用，我们现在可以说，矩阵$A$这个线性变换，把一个$\vec{x}$，从以$V$为基向量的空间线性变换到了以$U$为基向量的空间中，而我们想找，在以$V$为基向量的空间中，哪个向量会在投影后趋近于或者等于$\vec{0}$。更重要的是，我们只在乎这个向量的方向，而不在乎他的大小，因为它等于$\vec{0}$是个平凡解，这就像最小二乘法中，我们规定$|\vec{x}|=1$。

这时，答案就开始变得清晰了，因为我们想找的$\vec{x}$，应该就是$V$这组基向量中特异值$\sigma$最小的那一个$\vec{e_{min}}$，也就是说$\vec{x}=\vec{e_{min}}$。此时有两种情况，

1. $\sigma=0$， 那么$\vec{x}$投影后的就是$\vec{0}$。
2. $\sigma\neq0$，那么$\vec{x}$投影后是使$A\vec{x}$最小的解。因为如果$\vec{x}\neq\vec{e_{min}}$，也就是说它偏离了$\vec{e_{min}}$，那么它一定由$\vec{e_{min}}$和另一个基向量线性组合，而无论怎么组合，$\sigma_{combine}\geq\sigma_{min}$。

因此，我们求解$A\vec{x}=0$的过程就是，

1. $U,\Sigma,V^T=SVD(A)$
2. $\vec{x}=V[:, -1]$
