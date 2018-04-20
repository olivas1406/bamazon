
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

};

function showLow() {

};

function addInv() {

};

function addProd() {

};









