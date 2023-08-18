import * as UserRepo from '../repository/user.js';
import { errorResp, successResp } from '../utils/response.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY_TOKEN = 'kelas.com-Token';
const SECRET_KEY_RT = 'kelas.com-refresh';

export const getUsers = async (request, response, next) => {
    try {
        const [result] = await UserRepo.getData();
        successResp(response, "success", result)
    } catch (error) {
        next(error)
    }
}

export const createUser = async (request, response, next) => {
    try {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        const saltRounds = 10; 
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            const [result] = await UserRepo.createData(name, email,hash );
            let id = result.insertId;
            const [users] = await UserRepo.getDataById(id);
            successResp(response, "success create user", users[0], 201)
        });
    } catch(error) {
        next(error)
    }
    
}

export const updateUser = async (request, response, next) => {
    const [result] = await UserRepo.updateData(id, name, email);

    console.log(result)
}

export const authUser = async (request, response, next) => {
    try {
        let email = request.body.email;
        let password = request.body.password;
        const [result] = await UserRepo.getDataByEmail(email)
        
        if (result.length > -1) {
            const user = result[0];
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    let claims = {
                        id: user.user_id,
                        name: user.name,
                        email: user.email,
                    }
                    const accessToken = jwt.sign(claims,SECRET_KEY_TOKEN,{expiresIn:'15m'});
                    const refreshToken = jwt.sign(claims, SECRET_KEY_RT, {expiresIn:'30m'});

                    let data = {
                        access_token: accessToken, 
                        refresh_token: refreshToken
                    }
                    successResp(response, "berhasil login", data);
                }
            })
        } else {
            errorResp(response, "email atau password tidak cocok")
        }
    } catch(error) {
        next(error)
    }
}