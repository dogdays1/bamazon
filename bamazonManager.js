var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.clear();
    showToMan();
});


function showToMan() {
    inquirer.prompt([
        {
            type: "list",
            name: "manager",
            message: "What would you like to do next?",
            choices: ["View All Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"]
        },
    ]).then(function (user) {
        console.log(" ");
        switch (user.manager) {
            case "View All Products For Sale":
                console.clear();
                return vPFS();
            case "View Low Inventory":
                return vLI();
            case "Add To Inventory":
                return aTI();
            default:
                return aNP();
        }
    });
}
function vPFS() {
    // console.clear();
    console.log(" ");
    console.log("ID |  PRODUCT              | DEPARTMENT           |  PRICE      | QUANTITY");
    console.log("--------------------------------------------------------------------------");
    var query = connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {

            //use this loop to make console table look better       
            for (var q = 0; q = 20 - res[i].product_name.length; q++) {
                res[i].product_name += " "
            };
            for (var q = 0; q = 20 - res[i].department_name.length; q++) {
                res[i].department_name += " "
            };
            var stringPrice = res[i].price.toString();
            for (var q = 0; q = 9 - stringPrice.length; q++) {
                stringPrice += " "
            };
            console.log(res[i].item_id + " |  " + res[i].product_name + " | " + res[i].department_name + " |  $" + stringPrice + " | " + res[i].stock_quantity);
        }
        console.log(" ");
        showToMan();
    });
}
function vLI() {
    console.clear();
    console.log(" ");
    console.log("ID |  PRODUCT              | DEPARTMENT           |  PRICE      | QUANTITY");
    console.log("--------------------------------------------------------------------------");
    var query = connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        for (var i = 0; i < res.length; i++) {

            //use this loop to make console table look better       
            for (var q = 0; q = 20 - res[i].product_name.length; q++) {
                res[i].product_name += " "
            };
            for (var q = 0; q = 20 - res[i].department_name.length; q++) {
                res[i].department_name += " "
            };
            var stringPrice = res[i].price.toString();
            for (var q = 0; q = 9 - stringPrice.length; q++) {
                stringPrice += " "
            };
            console.log(res[i].item_id + " |  " + res[i].product_name + " | " + res[i].department_name + " |  $" + stringPrice + " | " + res[i].stock_quantity);
        }
        console.log(" ");
        console.log("This is the inventory with less than 5 items");
        showToMan();
    });
}
function aTI() {
    console.clear();
    console.log(" ");
    console.log("ID |  PRODUCT              | DEPARTMENT           |  PRICE      | QUANTITY");
    console.log("--------------------------------------------------------------------------");
    var query = connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {

            //use this loop to make console table look better       
            for (var q = 0; q = 20 - res[i].product_name.length; q++) {
                res[i].product_name += " "
            };
            for (var q = 0; q = 20 - res[i].department_name.length; q++) {
                res[i].department_name += " "
            };
            var stringPrice = res[i].price.toString();
            for (var q = 0; q = 9 - stringPrice.length; q++) {
                stringPrice += " "
            };
            console.log(res[i].item_id + " |  " + res[i].product_name + " | " + res[i].department_name + " |  $" + stringPrice + " | " + res[i].stock_quantity);
        }
        console.log(" ");
        // purchase();
        inquirer.prompt([
            {
                name: "item",
                type: "input",
                message: "What is the two digit ID of the product you would like to add inventory to? \n"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to add? \n",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
            .then(function (answer) {
                console.log("answer after inv add");
                var pick = 0;
                var howManyOnhand = 0;
                for (var i = 0; i < res.length; i++) {
                    // console.log(results[i].item_id);
                    // console.log(answer.item);
                    if (res[i].item_id == answer.item) {
                        pick = parseInt(res[i].item_id);
                        howManyOnhand = parseInt(res[i].stock_quantity);
                        thing = (res[i].product_name);
                        dept = (res[i].department_name);
                        cost = (res[i].price);
                        //   console.log("pick  " + pick + "qty" + howManyOnhand);
                    }
                    connection.query(
                        "UPDATE products SET ?  WHERE ?", [
                            {
                                stock_quantity: howManyOnhand + parseInt(answer.quantity)
                            },
                            {
                                item_id: answer.item
                            }
                        ],

                    );

                };
                console.clear();
                console.log("============================================");
                console.log("Inventory has been updated with new quantity");
                console.log("============================================");
                vPFS();

            });
    })


}

function aNP() {
    console.log("got toaNP");
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the name of the product you would like to add to inventory? \n"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to add? \n",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "dept",
            type: "input",
            message: "What department will the new item be in? \n"
        },
        {
            name: "price",
            type: "input",
            message: "What is the price of the new item( $##.## ) ? \n",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "item_id",
            type: "input",
            message: "What is the two digit item id of the new item? \n",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        console.log("got to answers");
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                item_id: parseInt(answer.item_id),
                product_name: answer.name,
                department_name: answer.dept,
                price: answer.price,
                stock_quantity: answer.quantity
            },
        );
        console.clear();
        vPFS();
    })

}