class VendingMachine {
  constructor() {
    this.items = {
      Biskuit: { price: 6000, stock: 5 },
      Chips: { price: 8000, stock: 10 },
      Oreo: { price: 10000, stock: 7 },
      Tango: { price: 12000, stock: 3 },
      Cokelat: { price: 15000, stock: 4 },
    };
    this.acceptedCoins = [2000, 5000, 10000, 20000, 50000];
    this.balance = 0;
  }

  displayItems() {
    console.log("Available items:");
    for (const item in this.items) {
      console.log(`${item}: ${this.items[item].price}`);
    }
  }

  insertCoin(coin) {
    if (this.acceptedCoins.includes(coin)) {
      this.balance += coin;
      console.log(`Inserted ${coin} coins. Current balance: ${this.balance}`);
    } else {
      console.log("Coin not accepted. Please insert a valid coin.");
    }
  }

  purchaseItem(itemName) {
    const item = this.items[itemName];
    if (item) {
      if (item.stock > 0 && this.balance >= item.price) {
        this.balance -= item.price;
        item.stock--;
        console.log(
          `Purchased ${itemName}. Remaining balance: ${this.balance}`
        );
      } else if (item.stock === 0) {
        console.log(`${itemName} is out of stock.`);
      } else {
        console.log("Insufficient balance.");
      }
    } else {
      console.log("Invalid item name.");
    }
  }

  returnChange() {
    const change = this.balance;
    this.balance = 0;
    return change;
  }

  checkStock() {
    for (const item in this.items) {
      if (this.items[item].stock === 0) {
        console.log(`${item} is out of stock.`);
      }
    }
  }
}

// Main program
const vendingMachine = new VendingMachine();

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mainMenu() {
  console.log("\nOptions:");
  console.log("1. Display items");
  console.log("2. Insert coin");
  console.log("3. Purchase item");
  console.log("4. Return change");
  console.log("5. Check stock");
  console.log("6. Exit");

  rl.question("Enter your choice: ", (choice) => {
    choice = parseInt(choice);

    switch (choice) {
      case 1:
        vendingMachine.displayItems();
        mainMenu();
        break;
      case 2:
        rl.question("Insert coin: ", (coin) => {
          coin = parseInt(coin);
          vendingMachine.insertCoin(coin);
          mainMenu();
        });
        break;
      case 3:
        rl.question("Enter item name: ", (itemName) => {
          vendingMachine.purchaseItem(itemName);
          mainMenu();
        });
        break;
      case 4:
        const change = vendingMachine.returnChange();
        console.log(`Returned change: ${change}`);
        mainMenu();
        break;
      case 5:
        vendingMachine.checkStock();
        mainMenu();
        break;
      case 6:
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please select a valid option.");
        mainMenu();
        break;
    }
  });
}

mainMenu();
