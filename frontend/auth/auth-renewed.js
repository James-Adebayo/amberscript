// class AuthApi{
//     constructor(url, payload){
//         this.url = url;
//         this.payload = payload;
//     }
//     async authQuery(){
//         const res = await fetch(this.url, {
//             method: 'POST',
//             credentials: 'include',
//             headers: {'Content-Type' : 'application/json'},
//             body: JSON.stringify(this.payload)
//         });
//         return await res.json();
//     }    
// }

// class AuthResponse{
//     async getResponse(response){
//         this.response = response;
//         return this.response;
//     }
// }

// class AuthController{
//     async sendPayload(api, response){
//         try{
//             const data = await api.authQuery()
//             this.response.getResponse(data.message);
//         }catch(err){

//         }
//     }
// }

// class AuthPayload{
//     async getPayload(){
        
//     }
// }

// const api = new AuthApi();
// const response = new AuthResponse();
// const controller = new AuthController(api, response);