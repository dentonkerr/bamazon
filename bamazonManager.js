var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\n connected as id " + connection.threadId + "\n");
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View products for sale",
                "View low inventory",
                "Add to inventory",
                "Add new product"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "View products for sale":
                viewProducts();
                break;

                case "View low inventory":
                lowInventory();
                break;

                case "Add to inventory":
                addInventory();
                break;

                case "Add new product":
                newProduct();
                break;
            }
        })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("\n" + res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n");
        }
        console.log("-----------------------------------");
    })
}

