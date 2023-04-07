const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        url: { type: DataTypes.STRING, allowNull: true },
        category: { type: DataTypes.STRING, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        codeLoc: { type: DataTypes.STRING, allowNull: true },
        appCode: { type: DataTypes.STRING, allowNull: true },
        popup: { type: DataTypes.STRING, allowNull: true },
        bootstrap: { type: DataTypes.STRING, allowNull: true },
        catSeq: { type: DataTypes.STRING, allowNull: true },
        pageSeq: { type: DataTypes.STRING, allowNull: true },
        newModal: { type: DataTypes.STRING, allowNull: true },
    };

    return sequelize.define('Article', attributes);
}