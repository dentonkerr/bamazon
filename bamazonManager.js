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
        .then(function (answer) {
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
            console.log("-----------------------------------");
        }
        runSearch();
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("\n" + res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n");
            console.log("-----------------------------------");
        }
        runSearch();
    })
}

function addInventory() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What item would you like to add inventory to?",
                name: "add",
                validate: function (value) {
                    if (isNaN(value) === false && value < 11) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                message: "How many would you like to add?",
                name: "quantity",
                validate: function (value) {
                    if (isNaN(value) === false && value < 11) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            var chosenItem;
            connection.query("SELECT * FROM products WHERE ?", { id: answer.add },
                function (err, res) {
                    for (var i = 0; i < res.length; i++) {
                        console.log("\n" + res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n")
                        chosenItem = res[i];
                    }
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: parseInt(chosenItem.stock_quantity) + parseInt( answer.quantity)
                            },
                            {
                                id: chosenItem.id
                            }
                        ])
                    console.log("\n" + "Quantity of " + answer.quantity + " added to ID: " + chosenItem.id + " Name: " + chosenItem.product_name + "\n");
                    runSearch();
                }
            )
        })
}

