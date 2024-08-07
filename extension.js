const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
  const stylePath = path.join(context.extensionPath, 'styles', 'fonts.css');
  const styleUri = vscode.Uri.file(stylePath);

  vscode.workspace.onDidChangeConfiguration(() => {
    vscode.window.showInformationMessage('ElMente theme configuration changed. Please reload VSCode for changes to take effect.');
  });

  fs.readFile(styleUri.fsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Could not read fonts.css:', err);
      return;
    }
    const style = `
      <style>
        ${data}
      </style>
    `;
    const panel = vscode.window.createWebviewPanel(
      'elmenteCSSLoader',
      'ElMente CSS Loader',
      vscode.ViewColumn.Two,
      {}
    );
    panel.webview.html = style;
  });
}

exports.activate = activate;
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
