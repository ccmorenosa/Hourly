// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

//  Set the User API to communicate with the database.
contextBridge.exposeInMainWorld('UserAPI', {
    getUsers: () => ipcRenderer.invoke("database:user:getUsers"),
    getName: (
        username: string
    ) => ipcRenderer.invoke("database:user:getName", {username: username}),
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
    )
})
