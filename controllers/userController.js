const ApiError = require("../error/ApiErorr")
const { User } = require("../models/models")
const bcrypt = require('bcrypt')

class UserController{
    async registration(req, res, next){
        const {name, number, password} = req.body
        console.log(req.body)
        if(!number || !password){
            return res.json({message: 'Некорректный номер телефона или пароль'})
        }
        const candidate = await User.findOne({where: {number}})
        if(candidate){
            return res.json({message: 'Некорректный номер телефона или пароль'})
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name: name, number: number, pass: hashPassword})
        return res.json({message: 'Пользователь зарегистрирован'})
    }

    async login(req, res){
        const {number, password} = req.body
        const user = await User.findOne({where: {number}})
        if(!user){
            return res.json({message: 'Пользователя с таким номером не существует'})
        }
        let comparePassword = bcrypt.compareSync(password, user.pass)
        if (!comparePassword){
            return res.json({message: 'Неверный пароль'})
        }
        return res.json(user)
    }

    async getUserByNumber(req, res){
        const {number} = req.params
        console.log(number)

        const user = await User.findOne({
            where: {
                number
            }
        })

        return res.json(user)
    }

    async getUserById(req, res){
        const {id} = req.params

        const user = await User.findOne({
            where: {
                id
            }
        })

        return res.json(user)
    }

    async getAllUsers(req, res){
        const users = await User.findAll()
        return res.json(users)
    }
}

module.exports = new UserController()