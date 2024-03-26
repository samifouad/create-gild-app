import inquirer from 'inquirer';

export default async function style() {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'result',
        message: 'Do you want to use Tailwind?',
        choices: ['Yes', 'No']
    });

    return answer;
}