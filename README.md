# Employee Summary



## Description
This is a Node CLI app that dynamically creates HTML based on user input. When the app is ran the user will be asked a series of questions in order to display their team's basic info. The result will be a web page that provides quick access to the team's emails and github profiles.

[Check out the video tutorial here!]()

## Table of Contents
- [Installation](#installation)        
- [Usage](#usage)           

- [Contributing](#contributing)
- [Tests](#tests)
- [Questions?](#questions)
           
## Installation
Enter the following command into the command line to install dependencies: ```npm i```

## Usage
The app is used within the command line. First, install any dependencies using ```npm i```, after the dependencies are done downloading the app can be used by calling ```node app.js```.

This wll start the app which will first ask which role the user will be creating a profile for. After selecting, a series of questions related to the selected role will be asked. The information for that user will be stored and the user will be given the option to create another profile until the "Done" option is selected.

*Only 1 "Manager" is able to be added per team, if "Manager" is selected again an error will show*

After the user selected done a folder named "Output" will be generated, and a web page displaying the team's information will be placed into this folder. This file will be named "team.html"


## Tests
Enter the following command into the command line to test: ```npm test```
           
## Questions?

View more of my work at the Github link below or contact me at the email below.

Github: [alexander-camacho](https://github.com/alexander-camacho)

Email: alsbrain@optonline.net