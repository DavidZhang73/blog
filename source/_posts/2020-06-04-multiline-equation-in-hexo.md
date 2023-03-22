---
title: 技巧速记：如何在Hexo中插入多行公式
date: 2020-06-04 22:45:58
categories:
  - Workaround
tags:
  - Markdown
cover: https://davidz-blog.oss-cn-beijing.aliyuncs.com/img/idea-1602143497.jpg
---

## Q

我在博客中写公式的时候使用双斜线`\\`来代表换行，效果是这样的，

$$
\begin{bmatrix}
cos\theta & sin\theta \\
-sin\theta & cos\theta
\end{bmatrix}
$$

```latex
$$
\begin{bmatrix}
cos\theta & sin\theta \\
-sin\theta & cos\theta
\end{bmatrix}
$$
```

那么如何插入多行公式呢？

## A

根据[Multiple lines Mathjax formulas flattened to one line](https://github.com/gcushen/hugo-academic/issues/291#issuecomment-334746889)，应该插入 _六个_ 斜线来表示换行，应该是由于Markdown的渲染机制导致`\\`被反义。

$$
\begin{bmatrix}
cos\theta & sin\theta \\\\\\
-sin\theta & cos\theta
\end{bmatrix}
$$

```latex
$$
\begin{bmatrix}
cos\theta & sin\theta \\\\\\
-sin\theta & cos\theta
\end{bmatrix}
$$
```