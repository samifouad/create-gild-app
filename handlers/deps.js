import { createSpinner } from 'nanospinner'

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function deps() {
    const spinner = createSpinner('running...').start()

    await sleep(500)

    spinner.success({ text: 'Ok'})

    return '0'
}