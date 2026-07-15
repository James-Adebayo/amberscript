const authRepo = require('../repository/authRepository');
class AuthService {
    async signin (email, password) {
        if(!email || !password) {
            return {success: false, message: "Email or password field empty"};
        };
        // const user = authRepo.signin(email, password);
        // if (!user){
        //     return {success: false, message: "Invalid Credentials"}
        // }
        
        return {success: true, message: "Sign in successful"};
        // check password etc.
         // const isMatch = await bcrypt
        // checking of bcrypt here then use of tokens

        // if successful return success message and token
    } 

    async signup (email, password) {
        if(!email || !password) {
            return {success: false, message: "Email or password field empty"};
        };

        return {success: true, message: "Sign up successful"};
    }
}

module.exports = new AuthService();