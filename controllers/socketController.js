const { truncate } = require("../db")
const { User, Messages, Contacts } = require("../models/models")


class Socket{
    static setOnlineStatus(usernumber){
        // В БУДУЩЕМ ПОПРАВИТЬ И СДЕЛАТЬ НОРМАЛЬНО С ПРИВЯЗКОЙ К ЮЗЕРУ
        const contacts = Contacts.update(
            { online: true},
            { where: {contact_number: usernumber} }
        )
        // if(!!contacts)
        //     return true
        // return false

        const user = User.update(
            { online: true},
            { where: {number: usernumber} }
        )
        if(!!user)
            return true
        return false
    }

    static setOfflineStatus(usernumber){
        const contacts = Contacts.update(
            { online: false},
            { where: {contact_number: usernumber} }
        )

        const user = User.update(
            { online: false},
            { where: {number: usernumber} }
        )
        if(!!contacts)
            return true
        return false
    }

    static sendMessage(request_number, response_number, message){
        var dataObj
        Messages.create({request_number, response_number, message})
        .then((resultEntity) => {
            dataObj = resultEntity.get({plain:true})
            return dataObj
        })
    }
}

module.exports = Socket