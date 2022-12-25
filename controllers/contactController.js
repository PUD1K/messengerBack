const ApiError = require("../error/ApiErorr");
const { User, Contacts } = require("../models/models");

class ContactController{
    async add(req, res){
        const {id, number} = req.body
        let contact = await Contacts.findOne({where: {userId: id, contact_number: number}})

        const check = await User.findOne({where: {id, number}})
        const check_two = await User.findOne({where: {number}})
        if(check){
            return res.json({message: "Нельзя добавить в контакты самого себя"})
        }
        if(!check_two){
            return res.json({message: "Пользователь отсутствует в системе"})
        }
        if(!contact){
            const online = await User.findOne({where: {id, number, online: true}})
            if(!!online)
                contact = await Contacts.create({userId: id, contact_number: number, name: check_two.dataValues.name, online: true})
            else 
                contact = await Contacts.create({userId: id, contact_number: number, name: check_two.dataValues.name})
            return res.json({message: "Пользователь успешно добавлен"})
        }
        return res.json({message: "Пользователь уже в ваших контактах"})
    }

    async getContacts(req, res){
        const {id} = req.params
        const contacts = await Contacts.findAll({where: {userId: id}})
        // for(var key in contacts){
        //     users.push(await User.findOne({where: {number}}))
        // }
        return res.json(contacts)
    }

    async removeContact(req, res){
        console.log("we are here")
        const {id, number} = req.body
        let contact = await Contacts.findOne({where: {userId: id, contact_number: number}})
        if(contact){
            contact = await Contacts.destroy({where: {userId: id, contact_number: number}})
            return res.json({message: "Контакт успешно удален"})
        }
        return res.json({message: "Контакт уже удален"})
    }
}

module.exports = new ContactController 