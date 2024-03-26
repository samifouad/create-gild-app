import inquirer from 'inquirer'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdef', 10)
const rand_id = nanoid(5)

export default async function () {
    const answer = await inquirer.prompt({
        name: 'result',
        message: 'What\'s the name of your project?',
        default: 'gild-app-'+ rand_id,
    })

    return answer
}