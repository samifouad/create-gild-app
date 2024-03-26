import inquirer from 'inquirer';

export default async function gitSetup() {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'result',
        message: 'Initialize a new git repo?',
        choices: ['Yes', 'No']
    });

    return answer;
}