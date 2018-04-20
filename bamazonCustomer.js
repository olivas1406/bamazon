

var mysql = require("mysql");

var inquirer = require("inquirer");

var howMany = 0;

var what = 0;

var stock = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "tiMh9AwUOkKzsfX1wVBs",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;

    inventory();
});

function inventory() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res)  {  
        
        console.log(`   
Item # | Product Name       |  Price   
                `);

       for (var r in res) {

        console.log(res[r].item_id + "       " + res[r].product_name + " " + res[r].price);    
}  
    askMe1();
    
   });
}

function askMe1() {
    inquirer.prompt([{
        message: "which item # would you like to purchase?",
        type: "input",
        name: "what"
    
    }]).then(function(answer){       
        if (answer.what.length === 0 || answer.what < 1 || answer.what > 10) {
            console.log("Please choose a valid item")
            askMe1();
        } else {
            what = answer.what;
            askMe2();
        }
    });
}

function askMe2() {
    inquirer.prompt([{

        message: "How many would you like to purchase?",
        type: "input",
        name: "howMany"
    
    }]).then(function(answer){       
         if (answer.howMany === "0" || answer.howMany.length === 0) {
            console.log("Please enter a valid quantity")
            askMe2();
        } else {

            howMany = answer.howMany;
            var query = "SELECT stock_quantity FROM products WHERE item_id=" + what
            
            connection.query(query, function(err,res) {
               if (err) throw err
               stock = res[0].stock_quantity;
               
               if (howMany > stock) {
                   console.log("Insufficient Quantity! - We cannot fill your order")
                   askMe2();
               } else {
                   updateInventory();
               }
           })
        }
    });
}

function updateInventory() {
   
    stock = (stock - howMany);
    var query = "UPDATE products SET stock_quantity = " + stock + " WHERE item_id = " + what;
    var query2 = "SELECT price FROM products WHERE item_id = " + what;

    connection.query(query, function(err,) {   
        if (err) throw err

        connection.query(query2, function(err, ans) {   
            if (err) throw err
        var transTotal = (ans[0].price) * howMany;
        console.log("Your Total is: $" + transTotal);

    connection.end();
        })
  });
}


