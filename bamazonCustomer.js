var mysql = require("mysql");
var inquirer = require("inquirer");

var divider =
    "\n-----------------------------------------------------";

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "121025",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\n" + "Welcome to Bamazon!" + "\n"
        + "You're connected as id " + connection.threadId + divider);
    showItems();
});

function homePage() {
    inquirer
        .prompt([{
            name: 'shop',
            type: 'confirm',
            message: 'Would you like to make a purchase?'
        }
        ]).then(function (answer) {
            if (answer.shop) {
                shopID();
            } else {
                console.log('Have a nice day!');
            }
        }).catch(function (error) {
            throw error;
        });
}

function showItems() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(divider + "\n" + "item_id" + "  |  " + "Product" + "  -  " + "Department" + "  -  " +
            "Price" + "  -  " + "Qty" + divider);

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " - " +
                res[i].department_name + " - " + res[i].price + " - " + res[i].quantity + "\n");
        }

        homePage();
    });
}

function shopID() {
    inquirer
        .prompt([{
            name: 'id',
            type: 'prompt',
            message: 'What is the ID of the product you would like to buy?'
        },
        {
            name: 'qty',
            type: 'prompt',
            message: 'How many units would you like?'
        }
        ]).then(function (data) {
            itemID = data.id;
            itemQTY = parseInt(data.qty);
            var itemName = 0;
            var currentStock = 0;
            var itemPrice = 0;
            console.log("You've selected " + itemID);

            var query = 'SELECT item_id, product_name, price, quantity FROM products WHERE ?';
            connection.query(query, { item_id: itemID }, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id == itemID) {
                        itemName = res[i].product_name;
                        currentStock = res[i].quantity;
                        itemPrice = res[i].price;
                    }
                }
                var updatedStock = currentStock - itemQTY;
                var totalCost = itemQTY * parseFloat(itemPrice);
                // console.log(itemName + "  |  " + currentStock + "  |  " + updatedStock + "  |  " + totalCost);

                if (currentStock >= itemQTY) {

                    connection.query('UPDATE products SET ? WHERE ?', [{ item_id: itemID }, { quantity: updatedStock }], function (err, res) {

                        console.log("For " + itemQTY + " units of " + itemName);
                        console.log("You have been charged: $" + totalCost);
                        console.log("Thank you for your purchase!");
                        // homePage();
                    })
                } else {
                    console.log("There is not enough inventory for that purchase");
                    homePage();
                }
            })
        })
}
