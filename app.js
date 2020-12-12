const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,

// separate questions out into functions for each type of employee
var employees = []

function init() {

    inquirer.prompt([
        {
            type: 'list',
            message: 'Which team member is being entered?',
            name: 'newMember',
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "Done",
            ]
        }
    ]).then(response => {

        switch (response.newMember) {

            case "Manager":
                createManager()
                break;
            case "Engineer":
                createEngineer()
                break;
            case "Intern":
                createIntern()
                break;
            case "Done":
                createPage()
                break;

        }
    })
}

function createManager() {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is the manager's name?`,
            name: 'managerName',
        },
        {
            type: 'input',
            message: `What is the manager's email address?`,
            name: 'managerEmail',
        },
        {
            type: 'input',
            message: `What is the manager's ID number?`,
            name: 'managerId',
        },
        {
            type: 'input',
            message: `What is your manager's office number?`,
            name: 'managerOfficeNumber',
        },
    ]).then(response => {
        const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber)
        employees.push(manager)

        init()

    })
}

function createEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is the engineer's name?`,
            name: 'engineerName',
        },
        {
            type: 'input',
            message: `What is the engineer's employee ID?`,
            name: 'engineerId',
        },
        {
            type: 'input',
            message: `What is the engineer's email?`,
            name: 'engineerEmail',
        },
        {
            type: 'input',
            message: `What is the engineer's Github username?`,
            name: 'engineerGithub',
        },
    ]).then(response => {

        const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub)
        employees.push(engineer)

        init()
    })
}

function createIntern() {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is the intern's name?`,
            name: 'internName',
        },
        {
            type: 'input',
            message: `What is the intern's employee ID?`,
            name: 'internId',
        },
        {
            type: 'input',
            message: `What is the intern's email?`,
            name: 'internEmail',
        },
        {
            type: 'input',
            message: `What is the name of the intern's school?`,
            name: 'internSchool',
        },
    ]).then((response) => {

        const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool)
        employees.push(intern)

        init()

    })

}

function createPage() {

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }

    fs.writeFile(outputPath, render(employees),
        (err) => err ? console.log(err) : console.log('File has been generated.'))
}

init()
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.