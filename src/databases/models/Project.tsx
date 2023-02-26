/**
 * Project model containing user and name.
 */

const { DataTypes, Model } = require('sequelize');
import { ipcMain } from "electron";

// Define attributes for Project model.
let ProjectAttributes = {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
};

/**
 * Project model.
 */
class Project extends Model {}

// Handle the event to request the projects in the database according to user.
ipcMain.handle("database:project:getProjects", async (
    event, ...args: {username: string}[]
) => {

    // Query the projects.
    let projects = await Project.findAll({
        attributes: ["name"],
        where: {
            "username": args[0].username
        }
    });

    /** @type {string[]} - List of projects. */
    let names: string[] = [];

    // Store the names.
    for (let i = 0; i < projects.length; i++) {
        names.push(projects[i].name);
    }

    return names;

});

// Handle the event to create a new project in the database.
ipcMain.handle("database:project:createProject", async (
    event, ...args: {username: string, name: string}[]
) => {

    // Create the new project.
    Project.create(args[0]).catch((e: any) => {console.log(e);});

});

// Handle the event to delete a project.
ipcMain.handle("database:project:deleteProject", async (
    event, ...args: {username: string, name: string}[]
) => {

    // Delete entry.
    Project.destroy({
        where: {
            username: args[0].username,
            name: args[0].name
        }
    }).catch((e: any) => {console.log(e);});

});

/** @typedef {object} - Group Project variables for the model */
const ProjectModel = {
    model: Project,
    Attr: ProjectAttributes,
};

// Export model.
export default ProjectModel;
