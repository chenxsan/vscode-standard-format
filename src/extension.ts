
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import standardFormat = require('standard-format');

export function format(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions) {

  if (range === null) {
    var start = new vscode.Position(0, 0);
    var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
    range = new vscode.Range(start, end);
  }

  var result: vscode.TextEdit[] = [];

  var content = document.getText(range);

  if (!options) {
    options = { insertSpaces: true, tabSize: 4 };
  }

  var formatted = standardFormat.transform(content);
  if (formatted) {
    result.push(new vscode.TextEdit(range, formatted));
  }

  return result;
};


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // format on save
  vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
    if (document.languageId !== 'javascript') return
    var standardFormatConfig = vscode.workspace.getConfiguration('standardFormat')
    if (standardFormatConfig && standardFormatConfig["formatOnSave"]) {
      return vscode.commands.executeCommand('format.standard')      
    }

  })

  context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('javascript', {
    provideDocumentFormattingEdits: (document, options, token) => {
      return format(document, null, options)
    }
  }));
  context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider('javascript', {
    provideDocumentRangeFormattingEdits: (document, range, options, token) => {
      var start = new vscode.Position(0, 0);
      var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
      return format(document, new vscode.Range(start, end), options)
    }
  }));
  context.subscriptions.push(vscode.commands.registerTextEditorCommand('format.standard', (textEditor, edit) => {
    var { document, selection } = textEditor
    var start;
    var end;
    if (selection.start.line === selection.end.line && selection.start.character === selection.end.character) {
      // no selections, then whole document
       start = new vscode.Position(0, 0);
       end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
    } else {
      // with selection
      start = new vscode.Position(selection.start.line, 0)
      end = new vscode.Position(selection.end.line, document.lineAt(selection.end.line).text.length)
    }
    var range = new vscode.Range(start, end);
    var content = document.getText(range);
    var formatted = standardFormat.transform(content);
    var result: vscode.TextEdit[] = [];
    edit.replace(range, formatted);
  }))
}