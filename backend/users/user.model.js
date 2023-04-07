const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: true },
        firstName: { type: DataTypes.STRING, allowNull: true },
        lastName: { type: DataTypes.STRING, allowNull: true },
        role: { type: DataTypes.STRING, allowNull: true },
        userId: { type: DataTypes.STRING, allowNull: true },
        userLogin: { type: DataTypes.STRING, allowNull: true },
        custNoAllowed: { type: DataTypes.STRING, allowNull: true },
        chargeCustAllowed: { type: DataTypes.STRING, allowNull: true },
        programsToAccess: { type: DataTypes.STRING, allowNull: true },
        pomRoles: { type: DataTypes.STRING, allowNull: true },
        auth0Id: { type: DataTypes.STRING, allowNull: true },
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}