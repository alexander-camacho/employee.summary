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
    var hasManager = employees.filter(employee => employee.getRole() === "Manager")
    
    // if(){
    //     console.log('The team can only have 1 manager!')
    //     init()
    // }
    if(hasManager != ''){
        console.log('The team already has a manager!')
        init()
    } else {

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