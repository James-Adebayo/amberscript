const username = document.querySelectorAll('#username');
const userEmail = document.querySelectorAll('#user-email');
class UserApi{
    async fetchUser(){
        const res = await fetch('/user');
        return await res.json();
        
    }
}

class UserStore{
    storeUser(user){
        this.user = user;
    }

    getUser(){
        return this.user;
    }
}

class UserController{
    constructor(user_api, user_store){
        this.user_api = user_api;
        this.user_store = user_store;
    }
    async updateUser(){
        try{
            const data = await this.user_api.fetchUser();
            this.user_store.storeUser(data.message);
        }catch(err){

        }finally{
            username.forEach(user => {
                user.textContent = this.user_store.getUser().username;
                user.value = this.user_store.getUser().username;
            });
            userEmail.forEach(email => {
                email.textContent = this.user_store.getUser().email;
                email.value = this.user_store.getUser().email;
            })
        }
    }
}

const user_api = new UserApi();
const user_store = new UserStore();
const user_controller = new UserController(user_api, user_store);
user_controller.updateUser();