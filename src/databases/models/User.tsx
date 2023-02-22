/**
 * User model containing username and password.
 */

const { DataTypes, Model } = require('sequelize');
import { ipcMain } from "electron";
import bcrypt from "bcrypt";

// Define attributes for User model.
let UserAttributes = {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
};

// Define Hooks for User model.
let UserHooks = {
    beforeCreate: (user: User) => {
        if (user.password) {
            const salt = bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
        }
    },
    beforeUpdate: (user: User) => {
        if (user.password) {
            const salt = bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }
}

/**
 * User model.
 */
class User extends Model {
    validPassword (password: string) {
        return bcrypt.compareSync(password, this.password);
    }
}

// Handle the event to request the users in the database.
ipcMain.handle("database:getUser", async (event, ...args) => {
    // Query the users.
    let users = await User.findAll({
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

// Handle the event to create a new users in the database.
ipcMain.handle("database:createUser", async (
    event, ...args: {name: string, username: string, password: string
    }[]
) => {

    // Create the new user.
    User.create(args[0]);

});

/** @typedef {object} - Group User variables for the model */
const UserModel = {
    model: User,
    Attr: UserAttributes,
    hooks: UserHooks,
};

// Export model.
export default UserModel;
