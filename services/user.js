import * as UserRepo from '../repository/user.js';
import { successResp } from '../utils/response.js';

export const getUsers = async (response, request, next) => {
    try {
        const [result] = await UserRepo.getData();
        successResp(response, "success", result)
    } catch (error) {
        next(error)
    }
    
}

export const createUser = async (response, request, next) => {
    try {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        const [result] = await UserRepo.createData(name, email, password);
        let id = result.insertId;
        const [users] = await UserRepo.getDataById(id);

        successResp(response, "success create user", users[0], 201)
    } catch(error) {
        next(error)
    }
    
}

export const updateUser = async (id, name, email) => {
    const [result] = await UserRepo.updateData(id, name, email);

    console.log(result)
}