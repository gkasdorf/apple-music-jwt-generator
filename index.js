#! /usr/bin/env node

const fs = require("fs");
const jwt = require("jsonwebtoken");
const inquirer = require("inquirer");

const questions = [
    {
        type: "input",
        name: "teamId",
        message: "Enter your Apple Developer Team ID: "
    },
    {
        type: "input",
        name: "keyId",
        message: "Enter your Apple Music key ID: "
    },
    {
        type: "input",
        name: "keyPath",
        message: "Enter the path to your Apple Music key: "
    }
];

const main = () => {
    inquirer.prompt(questions).then(answers => {
        const privateKey = fs.readFileSync(answers.keyPath).toString();

        const jwtToken = jwt.sign({}, privateKey, {
            algorithm: "ES256",
            expiresIn: "180d",
            issuer: answers.teamId,
            header: {
                alg: "ES256",
                kid: answers.keyId
            }
        });

        console.log(jwtToken);
    });
}

main();
