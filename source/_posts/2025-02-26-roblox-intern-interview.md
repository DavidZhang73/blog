---
title: Roblox Research 2025 实习面经
categories:
  - 面经
tags:
  - Internship
  - Interview
date: 2025-02-26 15:47:05
cover: /img/roblox_intern.png
---

## 岗位信息

[Roblox [Summer 2025] Research, PhD - Intern](https://careers.roblox.com/jobs/6593713)

我在澳洲，这个岗位是在美国加州湾区，提供 J-1 签证担保。

## 时间线

- 2025/01/15: 了解到 CoreAI 组有实习机会，内推申请
- 2025/02/08: HR 邮件联系了我，提交正式申请
- 2025/02/11: OA 邀请
- 2025/02/15: OA 提交，HR Meeting 了解基本情况
- 2025/02/22: HR 讲面试须知
- 2025/02/25: 三轮面试

## Online Assessment

在 Roblox 平台上他们自己开发的专门用来招聘的游戏中完成，还挺有意思的。
给的那个演示游戏 [Kaiju-Cats](https://www.roblox.com/games/13977123257/Kaiju-Cats) 和真正的测试完全不相关。
可以在网上找到如何获得高分的经验，这里就不赘述了。

- Task 1 (Problem-Solving Assessment, 25 分钟): 游戏 1: 工厂利润最大化
- Task 2 (Problem-Solving Assessment, 25 分钟): 游戏 2: 造小车通关
- Task 3 (Decision-Making Assessment, 30 分钟): Behavior: 4 选 2，一个最有效，一个最无效

## 面试

一个上午，连续三轮面试，三个面试官，两轮后有 15 分钟休息时间。

### Communication and Collaboration (30 分钟): Behavior 面试

三个大问题，基本是聊天的形式，会根据你的回答继续深入提问。

1. 有没有主动学习过一些不在自己任务科研范围内的东西，是什么，为什么要学？
2. 你是如何和团队中的成员进行合作的，你们是如何分配工作的，你是什么角色做了什么，有没有遇到什么困难，是如何解决的？
3. 你是如何向专业不相关的人解释学术知识/技术细节的？

### ML Project Deep Dive (60 分钟): 讲自己的科研项目

准备了 Slides 讲了 40 分钟，过程中会打断提问，最后也会提问，问了方法的局限性，未来的工作方向等。

### Technical (45 分钟): 代码

考察的是二分查找的变种，难度相当于 LeetCode Medium。类似题目:

- [1552. Magnetic Force Between Two Balls](https://leetcode.com/problems/magnetic-force-between-two-balls)
- [2064. Minimized Maximum of Products Distributed to Any Store](https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store)

在 CodeSignal 上做的，这个平台是基于 VSCode Web 的，所以有代码提示，高亮，lint 报错，也支持默认快捷键。
需要先用 Pandas 从 CSV 文件中读取数据，然后后排序，判断是否符合给定的条件，然后进行二分查找范围即可。
测试用例是面试官复制给你的，需要自己在 terminal 里面 vim 粘贴保存一下。
记不住 Pandas 函数名之类的无所谓，可以自己查，也可以问面试官。
面试官人超级好，会提示你一些错误，也会问你一些问题，帮助你一点点的实现。但是关键的步骤还是要自己实现。
一定要注意边界条件，过程中也要讲自己是怎么想的，准备怎么实现再去写代码。

## 总结

整个面试过程体验不错，HR 和面试官都非常友好。LeetCode 是我的薄弱环节，我准备把刷题纳入日常计划。希望能顺利拿到实习机会。

## 其他: HR 给的建议

### Communication and Collaboration

- Consider examples of times you've collaborated with cross-functional teams or worked on projects with multiple stakeholders. Think about how you have to work with contrastive views.

### ML Project Deep Dive

- Project overview
  - Describe the goals of the project. Who worked on it? How long did it take?
  - Describe the overall problem and solution
- Problem formulation / training data
  - What are the different ML problem formulations that were considered? Why did you decide on the one that you chose?
  - How did you gather the training data?
- Features
  - What features were considered/used?
  - What kind of feature engineering was done?
- Model selection
  - What models were considered/used?
  - How did you select between them?
- Implementation and Evaluation
  - What is the architecture of the training data pipelines and online serving systems? How much did you implement?
  - How did you evaluate the model? What were the metrics used?
  - How did you debug the model?
- Impact and learnings
  - What is the business impact of this project? What is some of the follow-on work?
  - What is something that you learned while working on this project?

### Technical

- Ask clarifying questions before beginning the problem.
- Be sure to test and identify all of your edge and corner cases.
- Strive towards an optimal and clean working solution.
- Assess the space/time complexity of the problem.
- Be sure to articulate your rationale and decision making process as you are programming throughout the interview. The interviewers want to understand your thought process!
