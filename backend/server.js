import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './user-verification.js';
import { sampleUsers } from './user-verification.js';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, "../frontend")));
app.use(express.json());

console.log(path.resolve(__dirname, "../frontend"));
app.get("/", (req, res) =>{
    res.sendFile(path.resolve(__dirname, "../frontend/html/dashboard.html"))
});

app.get("/login", (req, res) =>{
    res.sendFile(path.resolve(__dirname, "../frontend/html/loginpage.html"))
});

app.post("/login", async (req, res) =>{
    const {username, password} = req.body;
    const verify = await User.verifyLogin(username, password);
    return res.status(verify.status).json(verify)

});

app.post("/register", async (req, res) =>{
    const {username, password, confirmPassword, email} = req.body;
    const user = new User(username, password, email);
    console.log(user);
    const verify = user.verifyRegister(confirmPassword);

    if(verify.success){
        const hashedPassword = await bcrypt.hash(user.password, 10);
        sampleUsers.push({username: user.username, password: hashedPassword, email: user.email});
    }
    console.log(sampleUsers);
    
    res.status(verify.status).json(verify);
});


app.listen(PORT);