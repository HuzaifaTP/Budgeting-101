class Budget101 {

    constructor() {
        this.userInput = document.getElementById("earningsOrSpendings");
        this.transactionType = document.getElementById("transaction_type")

        this.spendingEarningForm = document.getElementById("spending_earning_form");
        this.balanceAmount = document.getElementById("current_Balance");

        this.earning_summary = document.getElementById("earning_summary");
        this.spending_summary = document.getElementById("spending_summary");


        this.earningListView = document.getElementById("earnings_list")
        this.spendingListView = document.getElementById("spendings_list")

        this.earningList = [];
        this.earningId = 0;
        this.spendingList = [];
        this.spendingId = 0;


    }

    submitSpendingEarningForm() {
        const userInputValue = this.userInput.value;
        const transactionType = this.transactionType.value;


        if (userInputValue == '' || userInputValue < 0 || isNaN(userInputValue)) {
            alert('please input a valid number')
        } else {
            switch (transactionType) {

                case "earnings":

                    let inputEarning = parseInt(userInputValue);
                    this.userInput.value = ""

                    let earning = {
                        id: this.earningId,
                        inputEarning: inputEarning
                    }
                    this.earningId++
                    this.earningList.push(earning)
                    this.addEarning(earning)
                    this.displayBalanceAmount();
                    break;

                case "spendings":

                    let inputSpending = parseInt(userInputValue)
                    this.userInput.value = ""

                    let spending = {
                        id:this.spendingId,
                        inputSpending:inputSpending
                    }
                    this.spendingId++
                    this.spendingList.push(spending)
                    this.addSpending(spending)
                    this.displayBalanceAmount();

                    break;
                default:
                    null;
            }

        }
    }

    displayBalanceAmount() {
        let balance = this.totalEarnings() - this.totalSpendings();
        this.balanceAmount.textContent = balance;
        // this.balanceAmount.textContent = balance;
        // if(balance<0){
        //     this.current_Balance.classList.remove('showGreen', 'showBlack')
        //     this.current_Balance.classList.add('showRed');
        // }
    }

    addSpending(spending) {
        const div = document.createElement('div')
        div.classList.add('spending')
        div.innerHTML =`
         <div><h1>${spending.inputSpending}</h1></div>
        `;
        
        this.spendingListView.appendChild(div);
    }
    addEarning(earning) {
        const div = document.createElement('div')
        div.classList.add('earning')
        div.innerHTML =`
         <div><h1>${earning.inputEarning}</h1></div>
        `;
        this.earningListView.appendChild(div);
    }

// total(arg1,arg2,arg3){
//     let total = 0;
//         if (arg1.length > 0) {
//             total = arg1.reduce(function (totalValue, curentValue) {
//                 totalValue += arg3;
//                 return totalValue;
//             }, 0);

//         }
//         arg2.textContent = total
//         return total;
// }


    totalSpendings() {
        let totalSpending = 0;
        if (this.spendingList.length > 0) {
            totalSpending = this.spendingList.reduce(function (totalValue, curentValue) {
                totalValue += curentValue.inputSpending;
                return totalValue;
            }, 0);

        }
        this.spending_summary.textContent = totalSpending
        return totalSpending;
    }

    totalEarnings() {
        let totalEarning = 0;
        if (this.earningList.length > 0) {
            totalEarning = this.earningList.reduce(function (totalValue, curentValue) {
                totalValue += curentValue.inputEarning;
                return totalValue;
            }, 0);

        }
        this.earning_summary.textContent = totalEarning
        return totalEarning;
    }
}





function displayShowValue() {
    console.log("Something");
}

function listenToEvents() {
    const spendingEarningForm = document.getElementById("spending_earning_form");
    const spendingList = document.querySelector(".spending_list");
    const earningList = document.querySelector(".earning_list");
    const userInput = document.getElementById("earningsOrSpendings")

    const budget101 = new Budget101();

    spendingEarningForm.addEventListener("submit", function (event) {
        event.preventDefault();
        budget101.submitSpendingEarningForm();
    });


}

function secondSelector(){
    var x = document.getElementById("spending_type");
    x.options[x.options.length] = new Option('Food', 'food');
    x.options[x.options.length] = new Option('Clothes', 'clothes');
    x.options[x.options.length] = new Option('Payments', 'payments');
    x.options[x.options.length] = new Option('Movie', 'movie');
    x.options[x.options.length] = new Option('Education', 'education');
    x.options[x.options.length] = new Option('Travel', 'travel');
    x.options[x.options.length] = new Option('Other', 'other');
}




document.addEventListener('DOMContentLoaded', function () {
    listenToEvents();
})
