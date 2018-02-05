'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { read } from 'clipboardy';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    vscode.workspace.registerTextDocumentContentProvider('compareit', {
        /**
		 * Provide textual content for a given uri.
		 *
		 * The editor will use the returned string-content to create a readonly
		 * [document](#TextDocument). Resources allocated should be released when
		 * the corresponding document has been [closed](#workspace.onDidCloseTextDocument).
		 *
		 * @param uri An uri which scheme matches the scheme this provider was [registered](#workspace.registerTextDocumentContentProvider) for.
		 * @param token A cancellation token.
		 * @return A string or a thenable that resolves to such.
		 */
		async provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken){
            const clipboardData = await read();
            return clipboardData;
        }
    })
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let compareWith = vscode.commands.registerCommand('compareit.compareWith', async (selectedFile: vscode.Uri) => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const uris = await vscode.window.showOpenDialog({});
        if (!uris) {
            vscode.window.showInformationMessage('Please select file to compare');
            return;
        }

        let success = await vscode.commands.executeCommand('vscode.diff', selectedFile, uris[0]);
    });

    let compareWithClipboard = vscode.commands.registerCommand('compareit.compareWithClipboard', async (selectedFile: vscode.Uri) => {
        let success = await vscode.commands.executeCommand('vscode.diff', selectedFile, vscode.Uri.parse('compareit://clipboard'));
    });

    context.subscriptions.push(compareWith);
    context.subscriptions.push(compareWithClipboard);
}

// this method is called when your extension is deactivated
export function deactivate() {
} 