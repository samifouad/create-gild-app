import { createSpinner } from 'nanospinner'
import sysCheck from '../core/sysCheck.js'

// TODO: test to verify no race conditons & delete this
const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function git(config) {
    const spinner = createSpinner('running...').start()

    if (config.git === 'Yes') {
        // TODO: folder/input sanitization
        const git_init = await sysCheck('cd ./'+ config.location +' && git init')
    }

    // TODO: test to verify no race conditons & delete this
    await sleep(500)

    spinner.success({ text: 'Ok'})

    return '0'
}