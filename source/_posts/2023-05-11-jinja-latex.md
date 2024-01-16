---
title: "自动生成结果表格: Jinja for Latex"
categories:
  - 效率
tags:
  - Latex
  - Jinja
date: 2023-05-11 19:10:10
cover: /img/jinja_latex.svg
---

## 前言

我们跑完实验，需要将实验结果整理成表格，然后插入到 Latex 论文中。这个过程很繁琐，毕竟 Latex 的代码不像 Excel 所见即所得。尤其是临近截稿日期，本来消融实验就多，还要一点点的复制结果，复制之后还得保留n位有效数字，很多时候真的很容易出错。

> Use scripts to collate results and generate tables and graphs. This will be very useful for quickly and reliably updating results close to submission deadlines. -- Prof. Stephen Gould [《Guidelines for Writing Good Computer Science Papers in a Page》](/pdf/paperWritingCheatSheet.pdf)

就像我导师说的，使用脚本收集并生成 Latex 脚本是一个更好的选择。听起来用 Python 应该也很好实现。最简单直观的方法就是直接字符串拼接或者字符串模板嘛。字符串拼接的话，如果要改一下表格的格式，就要改很多地方，很容易出错。字符串模板的话，就要写很多很多的 `{}`(`f-string`)，Latex 本身还包含一些特殊符号，也很容易出错。这就让我想起了学习前后端的时候了解到的`模板引擎`。下面就以模板引擎 [Jinja](https://jinja.palletsprojects.com/) 为例来讲我们该如何做这件事。

## Jinja 模板引擎

Jinja 是一个 Python 的模板引擎，它主要是用于前端网页模板的渲染。它的语法和 [Django 的模板](https://docs.djangoproject.com/zh-hans/5.0/ref/templates/language/)语法很像，所以如果你用过 Django 的话，上手会很快。如果没有用过的话，也没关系，Jinja 的语法很简单，很容易学会。

下面是一个最简单的示例，具体的入门教程请参考[官方文档](https://jinja.palletsprojects.com/)，这里就不再赘述了。

```python
from jinja2 import Template
t = Template("Hello {{ something }}!")
t.render(something="World")  # Hello World!
```

简单讲，这里和 `f-string` 基本一样，就是把 `{}` 替换成了 `{{}}`。但是很容易想到，`{{}}` 这样的模板标识符和 Latex 中的 `{}` 肯定是冲突的。所以我们需要修改 Jinja 的模板标识符[参考](https://stackoverflow.com/a/55715605)。

```python
env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(JINJA2_TEMPLATE_PATH),
    block_start_string="\BLOCK{",
    block_end_string="}",
    variable_start_string="\VAR{",
    variable_end_string="}",
    comment_start_string="\#{",
    comment_end_string="}",
    line_statement_prefix="%-",
    line_comment_prefix="%#",
    trim_blocks=True,
    autoescape=False,
)
```

这样，我们在模板中就可以编写 Latex 代码了，在需要插入内容的时候，使用我们自己定义的不冲突的标识符即可。

```latex
\begin{table*}[htbp]
    \centering
    \newcolumntype{Z}{>{\centering\arraybackslash}X}
    \caption{Caption.}
    \begin{NiceTabularX}{\linewidth}{
            @{}
            w{l}{14em}
            |
            *{4}{Z}
            |
            *{4}{Z}
            |
            *{1}{Z}
        }
        \toprule
        \Block{2-1}{Method}
        & \Block{1-4}{R@1}
        &
        &
        &
        & \Block{1-4}{R@3}
        &
        &
        &
        & \Block{2-1}{mIoU}
        \\
        \midrule
\BLOCK{ for row in rows }
\BLOCK{ if row.name == "rule" }
        \midrule
\BLOCK{ else }
        \VAR{ row.name }
\BLOCK{ for d in row.data }
        & \VAR{ d }
\BLOCK{ endfor }
        \\
\BLOCK{ endif }
\BLOCK{ endfor }
        \bottomrule
    \end{NiceTabularX}
    \label{tbl:result}
\end{table*}
```

上面是我正在使用的一个模板，我们只需要给 Jinja 传入一个 `rows` 变量，就可以生成一个 Latex 表格了。具体的 Python 代码就不贴了。
