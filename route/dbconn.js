const mysql = require('mysql')


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ecom',
    multipleStatements: true
});
connection.connect(function(err) {
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }else{
        console.log("MySQL Database Connected!");
    }
});

module.exports = connection;