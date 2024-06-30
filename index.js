#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue("\n\tWelcome To Ahzam - OOP MY BANK"));
//Bank Account Class
class Bankaccount2 {
    accountnumber;
    balance;
    constructor(accountnumber, balance) {
        this.accountnumber = accountnumber;
        this.balance = balance;
    }
    //Withdraw Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.green(`\nWithdraw of ${amount}$ Successful`));
            console.log(`Remaining Balance: ${this.balance}`);
        }
        else {
            console.log(chalk.red("\nInsufficient Balance"));
        }
        ;
    }
    ;
    //Deposit Money
    deposit(amount) {
        if (amount >= 1) {
            amount -= 1; // 1$ fee charged if deposit 100$
        }
        ;
        this.balance += amount;
        console.log(chalk.green(`\nDeposit of ${amount}$`));
        console.log(chalk.red("1$ for deposit Charges"));
        console.log(`Remaining Balance: ${this.balance}$`);
    }
    //Check Balance
    checkbalance() {
        console.log(`\nCurrent Balance ${this.balance}$`);
    }
}
;
//Create Customers Class
class Customer {
    firstname;
    lastname;
    gender;
    age;
    mobilenumber;
    account;
    constructor(firstname, lastname, gender, age, mobilenumber, account) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.age = age;
        this.mobilenumber = mobilenumber;
        this.account = account;
    }
    ;
}
//Create Bank acount
const account = [
    new Bankaccount2(1001, 500),
    new Bankaccount2(1002, 1000),
    new Bankaccount2(1003, 2000),
];
//Create customers
const customers = [
    new Customer("Ahzam", "Ansari", "Male", 22, 300111111, account[0]),
    new Customer("Ashad", "wajid", "Male", 21, 300222222, account[1]),
    new Customer("Maaz", "Ansari", "Male", 20, 3003333333, account[2])
];
// Funtion to interact with bank account
async function service() {
    do {
        const accountnumberinput = await inquirer.prompt([
            {
                name: "accountnumber",
                type: "number",
                message: "Enter your Account Number"
            }
        ]);
        const customer = customers.find(customer => customer.account.accountnumber === accountnumberinput.accountnumber);
        if (customer) {
            console.log(`\nWelcome, ${customer.firstname} ${customer.lastname}`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositamount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "input",
                            message: "Enter the amount to deposit:",
                        }
                    ]);
                    customer.account.deposit(depositamount.amount);
                    break;
                case "Withdraw":
                    const Withdrawamount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "input",
                            message: "Enter the amount to Withdraw:",
                        }
                    ]);
                    customer.account.withdraw(Withdrawamount.amount);
                    break;
                case "Check balance":
                    customer.account.checkbalance();
                    break;
                case "Exit":
                    console.log(chalk.red("Exiting From the Program"));
                    process.exit();
            }
            ;
        }
        else {
            console.log(chalk.red("invalid Account Number, Please Try Again"));
        }
    } while (true);
}
service();
