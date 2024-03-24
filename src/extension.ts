import * as vscode from 'vscode';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

// 解析 Markdown 文本
function parseMarkdown(text: string): string {
  return md.render(text);
}

function createKanbanWebview(context: vscode.ExtensionContext) {
	const panel = vscode.window.createWebviewPanel(
	  'kanban', // 标识
	  'Markdown Kanban', // 面板标题
	  vscode.ViewColumn.One, // 编辑器列
	  {}, // Webview 选项
	);
  
	// 当活动的文本编辑器变化时更新 Webview
	vscode.window.onDidChangeActiveTextEditor(editor => {
	  if (editor && editor.document.languageId === 'markdown') {
		const text = editor.document.getText();
		const htmlContent = parseMarkdown(text);
		panel.webview.html = htmlContent; // 将 Markdown 转换为 HTML 并显示
	  }
	});
  }
  
  // 激活函数
  export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.showKanban', () => {
	  // 命令的实现逻辑
	  vscode.window.showInformationMessage('Hello World from your Extension!');
	});
  
	context.subscriptions.push(disposable);
  }
  
  export function deactivate() {}
  