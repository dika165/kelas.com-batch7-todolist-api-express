import { nanoid } from "nanoid";

const users = [];

export const addUser = (request, response, next) => {
    try {
        let id = nanoid(6);
        let name = request.body.name;
        let email = request.body.email;
        let password=request.body.password;
        let user = {id, name, email, password}
        users.push(user)
    
        return response.json(user)

    } catch (error) {
        next(error)
    }
    
}

export const getUser = (request, response, next) => {
    try {
        return response.json(users)
    } catch (error) {
        next(error)
    }
}

export const updateUser = (request, response, next) => {
    try {
        let id = request.params.id;
        let name = request.body.name;
        let email = request.body.email;
        let index = users.findIndex(item => item.id == id)
        if(index > -1) {
            let user = users[index];
            user.email = email;
            user.name = name;
            return response.json(users[index])
        } else {
            return response.json({
                message: "data tidak ditemukan"
            })
        }
    } catch (error) {
        next(error)
    }
}