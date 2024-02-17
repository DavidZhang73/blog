---
title: 技巧速记：禁用 WanDB 的 Job
categories:
  - 技巧
tags:
  - WanDB
date: 2024-02-17 04:51:45
cover: https://davidz-blog.oss-cn-beijing.aliyuncs.com/img/idea-1602143497.jpg
---

## Q

在 WanDB 里面有一个功能叫做 [Launch](https://docs.wandb.ai/guides/launch), 我从来没有用过，但是从他的文档中看，他大概想实现的是，把每一次实验保存成一个 Job，然后这个 Job 包括可以重复该实验的所有东西，代码，数据等等。这样你就可以方便的在任何地方重复你的实验，或者说甚至可以通过命令行参数调超参等等。

![WanDB Launch Overview.](https://docs.wandb.ai/assets/images/launch_overview-1e8816fa6efec3291b11a53adb8a2d48.png)

看起来听起来这都是一个很好的功能，但是我并不需要这个功能，然而 WanDB 默认开启保存 Job。打开你的 WanDB 页面，你会在左侧的菜单栏中看到一个叫做 `Jobs` 的选项。其实如果只是保存一些配置代码啥的也没有什么影响，然而不知道为什么，当我使用 `debugpy` 远程调试代码的时候，WanDB 会[报错](https://github.com/wandb/wandb/issues/6290)，直接退出，导致他在页面中显示实验还在运行。

```shell
wandb.sdk.service.service.ServiceStartProcessError: The wandb service process exited with 1. Ensure that `sys.executable` is a valid python interpreter. You can override it with the `_executable` setting or with the `WANDB__EXECUTABLE` environment variable.
```

## A

大概的猜测就是 `debugpy` 可能修改了什么东西，导致 WanDB 出错，但是具体原因并不清楚（WanDB 只是用来记录实验数据，我也不想花费很多精力去帮他们 debug）。但是无意间我发现了这个 [PR](https://github.com/wandb/wandb/pull/4901) 可以禁用保存 Job，于是我就试了一下，发现可以解决我的问题。

这个 PR 提供了两个方法来禁用保存 Job，一个是通过环境变量 `WANDB_DISABLE_JOB_CREATION`，另一个是通过配置 `disable_job_creation`。因为我使用了 PyTorch Lightning CLI，它检查不到 `disable_job_creation` 的类型，所以对我来讲最简单的方法就是通过环境变量来禁用保存 Job。

```shell
export WANDB_DISABLE_JOB_CREATION=true
```

这里我使用了 [pyrootutils](https://github.com/ashleve/rootutils)，它的 `setup_root` 方法可以设置读取项目根目录下的 `.env` 文件中的环境变量，所以只需要把上面的命令写到 `.env` 文件中就可以了。
