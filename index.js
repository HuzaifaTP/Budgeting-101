

class Budget101 {

    constructor() {
        this.userInput = document.getElementById("earningsOrSpendings");
        this.transactionType = document.getElementById("transaction_type")
        this.spendingType = document.getElementById("spending_type")
        this.spendingEarningForm = document.getElementById("spending_earning_form");
        this.balanceAmount = document.getElementById("current_Balance");
        this.earning_summary = document.getElementById("earning_summary");
        this.spending_summary = document.getElementById("spending_summary");
        this.earningListView = document.getElementById("earnings_list")
        this.spendingListView = document.getElementById("spendings_list")
        this.x = document.getElementById("x")
        this.earningList = [];
        this.earningId = 0;
        this.spendingList = [];
        this.spendingId = 0;
        this.timestamp = Date.now();
    }

    submitSpendingEarningForm() {
        const userInputValue = this.userInput.value;
        const transactionType = this.transactionType.value;
        const spendingType = this.spendingType.value;
        const time = this.timestamp;


        if (userInputValue == '' || userInputValue < 0 || isNaN(userInputValue)) {
            alert('please input a valid number')
        } else {
            switch (transactionType) {

                case "earnings":

                    let inputEarning = parseInt(userInputValue);
                    this.userInput.value = ""

                    let earning = {
                        id: this.earningId,
                        inputEarning: inputEarning,
                        time: time
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
                        id: this.spendingId,
                        inputSpending: inputSpending,
                        spendingType: spendingType,
                        time: time


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
    }
    
    #getDateByTimeStamp(timestamp) {
        let date = new Date(timestamp);
        return date.toDateString();
    }
    addSpending(spending) {
        const div = document.createElement('div')
        div.classList.add('spending')
        div.innerHTML = `
        <div class="transaction_card_spendings">
        <div>$${spending.inputSpending}</div>
        <div>${spending.spendingType}</div>
        <div>${this.#getDateByTimeStamp(spending.time)}</div>
        <a href="#" class="delete" data-id="${spending.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        `;

        this.spendingListView.appendChild(div);
    }
    addEarning(earning) {
        const div = document.createElement('div')
        div.classList.add('earning')
        div.innerHTML = `
        <div class="transaction_card_earnings">
         <div>$${earning.inputEarning}</div>
         <div>${this.#getDateByTimeStamp(earning.time)}</div>
         <a href="#" data-id="${earning.id}">
         <i class="fas fa-trash" ></i>
         </a>
         </div>
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

    //Call back function to merge total??
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
    deleteElementFromSpendingList(element) {
        let idSpendingElement = parseInt(element.dataset.id)
        let parentHoldingId = element.parentElement.parentElement;
        this.spendingListView.removeChild(parentHoldingId)
        let spendingElementInList = this.spendingList.filter(function (spendingItem) {
            return spendingItem.id == idSpendingElement;
        })
        this.spendingList.pop(spendingElementInList)
        this.displayBalanceAmount();
    }


    deleteElementFromEarningList(element) {
        let idEarningElement = parseInt(element.dataset.id)
        let parentHoldingId = element.parentElement.parentElement;
        this.earningListView.removeChild(parentHoldingId)
        let earningElementInList = this.earningList.filter(function (earningItem) {
            return earningItem.id == idEarningElement;
        })
        this.earningList.pop(earningElementInList)
        this.displayBalanceAmount();

    }
}






function displayShowValue() {
    console.log("Something");
}

function listenToEvents() {
    const spendingEarningForm = document.getElementById("spending_earning_form");
    const spendingList = document.getElementById("spendings_list");
    const earningList = document.getElementById("earnings_list");
    const userInput = document.getElementById("earningsOrSpendings")

    const budget101 = new Budget101();

    spendingEarningForm.addEventListener("submit", function (event) {
        event.preventDefault();
        budget101.submitSpendingEarningForm();
    });

    spendingList.addEventListener("click", function (event) {
        event.preventDefault();
        budget101.deleteElementFromSpendingList(event.target.parentElement)

    });
    earningList.addEventListener("click", function (event) {
        event.preventDefault();
        budget101.deleteElementFromEarningList(event.target.parentElement)

    });


}

function hideSelector(transactionType) {
    if (transactionType.value == "earnings") {
        document.getElementById('spending_type').style.display = "none";
    } else {
        document.getElementById('spending_type').style.display = 'block';
    }
}


document.addEventListener('DOMContentLoaded', function () {
    listenToEvents();
})
