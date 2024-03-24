# vscode-md-taskboard

![](https://img.wiki-power.com/d/wiki-media/img/20240324234235.png)

vscode-md-taskboard 是一个 Visual Studio Code 扩展，旨在将 Markdown 文件直观地渲染为看板页面，帮助您管理和跟踪任务和笔记。借助这个扩展，您可以在 VS Code 中以看板的形式直观地组织您的 Markdown 任务列表，实时更新看板以反映 Markdown 文件的更改。

## 特性

- **Markdown 渲染**：将 Markdown 文件渲染为可视化的看板页面。
- **实时同步**：Markdown 文件的更新会即时反映在看板页面上。
- **自定义布局**：支持将 Markdown 中的不同级别标题渲染为看板的不同列。
- **任务管理**：支持通过 Markdown 任务列表项 (`- [ ]` 和 `- [x]`) 来表示待办事项和完成的任务。

## 开始使用

1. 安装扩展：

   - 在 VS Code 中，打开扩展视图 (`Ctrl+Shift+X` 或 `Cmd+Shift+X` on Mac)。
   - 搜索 `vscode-md-taskboard` 并安装。

2. 使用扩展：
   - 打开任意 Markdown 文件。
   - 点击右上角的 `Show Markdown Kanban` 按钮或通过命令面板 (`Ctrl+Shift+P` 或 `Cmd+Shift+P` on Mac) 运行 `Show Markdown Kanban` 命令。

## Markdown 语法示例

`vscode-md-taskboard` 允许你将 Markdown 文件直观地渲染为看板页面。以下是一个简单的 Markdown 文件示例，展示了如何使用 Markdown 语法来组织你的看板。

```markdown
# 项目名称

## 待办事项

- [ ] 完成设计文档
- [ ] 与客户会议讨论需求
- [ ] 更新项目计划

## 进行中

- [ ] 开发登录功能
- [ ] 设计数据库模型

## 已完成

- [x] 市场调研
- [x] 初步需求分析
```

## 配置

vscode-md-taskboard 支持以下配置选项：

- `mdTaskboard.columnWidth`: 设置看板列的宽度（默认值：`250`）。

## 贡献

我们欢迎所有形式的贡献，包括错误报告、新功能建议以及代码提交。请参阅 [CONTRIBUTING.md](CONTRIBUTING.md) 了解更多信息。

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 支持

如果您在使用过程中遇到问题或需要帮助，请通过 GitHub Issues 提交您的问题。
