
/*
    1. Rubah api CRUD user yang dicontohkan oleh mentor menjadi API yang terkoneksi ke database.
*/
import express from 'express';
import * as UserService from './services/user.js';

const app = express();
const port = 8080;
const host = "localhost";

app.use(express.json());

app.get("/users", UserService.getUser);
app.post("/users", UserService.addUser);
app.put("/users/:id", UserService.updateUser);

app.listen(port, host, () => {
    console.log(`server berjalan di http://${host}:${port}`);
})