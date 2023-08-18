
/*
    1. Buat fungsi autUser dengan tambahan fungsi untuk menyimpan refresh token di table user_token
        - table user_token berisi : user_id, refresh_token, create_at, updated_at;
    2. Buat endpoint token/refresh : untuk membuat access token baru
        - responsenya adalah object yang berisi {access_token, refresh_token}
*/
import express from 'express';
import * as UserService from './services/user.js';
import { errorResp } from './utils/response.js';

const app = express();
const port = 8080;
const host = "localhost";

app.use(express.json());

app.get("/users", UserService.getUsers);
app.post("/users", UserService.createUser);
app.put("/users/:id", UserService.updateUser);
app.post("/login", UserService.authUser)

app.use((error, request, response, next) => {
    const message = "internal server error";
    console.log(error.message);

    errorResp(response, message, 500) 
});

app.listen(port, host, () => {
    console.log(`server berjalan di http://${host}:${port}`);
})