const balanceDisplay = document.querySelector('.card-balance-val');
class Balanced{
    constructor(balance){
        this.balance = balance;
    }
    async fetchBalance(){
        try
        {
            const responseBalance = await fetch('/get-balance');
            const data = await responseBalance.json();
            this.balance = data.message ?? null;
            this.update();
        }catch(err){
            console.error("failed to fetch balance");
        }
    }

    deposit(amount){
        // Post request
        this.balance += amount; // the backend is responsible for this.
        this.update();
    }

    withdraw(amount){
        // Send post request
        this.balance -= amount;
    }

    transfer(transferTo, amount){
        // do the transaction, remove amount from wallet, credit user that amount
    }

    update(){
        const formattedBalance = (this.balance).toLocaleString({
            minimumFractionDigit: 2,
            maximumFractionDigit: 2
        });
        balanceDisplay.textContent = `₦${formattedBalance}`;
    }
}

const balance = new Balanced(0);
window.addEventListener("DOMContentLoaded", balance.fetchBalance());



