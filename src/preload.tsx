// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

//  Set the User API to communicate with the database.
contextBridge.exposeInMainWorld('UserAPI', {
    getUsers: () => ipcRenderer.invoke("database:user:getUsers"),
    getName: (username: string) => ipcRenderer.invoke(
        "database:user:getName", {username: username}
    ),
    createUser: (
        name: string, username: string, password: string
    ) => ipcRenderer.invoke(
        "database:user:createUser",
        {name: name, username: username, password: password}
    ),
    validateUserLogIn: (
        username: string, password: string
    ) => ipcRenderer.invoke(
        "database:user:validateUserLogIn",
        {username: username, password: password}
    ),
});

//  Set the Project API to communicate with the database.
contextBridge.exposeInMainWorld('ProjectAPI', {
    getProjects: (username: string) => ipcRenderer.invoke(
        "database:project:getProjects", {username: username}
    ),
    createProject: (username: string, name: string) => ipcRenderer.invoke(
        "database:project:createProject", {username: username, name: name}
    ),
});

//  Set the Entries API to communicate with the database.
contextBridge.exposeInMainWorld('EntriesAPI', {
    getEntriesByProject: (project: string) => ipcRenderer.invoke(
        "database:entries:getEntriesByProject", {project: project}
    ),
    getEntriesByUser: (username: string) => ipcRenderer.invoke(
        "database:entries:getEntriesByUser", {username: username}
    ),
    createEntry: (
        initTime: string, finalTime: string, elapsedTime: string,
        task: string, name: string, username: string
    ) => ipcRenderer.invoke(
        "database:entries:createEntry",
        {
            initTime: initTime, finalTime: finalTime,
            elapsedTime: elapsedTime, task: task, name: name,
            username: username
        }
    ),
    editEntryTask: (id: number, task: string) => ipcRenderer.invoke(
        "database:entries:editEntryTask", {id: id, task: task}
    ),
    deleteEntries: (id: number[]) => ipcRenderer.invoke(
        "database:entries:deleteEntries", {id: id}
    ),
});
