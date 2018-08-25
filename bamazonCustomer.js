var mysql = require("mysql");
var inquirer = require("inquirer");

var divider =
    "\n-----------------------------------------------------";
var currentInventory = [];

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
    homePage();
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
                showItems();
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

        currentInventory = [];
        for (var i = 0; i < res.length; i++) {
            currentInventory.push(res[i].item_id);
        }
        shopID();
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
        ]).then(function (answers) {
            itemID = answers.id;
            itemQTY = answers.qty;
            console.log("You've selected " + itemID);
            if (currentInventory.indexOf(parseInt(itemID)) === -1) {
                console.log("Sorry, that item is SOLD OUT");
                homePage();
            } else {
                var query = "SELECT * FROM products WHERE ?";
                connection.query(query, { item_id: answers.itemID }, function (err, res) {
                    if (err) throw err;
                    var itemName = res.product_name;
                    // var currentStock = res[0].quantity;
                    // var updatedStock = parseInt(res[0].quantity) - itemQTY;
                    // var totalCost = itemQTY * parseFloat(res[0].price);
                    console.log(itemName);
                    // console.log(itemName + "  |  " + currentStock + "  |  " + updatedStock + "  |  " + totalCost);

                    // if (currentStock >= itemQTY) {

                    //     connection.query("UPDATE inventory SET ? WHERE ?", [{ item_id: itemID }, { quantity: newStock }], function (err, res) {

                    //         console.log("For" + itemQTY + " units of " + itemName)
                    //         console.log("You have been charged: $" + totalCost);
                    //         console.log("Thank you for your purchase!");
                    //     });
                    //     connection.end();
                    // } else {
                    //     console.log("There is not enough inventory for that purchase");
                    //     homePage();
                    // }
                });
            }
        })
}
