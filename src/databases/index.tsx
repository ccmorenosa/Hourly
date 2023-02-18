/**
 * Databases configuration.
 */

const { Sequelize } = require('sequelize');
import { app, ipcMain } from 'electron';
import path from "path";
import UserModel from './models/User';


// Database variable.
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(
        app.getPath("userData"),
        "database.sqlite"
    )
});

// Init user model.
UserModel.model.init(
    UserModel.Attr,
    {
        sequelize,
        modelName: 'User',
        hooks: UserModel.hooks
    }
);

// Synchronize the tables.
(async () => {
    await sequelize.sync({ alter: true })
})();

// Handle the event to request the users in the database.
ipcMain.handle("database:getUser", async (event, ...args) => {
    // Query the users.
    let users = await UserModel.model.findAll({
        attributes: ["username"]
    });

    /** @type {string[]} - List of usernames. */
    let usernames: string[] = [];

    // Store the usernames.
    for (let i = 0; i < users.length; i++) {
        usernames.push(users[i].username)

    }

    return usernames;
});
