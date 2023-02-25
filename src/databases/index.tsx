/**
 * Databases configuration.
 */

const { Sequelize } = require('sequelize');
import { app } from 'electron';
import path from "path";
import UserModel from './models/User';
import ProjectModel from './models/Project';
import EntriesModel from './models/Entries';

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

// Init project model.
ProjectModel.model.init(
    ProjectModel.Attr,
    {
        sequelize,
        modelName: 'Project'
    }
);

// Associate Users to Projects with One-To-Many model.
UserModel.model.hasMany(ProjectModel.model, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'username',
});
ProjectModel.model.belongsTo(UserModel.model);

// Init entries model.
EntriesModel.model.init(
    EntriesModel.Attr,
    {
        sequelize,
        modelName: 'Entries'
    }
);

// Associate Users to Projects with One-To-Many model.
ProjectModel.model.hasMany(EntriesModel.model, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'name',
});
EntriesModel.model.belongsTo(ProjectModel.model);

// Associate Users to Projects with One-To-Many model.
UserModel.model.hasMany(EntriesModel.model, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'username',
});
EntriesModel.model.belongsTo(UserModel.model);

// // Synchronize the tables.
// (async () => {
//     await sequelize.sync({ alter: true })
// })().catch((e) => { console.log(e); });
