const inquire = require('inquirer');
const cTable = require('console.table');
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});

connection.query(
    "SELECT * FROM products",
    function(err, res) {
      if (err) throw err;
      console.table(res);
      beginPurchase();
});

function beginPurchase() {
    inquire.prompt(
        [
            {
                type: "list",
                name: "intro",
                message: "Choose an option",
                choices: ["Purchase an item", "Exit"]
            }
        ]
    ).then(function(user) {
        if(user.intro == "Purchase item") {
            inquire.prompt(
                [
                    {
                      type: "input",
                      name: "itemID",
                      message: "Enter the item ID: "
                    },
                    {
                      type: "input",
                      name: "quantity",
                      message: "Enter the quantity you would like to purchase: "
                    }
                ]
            ).then(function(user) {
                checkQuantity(user.itemID, user.quantity);
            })
        }
    })
}



function checkQuantity(id, quantity) {
    connection.query(`SELECT stock_quantity FROM products WHERE item_id=${id}`, function(err, res) {
        if (err) throw err;
        if ((res[0].stock_quantity > 0) && (quantity > res[0].stock_quantity)) {
            connection.query(`UPDATE products SET stock_quantity=${res[0].stock_quantity}-${quantity} WHERE item_id=${id}`,
                function(err) {
                    if (err) throw err;
                    console.log("\nPurchase successful!\n");
                    total(id, quantity);
                })
        }
        else if (res[0].stock_quantity == 0 && quantity < res[0].stock_quantity) {
            console.log("\nInsufficient quantity available!");
        }
    });
}
function total(id, quantity) {
    connection.query(`SELECT price FROM products WHERE item_id=${id}`, function(err, res) {
        if (err) throw err;
        console.log(`Total cost: ${res[0].price * quantity}\n`);
});
}






