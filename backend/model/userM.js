const {DataTypes} = require('sequelize');
const {bdd} = require('./index');

const User = bdd.define('users',{

    email: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
},

{
    timestamps: false,
})

module.exports = User;