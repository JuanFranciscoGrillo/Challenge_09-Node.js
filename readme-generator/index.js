// TODO: Include packages needed for this application
const fs = require('fs');
const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Array of questions for user input
const questions = [
  'Enter the title of your project:',
  'Enter a description of your project:',
  'Enter installation instructions:',
  'Enter usage information:',
  'Enter contribution guidelines:',
  'Enter test instructions:',
  'Choose a license for your project (MIT/Apache/GPL/None):',
  'Enter your GitHub username:',
  'Enter your email address:'
];

// An object to store user answers
let answers = {};

// Function to ask questions
function askQuestion(index) {
  if (index >= questions.length) {
    generateReadme();
    return;
  }

  rl.question(questions[index] + ' ', (answer) => {
    answers[questions[index]] = answer;
    askQuestion(index + 1);
  });
}

// Function to generate the README content
function generateReadme() {
  // ... (same code as before)

  const licenseBadge = `[![License](https://img.shields.io/badge/License-${answers['Choose a license for your project (MIT/Apache/GPL/None):']}-blue.svg)](https://opensource.org/licenses/${answers['Choose a license for your project (MIT/Apache/GPL/None):']})`;

  const readmeContent = `
# ${answers['Enter the title of your project:']}

## Description
${answers['Enter a description of your project:']}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
${answers['Enter installation instructions:']}

## Usage
${answers['Enter usage information:']}

## Contributing
${answers['Enter contribution guidelines:']}

## Tests
${answers['Enter test instructions:']}

## License
${licenseBadge}
This project is licensed under the ${answers['Choose a license for your project (MIT/Apache/GPL/None):']} license.

## Questions
GitHub: [${answers['Enter your GitHub username:']}](https://github.com/${answers['Enter your GitHub username:']})
Email: ${answers['Enter your email address:']}
`;

  writeToFile('README.md', readmeContent);
}

// Function to write content to a file
function writeToFile(fileName, data) {
  fs.writeFileSync(fileName, data, 'utf-8');
  console.log(`${fileName} generated successfully!`);
  rl.close();
}

// Start asking questions
askQuestion(0);
