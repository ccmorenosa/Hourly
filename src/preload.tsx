// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

//  Set the User API to communicate with the database.
contextBridge.exposeInMainWorld('UserAPI', {
    getUsers: () => ipcRenderer.invoke("database:getUser"),
})
