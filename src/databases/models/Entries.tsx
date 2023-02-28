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
    },
    fav: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
    event, ...args: {username: string, project: string, query?: IEntryQuery}[]
) => {

    // Set the where options
    let where: {[key: string]: any} = {
        "username": args[0].username, "name": args[0].project
    };

    // Add queries if any.
    if (args[0].query) {
        // Fav flag.
        where["fav"] = args[0].query.fav;

        // Time ranges.
        where["initTime"] = {
            [Op.between] : [args[0].query.from, args[0].query.to]
        };
        where["finalTime"] = {
            [Op.between] : [args[0].query.from, args[0].query.to]
        };

        // Elapsed time.
        where["elapsedTime"] = {
            [Op.between] : [args[0].query.minElapsed, args[0].query.maxElapsed]
        };

    }

    // Query the entries.
    let entries = await Entries.findAll({
        attributes: [
            "id", "initTime", "finalTime", "elapsedTime", "task", "fav"
        ],
        where: where,
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
            task: entries[i].task,
            fav: entries[i].fav,
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
            "task", "fav", "name"
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
            task: entries[i].task,
            name: entries[i].name,
            fav: entries[i].fav,
        });
    }

    return entriesList;

});

// Handle the event to create a new entry in the database.
ipcMain.handle("database:entries:createEntry", async (
    event, ...args: {
        initTime: string, finalTime: string, elapsedTime: string,
        task: string, fav?: 0 | 1, name: string, username: string
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

// Handle the event to change fav status of an entry.
ipcMain.handle("database:entries:changeFav", async (
    event, ...args: {id: number, fav: 0 | 1}[]
) => {

    // Edit entry.
    Entries.update(
        {fav: args[0].fav}, {
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
