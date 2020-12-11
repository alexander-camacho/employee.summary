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
inquirer.prompt([
    {
        type: 'input',
        message: `What is the name of your team's manager?`,
        name: 'managerName',
    },
    {
        type: 'input',
        message: `What is your manager's email address?`,
        name: 'managerEmail',
    },
    {
        type: 'input',
        message: `How many engineers are on your team?`,
        name: 'engineerTotal',
    },
    {
        type: 'input',
        message: `What are the engineers names?`,
        name: 'engineerName',
    },
    {
        type: 'input',
        message: `What are the engineers github links?`,
        name: 'engineerGithub',
    },
    {
        type: 'input',
        message: `How many interns are on your team?`,
        name: 'internTotal',
    },
    {
        type: 'input',
        message: `What are the interns names?`,
        name: 'internName',
    },
    {
        type: 'input',
        message: `What is the name of the interns school?`,
        name: 'internSchool',
    },
]).then((response) => {

    // Declare the file name
    const filename = 'team.html'

    const manager = new Manager(`${response.managerName}`, 1, `${response.managerEmail}`, 1)
    //insert any functions here that will be used to render page elements

    fs.writeFile(filename,
        `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>My Team</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <link rel="stylesheet" href="style.css">
            <script src="https://kit.fontawesome.com/c502137733.js"></script>
        </head>
        
        <body>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 jumbotron mb-3 team-heading">
                        <h1 class="text-center">My Team</h1>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="team-area col-12 d-flex justify-content-center">
                        <div class="card employee-card">
                            <div class="card-header">
                                <h2 class="card-title"> bubba gump </h2>
                                <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i> Manager </h3>
                            </div>
                            <div class="card-body">
                                <ul class="list-group">
                                    <li class="list-group-item">ID: 1</li>
                                    <li class="list-group-item">Email: <a href="mailto:{{ email }}"> shrimp@gump.com </a></li>
                                    <li class="list-group-item">Office number: 1 </li>
                                </ul>
                            </div>
                        </div>
        
                    </div>
                </div>
            </div>
        </body>
        
        </html>`,
        (err) => err ? console.log(err) : console.log('File has been generated.'))
})
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

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
