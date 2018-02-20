var mysql = require("mysql");
var inquirer = require("inquirer");

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
    queryDB();
});

function queryDB() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("\n" + res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n");
        }
        console.log("-----------------------------------");
        buy();
    });
};

function buy() {

    inquirer
        .prompt([

            {
                type: "input",
                message: "What is the ID of the product you would like to buy?",
                name: "id",
                validate: function (value) {
                    if (isNaN(value) === false && value < 11) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                message: "How many would you like to order?",
                name: "quantity",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            var chosenItem;
            connection.query("SELECT * FROM products WHERE ?", { id: answer.id },
                function (err, res) {
                    for (var i = 0; i < res.length; i++) {
                        console.log("\n" + res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n")
                        chosenItem = res[i];
                    }
                    if (answer.quantity < chosenItem.stock_quantity) {
                        connection.query("UPDATE products SET ? WHERE ?"),
                            [
                                {
                                    stock_quantity: chosenItem.stock_quantity - answer.quantity
                                },
                                {
                                    id: chosenItem.id
                                }
                            ];
                        console.log("\n Order completed. Please pay: " + (answer.quantity*chosenItem.price)+ "\n")
                    }
                    else {
                        console.log("\n Insufficient quantity. Try again! \n")
                        queryDB();
                    }
                })
        })
};