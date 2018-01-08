'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let compareWith = vscode.commands.registerCommand('compareit.compareWith', async (selectedFile: vscode.Uri) => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const uris = await vscode.window.showOpenDialog({});
        if (!uris){
            vscode.window.showInformationMessage('Please select file to compare');
            return;
        }
      
        let success = await vscode.commands.executeCommand('vscode.diff', selectedFile, uris[0]);
    });

    context.subscriptions.push(compareWith);
}

// this method is called when your extension is deactivated
export function deactivate() {
}