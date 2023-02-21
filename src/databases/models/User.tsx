/**
 * User model containing username and password.
 */

const { DataTypes, Model } = require('sequelize');
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

/** @typedef {object} - Group User variables for the model */
const UserModel = {
    model: User,
    Attr: UserAttributes,
    hooks: UserHooks,
};

// Export model.
export default UserModel;