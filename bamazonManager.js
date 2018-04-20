
/*

If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

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
        console.log("call to DB for products, etc...")                      // REMOVE ME REMOVE ME REMOVE ME
        // call function to pull from Db
        break;

        case "View Low Inventory": 
        console.log("show low inventory")                                   // REMOVE ME REMOVE ME REMOVE ME
        // call function to pull from DB
        break;

        case "Add to Inventory": 
        console.log("Add inventory to DB")                                  // REMOVE ME REMOVE ME REMOVE ME
        // call functiom to add to DB
        break;

        case "Add New Product": 
        console.log("Add product to DB")                                    // REMOVE ME REMOVE ME REMOVE ME
        // call function to add to DB
    
    }   

})












