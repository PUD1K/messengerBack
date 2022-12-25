const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: false},
    pass: {type: DataTypes.STRING, unique: false},
    number: {type: DataTypes.STRING, unique: true}, 
    online: {type: DataTypes.BOOLEAN, unique:false, defaultValue:false}
})

// user_id - айди юзера, который добавил в контакты пользователя contact_number
const Contacts = sequelize.define('contacts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    contact_number : {type: DataTypes.STRING, unique: false},
    online: {type: DataTypes.BOOLEAN, unique:false, defaultValue:false},
    name: {type: DataTypes.STRING, unique: false}
})

const Messages = sequelize.define('messages', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    request_number: {type: DataTypes.STRING, unique: false},
    response_number: {type: DataTypes.STRING, unique: false},
    message: {type: DataTypes.STRING, unique: false},
})

User.hasMany(Contacts)
Contacts.belongsTo(User)


module.exports = {
    User,
    Contacts,
    Messages
}
