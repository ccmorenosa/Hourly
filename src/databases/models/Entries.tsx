/**
 * Entries model containing user and name.
 */

const { DataTypes, Model } = require('sequelize');
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
ipcMain.handle("database:entries:getEntries", async (
    event, ...args: {project: string}[]
) => {

    // Query the entries.
    let entries = await Entries.findAll({
        attributes: ["id", "initTime", "finalTime", "elapsedTime", "task"],
        where: {
            "name": args[0].project
        }
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
        task: string, name: string
}[]
) => {

    // Create the new user.
    Entries.create(args[0]);

});

/** @typedef {object} - Group Entries variables for the model */
const EntriesModel = {
    model: Entries,
    Attr: EntriesAttributes,
};

// Export model.
export default EntriesModel;
