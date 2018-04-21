

var what = 0;

var howMany = 0;

var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",                  
    port: "3306",                       
    user: "root",       
    password: "tiMh9AwUOkKzsfX1wVBs",  
    database: "bamazon" 
});

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
});

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
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function(err, res)  {  
        
        console.log(`   
Item # | Product Name      |  Price   | In Stock
                `);

       for (var r in res) {

        console.log(res[r].item_id + "       " + res[r].product_name + " " + res[r].price + "          " + res[r].stock_quantity);    
       }
})
    connection.end();
};

function addInv() {
   
    inquirer.prompt([{
        message: "What item ID would you like to add inventory to?",
        type: "input",
        name: "what"
    },{
        message: "How many would you like to add?",
        type: "input",
        name: "howMany"
    
    }]).then(function(answer){       
        if (answer.howMany === "0" || answer.howMany.length === 0) {
            console.log("Please enter a valid quantity")
            addInv();
        } else {
            howMany = answer.howMany;
            what = answer.what;

            var query = "SELECT stock_quantity FROM products WHERE item_id = " + what;

            connection.query(query, function(err, res) {   
                if (err) throw err                
                howMany = +howMany + +(JSON.stringify(res[0].stock_quantity));
                updateInv();
                return what, howMany;
            })
        }
    });
}

function updateInv() {
    var query2 = "UPDATE products SET stock_quantity = " + howMany + " WHERE item_id = " + what;  
        connection.query(query2, function(err,) {   
            if (err) throw err
            console.log("Inventory Updated");
        })
            connection.end();
};

function addProd() {
    inquirer.prompt([{
        message: "What product would you like to add?",
        type: "input",
        name: "prodName"
    },{
        message: "What department does it belong in?",
        type: "input",
        name: "deptName"
    },{
        message: "How much does it cost?",
        type: "input",
        name: "price"

    },{
        message: "How many are in stock?",
        type: "input",
        name: "stock"
    
    }]).then(function(answer){       
        if (answer.prodName.length === 0) {
            console.log("Please enter a Product to add");
            addProd();
        } else if (answer.deptName.length === 0) {
            console.log("Please enter a Department");
            addProd();
        } else if (answer.price.length === 0) {
            console.log("Please enter a Price"); 
            addProd();
        } else if (answer.stock.length === 0) {
            console.log("Please enter an Inventory amount");
            addProd();       
        } else {
            connection.query('INSERT INTO products SET ?',{
                product_name: answer.prodName,
                department_name: answer.deptName,
                price: answer.price,
                stock_quantity: answer.stock

            }, function(err) {    
                if (err) throw err
                console.log("Product Added");    
            })
        connection.end();
        }
    })
};








