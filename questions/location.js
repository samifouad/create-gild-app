import inquirer from 'inquirer';

export default async function (name) {
    const answer = await inquirer.prompt({
        name: 'result',
        message: 'Project folder location? ',
        default: `${name}`,
    });

    return answer;
}