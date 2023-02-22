/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

// Export interface IUserAPI.
export interface IUserAPI {
    getUsers: () => Promise<string[]>,
    getName: (username: string) => Promise<string>,
    createUser: (
        name: string, username: string, password: string
    ) => Promise<void>,
    validateUserLogIn: (
        username: string, password: string
    ) => Promise<boolean>,
}

// Export interface IProjectAPI.
export interface IProjectAPI {
    getProjects: (username: string) => Promise<string[]>,
    createProject: (username: string, name: string) => Promise<void>,
}

// Export interface IEntriesAPI.
export interface IEntriesAPI {
    getEntries: (project: string) => Promise<{}[]>,
    createEntry: (
        initTime: string, finalTime: string, elapsedTime: string,
        task: string, name: string
    ) => Promise<void>,
}

// Declare new attribute of window.
declare global {
    interface Window {
        UserAPI: IUserAPI
        ProjectAPI: IProjectAPI
        EntriesAPI: IEntriesAPI
    }
}

import './App';
