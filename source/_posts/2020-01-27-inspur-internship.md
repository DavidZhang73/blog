---
title: 浪潮实习
categories:
  - Internship
tags:
  - Cpp
  - Windows
  - Linux
date: 2020-01-27 15:08:39
cover: https://davidz-blog.oss-cn-beijing.aliyuncs.com/img/langchao-1599636307.jpg
---

## 前言

到了期末都说要找个实习的工作，我也跟个风:joy:。

我是主要是在[实习僧](https://www.shixiseng.com/)上找的（就当免费做个广告吧），我住在美丽的泉城济南，~~这个地方好就好在~~，咳咳咳，我大概填了填简历，可能是没啥亮点，投了三四家都不要我:cry:。

我分析原因大概有以下几条：

1. 我最喜欢最熟练的语言是 Python，但是现在国内的环境，Python 很少作为 Web 的后端，主要是用在机器学习（大数据分析，量化交易之类的）方面。济南大多数都是 Java 和 Cpp 岗。
2. 我个人没有参加过 acm 之类的比赛，除了几个项目没法有效证明我的能力。
3. 我这个寒假只能干 2 个月，~~其实最终只干了一个半月~~。
4. 我是个大三的学生。可能培养了对于公司来说也没啥意义吧。

最后还是十分感谢秦老师:heart:，不但收了我到浪潮实习，还在实习过程中给了我很多帮助和指导。

下面列一列我学习了解的项目工具之类的。

## [CppMicroServices](https://github.com/CppMicroServices/CppMicroServices)

我们主要做了一个插件管理器，是基于 CppMicroServices 的二次开发。这是一个 Cpp 的微服务框架，主要实现了 Bundle 的全生命周期管理，注册，启动，停止，状态管理等。

## [CLion](https://www.jetbrains.com/clion)

大爱 Jetbrains 全家桶，我实习的第一件事大概就是给组里所有人安利了 CLion 吧。与宇宙第一 IDE Visual Studio 相比最突出的优点有

1. 精美的全功能编辑器。不是我吐槽，VS 的编辑器为了向下兼容现在甚至已经落后 VSCode 了，这还是曾经的宇宙第一 IDE 嘛。举一个简单的例子，连字功能连个开关都找不到，重启 VS 没成功，重启电脑就成功了？再加上没有拼写检查？没有自动注释补全？没有缺陷提示？你可能觉得没什么，但是这些都是 CLion 的自带功能啊。
2. 丰富完善的插件生态。虽然感觉比不上 VSCode，但是相对于 VS，:smile:。
3. CMake 项目的原生支持。VS 虽然也有，但是感觉应该还处在开发状态。
4. SVN & Git 的原生支持。
5. 远程开发功能。因为我们要求项目有跨平台能力，所以需要在多个平台切换。VS 虽然也有这个功能，但是也是感觉在开发状态，相比 CLion 少了很多配置的灵活性。
6. 丰富的主题。VS 硬伤。

综上所述，对于 Cpp 的 CMake 跨平台项目，还是推荐使用 CLion 作为 IDE。

我猜测 Visual Studio 是宇宙第一 IDE 应该说的是对于 C# 项目吧。

## [CMake](www.cmake.org)

以前的 C/Cpp 项目对我来说就是个谜，解决方案、项目傻傻分不清楚，Visual Studio 写单文件程序，解算法题还是很溜的，但是两个文件以上就很晕。

傻瓜式的配置的优点和确定都是非常显著的，好用是好用，用好是真的难。

CMake 作为这几年流行的跨平台构建工具，实现了配置式构建，终于让我理解了大学里 Linux 老师讲的程序编译链接都是些啥。

下面我简单写一写 CMake 的入门知识。

### 常见编译器

|     Platform     |                    Windows                     |             Linux             |
| :--------------: | :--------------------------------------------: | :---------------------------: |
| GNU(open source) |                MinGW, MinGW-w64                | GCC(GNU Compiler Collection)  |
|      Other       | Clang(Apple), MSVC(Microsoft), ICC(Intel) etc. | Clang(Apple), ICC(Intel) etc. |

上面这些编译器都可以作为 CMake 的编译器。

这里主要还是推荐 GCC，毕竟老牌，经过这么多年的洗礼了。

其次的话推荐 CLang，这些年对于新特性，特别是 C++20，支持的不错。

再次就是如果真的需要 Windows 原生底层支持，那就只能使用 MSVC 啦。

### 常见构建工具

|     Platform     |                            Windows                            |           Linux           |
| :--------------: | :-----------------------------------------------------------: | :-----------------------: |
| GNU(open source) |                     MinGW-make(Makefile)                      |      make(Makefile)       |
|      Other       | nmake(Makefile), MSBuild(.vcxproj), ninja(.ninja), qmake etc. | ninja(.ninja), qmake etc. |
|     Solution     |               Visual Studio(.sln), QT(.project)               |    XCode, QT(.project)    |

以上所有都可以作为 CMake 的 Generator。

IDE 可以识别 CMake 根据 CMakeLists.txt 生成的 CMakeCache.txt，从中获得项目构成，编译连接选项等，从而替代解决方案。

我们在项目中使用的情况是，在 Linux 下使用 make，在 Windows 下使用 nmake。

### CMake 常用指令

```shell
Generate a Project Buildsystem
 cmake [<options>] <path-to-source>
 cmake [<options>] <path-to-existing-build>
 cmake [<options>] -S <path-to-source> -B <path-to-build>

Build a Project
 cmake --build <dir> [<options>] [-- <build-tool-options>]

Install a Project
 cmake --install <dir> [<options>]

Open a Project
 cmake --open <dir>

Run a Script
 cmake [{-D <var>=<value>}...] -P <cmake-script-file>

Run a Command-Line Tool
 cmake -E <command> [<options>]

Run the Find-Package Tool
 cmake --find-package [<options>]

View Help
 cmake --help[-<topic>]
```

这些其实用不太到，构建别人的项目只使用简单的`cmake ..`就好啦。

其他常用的 CLion 都有相应的图形化设置。

### Makefile

```makefile
<TargetName>:
    gcc <arg1> <arg2> ... <file>
    g++ <arg1> <arg2> ... <file>
    gcc <arg1> <arg2> ... <file>
```

这个是传统的 makefile，事实上，对于大型项目，已经很少有人这么写了，详细参考[Autotools](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html)。

### CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.16)

project(Demo)

set(CMAKE_CXX_STANDARD 14)

find_package(Poco REQUIRED COMPONENTS Foundation)

include_directories(include)

add_executable(Demo src/main.cpp)

set(BUILD_SHARED_LIBS true)

add_library(Cal src/cal.cpp include/cal.h)

message(STATUS ${Poco_LIBRARIES})

target_link_libraries(Demo ${Poco_LIBRARIES} Cal)

set(EXECUTABLE_OUTPUT_PATH ${CMAKE_BINARY_DIR}/bin/)

set(LIBRARY_OUTPUT_PATH ${CMAKE_BINARY_DIR}/lib/)
```

这个是一个简单的 Demo，链接外部的 Poco 库，还编译生成了一个动态库和一个可执行文件，然后指定了输出目录。

整体难度中等，主要原因是[官网文档](https://cmake.org/)有一点看不懂:cry:。

## [Vcpkg](https://github.com/microsoft/vcpkg)

这个是微软开发的，类似于 Python 的 pip，Nodejs 的 npm，总而言之就是个依赖包管理器。主要适用于解决开发依赖问题。

比如安装一个 poco，原来你需要下载源码->编译源码->把文件放进项目->修改编译链接选项，然后才能用，现在你只需要

```shell
vcpkg install poco
```

然后在 CMakeLists.txt 里面添加

```cmake
find_package(Poco REQUIRED COMPONENTS Foundation)
```

然后再连接上 Target 就好啦。

Vcpkg 甚至还允许你使用

```shell
vcpkg install poco:x64-windows
```

直接安装 64 位的 Poco 库。

至于搜索和卸载都大同小异。

**但是**，它有一个致命问题是，不支持版本管理，每个库都是由一个文件指定的，而不是像 pip，npm 之类的，有个在线仓库，所以，你 vcpkg 的版本直接决定了依赖的版本。

vcpkg 安装依赖都是下载后现编译安装的，不过这个应该是 C/Cpp 项目不可避免的，我也没找到 Windows 下更好的依赖包管理器。

## [Poco](https://github.com/pocoproject/poco)

这个类似于野生 C++标准类库[Boost](https://www.boost.org)，但是官网说很轻量，使用感觉也确实是这样。但是用起来总感觉有一些问题，我也提了 issue，作者也没回我，可能太忙了吧。

基本上能够让 Cpp 在使用上达到 Java 的水平吧，但是肯定还是有一定的差距的，跟我熟悉的 Python 更是相差甚远，毕竟不是标准库，也情有可原吧。

用了一段时间之后，感觉这个库的实现还是很标准的，看了一些源代码，也很规范，以后再有 Cpp 的项目可以着重考虑一下了。

## Linux

因为跨平台，在项目开发过程中大量使用了 Linux 上 shell，systemctl，docker 这些工具以及 CFEngine， Zabbix 这些运维的东西，感觉又喜欢上了 Linux 和命令行，熟悉了之后真是很方便。

同时因为是 C/Cpp 项目，我们编译了很多开源项目，算是终于知道了 Linux 根目录下面每个目录都是干啥的。

Linux 下的包管理器比如 apt，yum 用起来也很爽。所以我也看了看 Windows 下面的包管理器，发现了 Scoop 这个神器，在另外一篇[博文](https://blog.davidz.cn/beauty-is-productivity-windows-terminal)里介绍了它。

## [MSYS2](https://github.com/msys2/msys2)

因为快离职的时候，新的需求要交叉编译 CFEngine（虽然到离职也没搞成功），但是让我发现了 MSYS2 这个交叉编译神器。

> MinGW 是在 Windows 平台的[GCC](https://www.gnu.org/software/gcc)，而 CygWin 和 MSYS2 均是在 MinGW 基础上的[POSIX](https://www.gnu.org/software/libc/manual/html_node/POSIX.html)子操作系统（概念类似于微软 WSL）。
> [CygWin、Msys、MinGW、Msys2 的区别与联系](https://www.cnblogs.com/Netsharp/p/11073142.html)

选择 MSYS2 而不是 MinGW 也不是 CygWin 的主要原因也是因为 MSYS2 的包管理器 pacman。

交叉编译也是个大坑，巨坑无比，反正我也没研究明白，七八个可执行文件就编译出来一个。

## 感谢

感谢所有在实习中帮助过我的老师，同事们:heart:。
