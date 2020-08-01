const inquirer = require("inquirer");
const conTable = require("console.table");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "1ghondie",
    database: "employees_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    question();
});

const question = function () {
    inquirer.prompt({
        type: "list",
        name: "ques",
        choices: [
            "view all employees",
            "view all roles",
            "view all departments",
            "add employee",
            "add department",
            "add role",
            "update employee role",
            "remove employee",
        ]
    })
        .then(function (answer) {
            console.log(answer)
            switch (answer.ques) {
                case "view all employees":
                    views("employee")
                    break;
                case "view all roles":
                    views("role")
                    break;
                case "view all departments":
                    views("department")
                    break;
                case "add employee":
                    addEmployee()
                    console.log
                    break;
                case "add department":
                    addDepartment()
                    console.log
                    break;
                case "add role":
                    addRole()
                    console.log
                    break;
                case "update employee role":
                    console.log
                    break;
                case "remove employee":
                    console.log
                    break;

                default:
                    break;
            }
        })
}
function again() {
    inquirer.prompt({
        type: "confirm",
        name: "agains",
        message: "Do you want to go back??",
    }).then(function ({ agains }) {
        if (agains === true) {
            question()
        } else {
            return false
        }

    })
}
function views(table) {
    var query = "SELECT * FROM ?";
    connection.query(query, [table], function (err, res) {
        if (err) throw err;
        again();
    });
};
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "employee first name",
            name: "firstname"
        },
        {
            type: "input",
            message: "employee last name",
            name: "last name"
        }
    ])
        .then(function (again))
}
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "New department name",
            name: "department name"
        },
    ])
        .then(function (again))
}
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "New role",
            name: "new role"
        },
    ])
        .then(function { again })
}