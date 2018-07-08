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
  showToCust();
});

// function showData() {
//   connection.query("SELECT * FROM products", function (err, res) {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });  SCRAPPED THIS FUNCTION, HOMEWORK ASKS FOR ID, PRODUCT AND PRICE ONLY, NOT ALL DATA
//}
function showToCust() {
  console.log(" ");
  console.log("ID |  PRODUCT              |  PRICE");
  console.log("------------------------------------");
  var query = connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {

      //use this loop to make console table look better       
      for (var q = 0; q = 20 - res[i].product_name.length; q++) {
        res[i].product_name += " "
      };

      console.log(res[i].item_id + " |  " + res[i].product_name + " |  $" + res[i].price);
    }
    console.log(" ");
    purchase();
  });
}
function purchase() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the two digit ID of the product you would like to purchase? \n"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like? \n",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function (answer) {
        // console.log(answer.item + answer.quantity);
        var pick = 0;
        var howManyOnhand = 0;
        for (var i = 0; i < results.length; i++) {
          // console.log(results[i].item_id);
          // console.log(answer.item);
          if (results[i].item_id == answer.item) {
            pick = parseInt(results[i].item_id);
            howManyOnhand = parseInt(results[i].stock_quantity);
            thing = (results[i].product_name);
            dept = (results[i].department_name);
            cost = answer.quantity * (results[i].price);
            //   console.log("pick  " + pick + "qty" + howManyOnhand);
          }//else statement if not valid id
        }

        // do we have enough
        if (parseInt(answer.quantity) <= howManyOnhand) {
          //   console.log("got this far");
          //  console.log(howManyOnhand - parseInt(answer.quantity));
          // if so, update db, and sell item
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: (howManyOnhand - answer.quantity)
              },
              {
                item_id: pick
              }
            ],
            function (error) {
              if (error) throw err;
             // console.clear();
              console.log(" ");
              console.log("Our " + dept + " department will prepare your " + thing + " for shipment today");
              console.log("Your account has been charged $" + cost.toFixed(2));
              console.log(" ");
              contShopping();
            }
          );
        }
        else {
          // insufficient quantity
          console.clear();
          console.log("=====================================================================================");
          console.log("Sorry, we only have " + howManyOnhand + " of those. Please choose a different amount.");
          console.log("=====================================================================================");
          showToCust();
        }
      });
  });
}
function contShopping() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "exit",
      message: "Would you like to continue shopping? Y/N?"
    }
  ]).then(function (user) {

    // If the user guesses the password...
    if (user.exit === true) {
      console.clear();
      showToCust();
    } else {

      console.log("==============================================");
      console.log("Thank you for shopping with us today!");
      console.log("==============================================");
      connection.end();
    }
  });

}
    // test query
    //console.log(query.sql);