// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

//  Set the User API to communicate with the database.
contextBridge.exposeInMainWorld('UserAPI', {
    getUsers: () => ipcRenderer.invoke("database:getUser"),
    getName: (
        username: string
    ) => ipcRenderer.invoke("database:getName", {username: username}),
    createUser: (
        name: string, username: string, password: string
    ) => ipcRenderer.invoke(
        "database:createUser",
        {name: name, username: username, password: password}
    ),
    validateUserLogIn: (
        username: string, password: string
    ) => ipcRenderer.invoke(
        "database:validateUserLogIn",
        {username: username, password: password}
    )
})
