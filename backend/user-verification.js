import bcrypt from 'bcrypt';

export const sampleUsers = [];

export default class User{
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    static async verifyLogin(username, password) {
        const user = sampleUsers.find(value => {return value.username === username})
        if(!user){
            return {success: false, error: "username does not exist", status: 400};
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return {success: true, message: "login success", status: 200};
            }else{
                return {success: false, error: "password is wrong", status: 401};
            }
        }catch{
            return {success: false, error: "internal server error", status: 500};
        }
        
    }

    verifyRegister(confirmPassword) {
        if(!this.username || !this.password || !this.email){
            return {success: false, error: "please fill up all fields", status: 400}
        }

        if(sampleUsers.find(value => {return value.username === this.username})){
            return {success: false, error: "this username already exists", status: 401}
        }

        if(this.password !== confirmPassword){
            return {success: false, error: "the password does not match", status: 400}
        }
        return {success: true, message: "registration success!", status: 201};
    }
}