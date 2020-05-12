/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as querystring from 'querystring';
import { commands, Disposable, Uri, UriHandler, window } from 'vscode';

export class ImportHandler implements UriHandler {

    private disposables: Disposable[] = [];

    constructor() {
        this.disposables.push(window.registerUriHandler(this));
    }

    public handleUri(uri: Uri): void {
        switch (uri.path) {
            case '/ImportTrialApp': this.importTrialApp(uri);
        }
    }

    public dispose(): void {
        this.disposables = dispose(this.disposables);
    }

    private importTrialApp(uri: Uri): void {
        const data = querystring.parse(uri.query);

        if (!data.url) {
            console.warn('Failed to import URI:', uri);
        }

        commands.executeCommand('appService.ImportTrialApp', data.loginSession);
    }
}

export interface IDisposable {
    dispose(): void;
}

export function dispose<T extends IDisposable>(disposables: T[]): T[] {
    disposables.forEach(d => d.dispose());
    return [];
}
