---
title: "代码规范与美观: Python Linter (Ruff) 和 Formatter (Black)"
categories:
  - 效率
tags:
  - Python
date: 2023-04-16 15:00:00
cover:
---

俗话说**颜值是第一生产力**。易读，规范美观的代码，是提高代码质量的第一步。以前一直使用 PyCharm 作为 IDE，Linter 和 Formatter 都是内置功能，用起来很简单，但是很多开源项目并不能很好的适配 PyCharm 默认的那些规则，如果使用第三方插件那就失去了使用 PyCharm 这样大而全 IDE 的优势。现在转到 VSCode 之后，需要自己配置对应的 Linter 和 Formatter 了。这里主要以 Python 为例，介绍一下我目前使用的 Linter 和 Formatter。

## Linter

Linter 是代码检查工具，可以在不运行代码的形况下（静态检查）检查代码中的语法错误，以及一些不规范的写法。有过 JavaScript 开发经验的同学一定对 [ESLint](https://eslint.org/) 不陌生，ESLint 是 JavaScript 语言最常见的 Linter，几乎成为了标准。而来到 Python 这边，Linter 并没有一个相对通用的选择，高情商的说就是百花齐放，~低情商就是乱七八糟~。常见的分类和对应的 Linter 有：

|    类别    |                                          介绍                                          |                                                                                               Linters                                                                                               |
| :--------: | :------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  类型检查  |                     通过类型注释（type hint）检查代码中的类型问题                      | [MyPy (Official)](https://mypy-lang.org/), [PyRight (Microsoft)](https://github.com/microsoft/pyright), [Pyre (Meta)](https://pyre-check.org/), [PyType (Google)](https://github.com/google/pytype) |
|  错误检查  |                                静态分析代码中可能的异常                                |                                   [Pylint](https://www.pylint.org/), [Pyflakes](https://github.com/PyCQA/pyflakes), [Flake8](https://flake8.pycqa.org/en/latest/)                                   |
|  样式检查  |             检查代码风格是否符合 [PEP8](https://peps.python.org/pep-0008/)             |                         [Pylint](https://www.pylint.org/), [Flake8](https://flake8.pycqa.org/en/latest/), [Pycodestyle](https://pycodestyle.pycqa.org/en/latest/intro.html)                         |
|  安全检查  |                               检查代码中的安全风险和漏洞                               |                                                                         [bandit](https://bandit.readthedocs.io/en/latest/)                                                                          |
|  无效代码  |                                删除代码中不会运行的部分                                |                                            [Vulture](https://github.com/jendrikseipp/vulture), [eradicate](https://github.com/wemake-services/eradicate)                                            |
|  注释检查  | 检查代码中（尤其是类和函数）的注释是否符合 [PEP257](https://peps.python.org/pep-0257/) |                       [pydocstringformatter](Pydocstringformatter), [docformatter](https://github.com/PyCQA/docformatter), [pydocstyle](http://www.pydocstyle.org/en/stable/)                       |
| 复杂度检查 |                                    计算代码的复杂度                                    |                                                         [mccabe](https://github.com/PyCQA/mccabe), [Radon](https://github.com/rubik/radon)                                                          |
|  打包检查  |          检查是否符合 [打包最佳实践](https://github.com/regebro/pyroma#tests)          |                                                                             [Pyroma](https://github.com/regebro/pyroma)                                                                             |

那么多不同的 Linter，自然而然就会有人搞个相对统一的工具，运行的时候就依次去调用他们：

|                                名字                                |                                   包含的 Linter                                    |
| :----------------------------------------------------------------: | :--------------------------------------------------------------------------------: |
|           [Flake8](https://flake8.pycqa.org/en/latest/)            |                           Pyflakes, pycodestyle, mccabe                            |
|           [autopep8](https://github.com/hhatto/autopep8)           |                                    pycodestyle                                     |
|              [pylama](https://github.com/klen/pylama)              | pycodestyle, pydocstyle, Pyflakes, mccabe, Pylint, Radon, eradicate, Mypy, Vulture |
| [prospector](https://prospector.landscape.io/en/master/index.html) |               Pylint, flake8, dodgy, isort, pydocstyle, pep8-naming                |

很明显，这样是低效的。因为静态代码检查的原理上讲第一步是分析代码的抽象语法树（AST），而如果每个工具都需要生成一遍 AST 的话，就产生了很多浪费。而每个工具的 AST 又不是完全一样的，大多也没有提供接口来输入 AST。因此有了 [Ruff](https://beta.ruff.rs/docs/)，它使用 Rust 语言编写，只需要生成一次 AST，然后用 Rust 重新实现了常见 Linter 的规则，并且也提供自动修复，规则配置等功能。

## Formatter

Formatter 其实也可以看作是 Linter 的一种，我认为他们的主要区别是经过 Formatter 格式化前后的代码是否拥有相同的 AST。比如 isort，autopep8 会按照字母顺序对 import 语句进行排序，这样做会改变代码的 AST，因此，严格意义上讲他们不能算是 Formatter。

如果这样分类的话，比较知名的 Formatter 就只剩下了 [Black](https://github.com/psf/black) 和 [YAPF](https://github.com/google/yapf)。Black 拥有更多的 Star，原因可能是 Black 本身是一个有偏见的 Formatter，他默认情况下就提供了一套比较严格的规则，这样做的好处是基本不需要配置，极大的降低了使用门槛和心智负担。

## VSCode 插件

**安装**

直接在 VSCode 的插件市场搜索 Ruff（charliermarsh.ruff） 和 Black（
ms-python.black-formatter） 即可，这两个插件都自带了对应的 Linter 和 Formatter，也就是说你不需要在你的项目中安装任何依赖。

**配置**

根据 [PEP518](https://peps.python.org/pep-0518/)，python 项目的配置推荐放到项目根目录 pyproject.toml 文件中，而 Black 和 Ruff 都支持从这个文件中读取配置，下面是一个配置的例子：

```toml
# https://black.readthedocs.io/en/stable/the_black_code_style/current_style.html
[tool.black]
line-length = 120

# https://beta.ruff.rs/docs/settings/
[tool.ruff]
line-length = 120
# https://beta.ruff.rs/docs/rules/
select = ["E", "W", "F"]
ignore = ["F401"]
# Exclude a variety of commonly ignored directories.
respect-gitignore = true
ignore-init-module-imports = true
```

需要注意的是，`line-width`需要一致。为了更好的可视化这个宽度，我们还可以在 VSCode 中设置 `"editor.rulers": [120]`：

**保存是自动修复并格式化**

在 VSCode 的配置文件中添加：

```json
"[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.ruff": true,
        "source.organizeImports.ruff": true,
    },
    "editor.formatOnType": true
}
```

单纯的用 Black 进行格式化的默认快捷键是 `Shift + Alt + F`，添加上面的配置后，保存时（`Ctrl + S`）就会自动格式化和修复了。当然也可以在命令面板中（`Ctrl + Shift + P`）运行相应的命令。

**插件推荐**

如果是一个 Python 的开源，或是多人协作的项目，可以在 `.vscode/extensions.json` 文件中添加：

```json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.vscode-pylance",
    "ms-python.black-formatter",
    "charliermarsh.ruff"
  ]
}
```

这样别人用 VSCode 打开时就会提示安装这些插件，配合我们在 `pyproject.toml` 中的配置，就可以方便大家保持代码风格的基本统一。当然，你也可以添加一些 git pre-commit hook 来强制确保保证代码风格的一致性。

## 参考

[Python Linter Comparison 2022: Pylint vs Pyflakes vs Flake8 vs autopep8 vs Bandit vs Prospector vs Pylama vs Pyroma vs Black vs Mypy vs Radon vs mccabe](https://inventwithpython.com/blog/2022/11/19/python-linter-comparison-2022-pylint-vs-pyflakes-vs-flake8-vs-autopep8-vs-bandit-vs-prospector-vs-pylama-vs-pyroma-vs-black-vs-mypy-vs-radon-vs-mccabe/)
