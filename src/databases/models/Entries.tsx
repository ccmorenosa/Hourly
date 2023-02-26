/**
 * Entries model containing user and name.
 */

const { DataTypes, Model, Op } = require('sequelize');
import { ipcMain } from "electron";

// Define attributes for Entries model.
let EntriesAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    initTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    finalTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    elapsedTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    task: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
};

/**
 * Entries model.
 */
class Entries extends Model {}

// Handle the event to request the entries in the database according to
// project.
ipcMain.handle("database:entries:getEntriesByProject", async (
    event, ...args: {project: string}[]
) => {

    // Query the entries.
    let entries = await Entries.findAll({
        attributes: ["id", "initTime", "finalTime", "elapsedTime", "task"],
        where: {
            "name": args[0].project
        },
        order: [["initTime", "DESC"]]
    });

    /** @type {string[]} - List of entries. */
    let entriesList: {}[] = [];

    // Store the entriesList.
    for (let i = 0; i < entries.length; i++) {
        entriesList.push({
            id: entries[i].id,
            initTime: entries[i].initTime,
            finalTime: entries[i].finalTime,
            elapsedTime: entries[i].elapsedTime,
            task: entries[i].task
        });
    }

    return entriesList;

});

// Handle the event to request the entries in the database according to
// user.
ipcMain.handle("database:entries:getEntriesByUser", async (
    event, ...args: {username: string}[]
) => {

    // Query the entries.
    let entries = await Entries.findAll({
        attributes: [
            "id", "initTime", "finalTime", "elapsedTime",
            "task", "name"
        ],
        where: {
            "username": args[0].username
        },
        order: [["initTime", "DESC"]]
    });

    /** @type {string[]} - List of entries. */
    let entriesList: {}[] = [];

    // Store the entriesList.
    for (let i = 0; i < entries.length; i++) {
        entriesList.push({
            id: entries[i].id,
            initTime: entries[i].initTime,
            finalTime: entries[i].finalTime,
            elapsedTime: entries[i].elapsedTime,
            task: entries[i].task
        });
    }

    return entriesList;

});

// Handle the event to create a new entry in the database.
ipcMain.handle("database:entries:createEntry", async (
    event, ...args: {
        initTime: string, finalTime: string, elapsedTime: string,
        task: string, name: string, username: string
}[]) => {

    // Create the new user.
    Entries.create(args[0]);

});

// Handle the event to edit the task of an entry.
ipcMain.handle("database:entries:editEntryTask", async (
    event, ...args: {id: number, task: string}[]
) => {

    // Edit entry.
    Entries.update(
        {task: args[0].task}, {
            where: {
                id: args[0].id
            }
        }
    );

});

// Handle the event to delete an entry.
ipcMain.handle("database:entries:deleteEntries", async (
    event, ...args: {id: number[]}[]
) => {

    // Delete entry.
    Entries.destroy({
        where: {
            id: {[Op.or]: args[0].id}
        }
    });

});

/** @typedef {object} - Group Entries variables for the model */
const EntriesModel = {
    model: Entries,
    Attr: EntriesAttributes,
};

// Export model.
export default EntriesModel;
