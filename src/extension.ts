import * as vscode from 'vscode';
import MarkdownIt from 'markdown-it';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('markdownKanban.showBoard', () => {
        const panel = vscode.window.createWebviewPanel(
            'markdownKanban',
            'Markdown Kanban',
            vscode.ViewColumn.One,
            {}
        );

        const updateWebview = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const text = editor.document.getText();
                panel.webview.html = getWebviewContent(text);
            }
        };

        updateWebview();

        vscode.workspace.onDidChangeTextDocument((event) => {
            if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
                updateWebview();
            }
        });
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(markdownContent: string): string {
    const md = new MarkdownIt();
    const tokens = md.parse(markdownContent, {});

    let boardTitle = 'Markdown Kanban';
    let columnsHTML = '';
    let currentColumnTasks = '';
    let inTaskList = false;  // Flag to track if we're processing a task list
    let currentColumnName = '';

    tokens.forEach((token, index) => {
        if (token.type === 'heading_open' && token.tag === 'h1') {
            boardTitle = tokens[index + 1].content;
        } else if (token.type === 'heading_open' && token.tag === 'h2') {
            if (currentColumnTasks) {
                columnsHTML += `<div class="column"><h2>${currentColumnName}</h2>${currentColumnTasks}</div>`;
                currentColumnTasks = '';
            }
            currentColumnName = tokens[index + 1].content;
        } else if (token.type === 'bullet_list_open') {
            inTaskList = true;
        } else if (token.type === 'bullet_list_close') {
            inTaskList = false;
        } else if (inTaskList && token.type === 'inline') {
            const taskText = token.content;
            if (taskText.startsWith('[ ] ')) {
                currentColumnTasks += `<div class="task">${taskText.slice(3)}</div>`;
            } else if (taskText.startsWith('[x] ')) {
                currentColumnTasks += `<div class="task completed">${taskText.slice(3)}</div>`;
            }
        }
    });

    // Add any remaining tasks to the last column
    if (currentColumnTasks) {
        columnsHTML += `<div class="column"><h2>${currentColumnName}</h2>${currentColumnTasks}</div>`;
    }

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';">
            <title>${boardTitle}</title>
            <style>
                .board {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    overflow-x: auto;
                }
                .column {
                    flex: 0 0 auto;
                    width: 150px;
                    margin: 10px;
                    padding: 10px;
                    border: 1px solid #ddd;
                    background-color: #f1f1f1;
                }
                .task {
                    margin: 10px 0;
                    padding: 10px;
                    background-color: #fff;
                    border: 1px solid #ddd;
                }
                .completed {
                    text-decoration: line-through;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <h1>${boardTitle}</h1>
            <div class="board">${columnsHTML}</div>
        </body>
        </html>
    `;
}


export function deactivate() {}
