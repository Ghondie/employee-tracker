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
    var query = `SELECT * FROM ${table}`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        again();
    });
};
function addEmployee() {
    connection.query("SELECT id, first_name FROM employee WHERE role_id BETWEEN 1 and 3",
        function (err, response) {
            if (err) throw err;
            const mgrarr = response.map(row => row.first_name) || []
            connection.query("SELECT id, title FROM role",
                function (err, res) {
                    if (err) throw err;
                    const rolearr = res.map(row => row.title)
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "employee first name",
                            name: "firstname"
                        },
                        {
                            type: "input",
                            message: "employee last name",
                            name: "lastname"
                        },
                        {
                            type: "list",
                            message: "what role",
                            name: "role",
                            choices: rolearr
                        },
                        {
                            type: "list",
                            message: "who is you manager",
                            name: "mgr",
                            choices: [...mgrarr, "NO BOSS"]
                        },
                    ])
                        .then(function (ans) {
                            const roleId = res.filter(row => row.title === ans.role)[0].id
                            const mgrId = response.filter(row => row.name === ans.mgr)[0].id || null
                            connection.query("SELECT id, title FROM role",
                                function (err, res) {
                                    if (err) throw err;
                                    again();
                                })
                        });
                });
        });
}
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "New department name",
            name: "department name"
        },
    ])
        .then(function (ans) {
            again();
        })

}
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "New role",
            name: "new role"
        },
    ])
        .then(function (ans) {
            again();
        })
}