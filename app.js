// Dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Path for output folder and output file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


// Array to hold the employees when they are created
var employees = []


// Function to initialize the program, will first ask which role of team member is being added
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

        // Switch to choose a function based on the user's response
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

// Ran when the user selects "Manager"
function createManager() {
    var hasManager = employees.filter(employee => employee.getRole() === "Manager")

    // First check if the team already has a manager, if no manager exists a set of questions will appear
    if (hasManager != '') {
        console.log('The team already has a manager!')
        init()
        
    } else {

        // Ask the user for details about the manager
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
            // Create a new manager object, then push it into the employees array
            const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber)
            employees.push(manager)

            // Call init() again to generate the next employee
            init()

        })
    }
}

// Ran when the user selects "Engineer"
function createEngineer() {

    // Ask the user for details about the engineer
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

        // Create a new engineer object, then push it into the employees array
        const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub)
        employees.push(engineer)

        // Call init() again to generate the next employee
        init()
    })
}

// Ran when the user selects "Intern"
function createIntern() {

    // Ask the user for details about the intern
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

        // Create a new intern object, then push it into the employees array
        const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool)
        employees.push(intern)

        // Call init() again to generate the next employee
        init()

    })

}

// Ran when the user selects "Done"
function createPage() {

    // Check if the output directory exists, if not it will be created
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }

    // Generate the site using the render function
    fs.writeFile(outputPath, render(employees),
        (err) => err ? console.log(err) : console.log('HTML has been generated.'))
}

// Begin the function when the app starts
init()