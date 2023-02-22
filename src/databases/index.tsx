/**
 * Databases configuration.
 */

const { Sequelize } = require('sequelize');
import { app } from 'electron';
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
})().catch((e) => { console.log(e); });
