
/*



If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

*/

var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",                  
    port: "3306",                       
    user: "root",       
    password: "tiMh9AwUOkKzsfX1wVBs",  
    database: "bamazon" 
})

inquirer.prompt([{
    type: 'rawlist',
    name: 'manager',
    message: 'What would you like to do?',
    choices: ['View Products for Sale', 'View Low Inventory','Add to Inventory', 'Add New Product']
}]).then(function (response) {

    switch (response.manager) {
        case "View Products for Sale": 
        viewDB();
        break;

        case "View Low Inventory": 
        showLow();
        break;

        case "Add to Inventory": 
        addInv();
        break;

        case "Add New Product": 
        addProd();

    }   
})

function viewDB() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res)  {  
        
        console.log(`   
Item # | Product Name       |  Price     | In Stock
                `);

       for (var r in res) {

        console.log(res[r].item_id + "       " + res[r].product_name + " " + res[r].price + "          " + res[r].stock_quantity);    
       }
})
    connection.end();
};

function showLow() {
    connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5", function(err, res)  {  
        
        console.log(`   
Item # | Product Name       |  Price     | In Stock
                `);

       for (var r in res) {

        console.log(res[r].item_id + "       " + res[r].product_name + " " + res[r].price + "          " + res[r].stock_quantity);    
       }
})
    connection.end();
};

function addInv() {
   
// inquirer needs to prompt what item_id they would like to update
// and how many they would like to add



var query = "UPDATE products SET stock_quantity = " + stock + " WHERE item_id = " + what;           // STOCK and WHAT do not exist

connection.query(query, function(err,) {   
    if (err) throw err


    connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5", function(err, res)  {  
        
        console.log(`   
Item # | Product Name       |  Price     | In Stock
                `);

       for (var r in res) {

        console.log(res[r].item_id + "       " + res[r].product_name + " " + res[r].price + "          " + res[r].stock_quantity);    
       }
})
    connection.end();
};




function addProd() {

};









