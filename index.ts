#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from 'figlet';

(function displayBanner() {
  console.clear();
  console.log(chalk.bold.blueBright(figlet.textSync('My OOP Bank')));
})();

// Banking Account Interface //

interface BankingAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  chackBalance(): void;
}

// Bank Account Class //

class bankAccount implements BankingAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  //   Debit Money //
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        chalk.yellow(`Withdrawal of `),chalk.greenBright.bold(`$${amount}`),chalk.yellow(` successful, Your Remaining balance is : `),chalk.greenBright.bold(`$${this.balance}`)
      );
    } else {
      console.log(chalk.redBright.bold(`Insufficiant balance.`));
    }
  }
  //   Credit Money //
  deposit(amount: number): void {
    if (amount >= 100) {
      amount -= 1;
    }
    this.balance += amount;
    console.log(
      chalk.yellow(`Deposit of `),chalk.greenBright.bold(`$${amount}` ),chalk.yellow(`successful, Your Remaining Balance Is : `),chalk.greenBright.bold(`$${this.balance}`)
    );
  }

  chackBalance(): void {
    console.log(chalk.yellow(`Your Current Balance Is : `),chalk.greenBright.bold(`$${this.balance}`));
  }
}

// Create Customer Class //
class customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: bankAccount;
  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: bankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

// Create Bank Accounts //

const Accounts: bankAccount[] = [
  new bankAccount(1234, 1000),
  new bankAccount(12345, 3000),
  new bankAccount(123456, 4000),
];

// Create Cutomers //

const customers: customer[] = [
  new customer("jahan", "shah", "male", 20, 3478301502, Accounts[0]),
  new customer("Ahsan", "shah", "male", 25, 3148301502, Accounts[1]),
  new customer("Asad", "shah", "male", 30, 3328301502, Accounts[2]),
];

// Function to interact with bank accoount //

async function service() {
  do {
    const accountNumberInput = await inquirer.prompt([
      {
        type: "number",
        name: "accountNumber",
        message: (chalk.greenBright.bold("Enter Your Account Number")),
      },
    ]);
    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberInput.accountNumber
    );
    if (customer) {
      (function displayBanner() {
        console.clear();
        console.log(chalk.bold.blueBright(figlet.textSync(`W e l c o m e : ${customer.firstName} ${customer.lastName}`)));
      })();
      const ans = await inquirer.prompt({
        name: "select",
        type: "list",
        message: (chalk.blueBright.italic.underline("Select an Operation")),
        choices: [chalk.yellowBright.bold("Deposit"), chalk.yellowBright.bold("Withdraw"), chalk.yellowBright.bold("Check Balance"), chalk.red.bold("Exit")],
      });
      switch (ans.select) {
        case chalk.yellowBright.bold("Deposit"):
          const depositAmount = await inquirer.prompt([
            {
              name: "amount",
              type: "number",
              message: (chalk.greenBright.bold("Enter The Amount To Deposit")),
            },
          ]);
          customer.account.deposit(depositAmount.amount);
          break;
        case chalk.yellowBright.bold("Withdraw"):
          const withdrawAmount = await inquirer.prompt([
            {
              name: "amount",
              type: "number",
              message: (chalk.greenBright.bold("Enter The Amount To Withdraw")),
            },
          ]);
          customer.account.withdraw(withdrawAmount.amount);
          break;
        case chalk.yellowBright.bold("Check Balance"):
          customer.account.chackBalance();
          break;
        case chalk.red.bold("Exit"):
          console.log(chalk.redBright.bold("Exiting Bank Program........"));
          console.log(chalk.greenBright.bold.underline(`\n Thank Your For Using Our Bank Services!`));

          process.exit();
          break;
      }
    }else{
        console.log(chalk.redBright.bold("Invalid Account Number, please Try Again"));
    }
  } while (true);
}

service()