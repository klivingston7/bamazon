var mysql = require("mysql");
var inquirer = require("inquirer");

var divider =
    "\n---------------------------------------------";

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "121025",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + divider);
    showItems();
});

function showItems() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("item_id" + "  |  " + "Product" + "  -  " + "Department" + "  -  " + "Price" + "  -  " + "Qty" + "\n");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " - " + 
            res[i].department_name + " - " + res[i].price + "Total Avg - " + res[i].quantity + "\n");
        }
        selectID();
    });

}

function selectID(){
    inquirer
    .prompt({
      name: "itemID",
      type: "input",
      message: "What is the ID of the product you'd like to buy?"
    })
    .then(function(answer) {
      var query = "SELECT * FROM products";
      connection.query(query, [answer.itemID], function (err, res) {
        
        console.log("You've selected " + res.itemID);
        // selectQty();
      });
    });
}

// function selectQty(){
//     inquirer
//     .prompt({
//       name: "itemID",
//       type: "input",
//       message: "What is the ID of the product you'd like to buy?"
//     })
//     .then(function(answer) {
//       var query = "SELECT * FROM products";
//       connection.query(query, [], function (err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//         }
//         showItems();
//       });
//     });
// }