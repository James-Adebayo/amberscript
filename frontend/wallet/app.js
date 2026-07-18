const balanceDisplay = document.querySelector('.card-balance-val');
const depositForm = document.getElementById('form-deposit');
const withdrawForm = document.getElementById('form-withdraw');
class BalanceApi{
    async fetchBalance(){
        const res = await fetch('/get-balance');
        return await res.json();
    }
    async deposit(amount){
        // sent post request here
        return {message: amount};
    }

    async withdraw(amount){
        return {message: amount};
    }
}

class BalanceStore{
    constructor(){
        this.amount = 0;
    }

    setAmount(amount){
        this.amount = amount;
    }

    getAmount(){
        return this.amount;
    }

    depositAmount(amount){
        this.amount += parseFloat(amount);
    }

    withdrawAmount(amount){
        this.amount -= parseFloat(amount);
    }
}

class BalanceController{
    constructor(api, store){
        this.api = api;
        this.store = store;
    }

   async loadBalance(){
        try{
            const data = await this.api.fetchBalance();
            this.store.setAmount(data.message);
        }catch(err){
            console.log("Failed to update balance");
        }finally{
            this.update();
        }
   }

   async deposit(amount){
        try{
            const data = await this.api.deposit(amount);
            this.store.depositAmount(data.message);
        }catch(err){

        }finally{
            this.update()
        }
   }

   async withdraw(amount){
    try{
        const data = await this.api.withdraw(amount);
        this.store.withdrawAmount(data.message);
    }catch(err){

    }finally{
        this.update();
    }
   }

   update(){
        const formattedBalance = (this.store.getAmount()).toLocaleString({
            minimumFractionDigit: 2,
            maximumFractionDigit: 2
        });
        balanceDisplay.textContent = `₦${formattedBalance}`;
   }
}

const api = new BalanceApi();
const store = new BalanceStore();
const controller = new BalanceController(api, store);

controller.loadBalance();

depositForm.addEventListener("submit", () => {
    const formData = new FormData(depositForm);
    const depositAmount = formData.get('deposit-amount');
    controller.deposit(depositAmount);
});

withdrawForm.addEventListener('submit', () => {
    const formData = new FormData(withdrawForm);
    const withdrawAmount = formData.get('withdraw-amount-input');
    controller.withdraw(withdrawAmount);
});