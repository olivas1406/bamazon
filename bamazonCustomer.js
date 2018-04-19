/*

The first should ask them the ID of the product they would like to buy.  The second message should ask how many units of the product they would like to buy.

Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.  Once the update goes through, show the customer the total cost of their purchase.
*/


var mysql = require("mysql");

var inquirer = require("inquirer");

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
  
     //  console.log(res);                                                              REMOVE ME REMOVE ME REMOVE ME REMOVE ME 

    console.log(`   
Item # | Product Name       |  Price   
                `);

       for (var r in res) {

        console.log(res[r].item_id + "       " + res[r].product_name + " " + res[r].price);    
}  
    askMe();

    connection.end();
    });
}

function askMe() {
    inquirer.prompt([{
        message: "which item # would you like to purchase?",
        type: "input",
        name: "what"
    },{
        message: "How many would you like to purchase?",
        type: "input",
        name: "howMany"
    
    }]).then(function(answer){       

        console.log(answer.what);
        console.log(answer.howMany);
        
   //  NEXT FUNCTION HERE  - CHECK IF QUANTITY IS AVAILABLE
    
    });

}







