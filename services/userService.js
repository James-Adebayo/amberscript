class UserService{
    async getUser(){
        return {message: {
            username: "virgo",
            email: "virgo@amberscript.com"
        }}
    }
}

module.exports = new UserService();