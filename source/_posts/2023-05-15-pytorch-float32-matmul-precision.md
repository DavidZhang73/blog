---
title: 技巧速记：Pytorch float32 matmul precision
categories:
  - 技巧
tags:
  - PyTorch
cover: https://davidz-blog.oss-cn-beijing.aliyuncs.com/img/idea-1602143497.jpg
date: 2023-05-15 13:04:24
---

## Q

跑实验的时候提示,

> You are using a CUDA device ('NVIDIA A100 80GB PCIe') that has Tensor Cores. To properly utilize them, you should set `torch.set_float32_matmul_precision('medium' | 'high')` which will trade-off precision for performance. For more details, read https://pytorch.org/docs/stable/generated/torch.set_float32_matmul_precision.html#torch.set_float32_matmul_precision.

## A

首先，这个警告来源于 `PyTorch Lightning`，具体的讨论在[这里](https://github.com/Lightning-AI/pytorch-lightning/discussions/16698)。它大概的意思是说，我们计算矩阵乘法的时候，两个乘数可以先降低精度到 `float16`，计算后再回到 `float32`，这样可以提高计算速度，但是会算是一些精度。这与混合精度训练，例如[自动混合精度（Automatic Mixed Precision）](https://pytorch.org/tutorials/recipes/recipes/amp_recipe.html)有所不同，因为这里只针对矩阵乘法，而不是整个模型。

```python
torch.set_float32_matmul_precision(precision: Literal[
  'highest', # 最高精度， 默认值
  'high',    # 高精度
  'medium',   # 中精度
] = 'highest')
```

**但是它的实现远比上面说的复杂。**

> 在使用 `high` 精度时，`float32` 乘法可能会使用基于 `bfloat16` 的算法，这比简单地截断到某个较小数的尾数位（例如 `TensorFloat32` 的 10 位，`bfloat16`的 8 位）要复杂得多。有关此算法的完整描述，请参阅 [Henry2019](https://arxiv.org/pdf/1904.06376.pdf)。在这里简要说明，第一步是要认识到我们可以将单个 ` float32` 数字完美地编码为三个 `bfloat16`数字之和（因为`float32`有 24 位尾数位，而`bfloat16`有 8 位，且它们的指数位数相同）。这意味着两个`float32`数字的乘积可以准确地由九个`bfloat16` 数字的乘积之和给出。然后，我们可以通过舍弃其中一些乘积来换取速度和精度。特别是，`high`精度算法仅保留三个最重要的乘积，这恰好排除了涉及任一输入的最后 8 个尾数位的所有乘积。这意味着我们可以将输入表示为两个`bfloat16`数字之和，而不是三个。因为`bfloat16`融合乘加（fused-multiply-add）指令通常比 `float32`指令快 10 倍以上，所以使用`bfloat16` 精度进行三次乘法和 2 次加法比进行一次 float32 精度的乘法更快。

这里可以去看看 `PyTorch` [官方文档](https://pytorch.org/docs/stable/generated/torch.set_float32_matmul_precision.html)，[官方 RFC](https://github.com/pytorch/pytorch/issues/76440) 以及[这篇论文](https://arxiv.org/pdf/1904.06376.pdf)。

多说无益，直接上对比试验，

![性能对比](https://lightningaidev.wpengine.com/wp-content/uploads/2023/05/mp-chart3-1536x444.png)

可以看到，`high` 就是最佳选择。

## 参考信息

[Accelerating Large Language Models with Mixed-Precision Techniques](https://lightning.ai/pages/community/tutorial/accelerating-large-language-models-with-mixed-precision-techniques/)
