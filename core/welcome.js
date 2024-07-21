import chalk from 'chalk'
import sysCheck from './sysCheck.js'
import { createSpinner } from 'nanospinner'

export default async function () {
    console.log(chalk.bgMagenta(' create gild app ') +' ' + chalk.magenta('v0.1.0') + ' welcome!\n')


    const ga_spinner = createSpinner('is Gild installed?').start();
    const isGildAgentInstalled = await sysCheck('gild --version')
    if (isGildAgentInstalled) {
        ga_spinner.success()
    } else {
        ga_spinner.error()
    }

    const i_spinner = createSpinner('is Incus installed?\n').start();
    const isIncusInstalled = await sysCheck('incus --version')
    if (isIncusInstalled) {
        i_spinner.success()
    } else {
        i_spinner.error()
    }

    if (!isGildAgentInstalled && !isIncusInstalled) {
        return
    }

    console.log('uh oh! looks like a required dependency is missing!\n')

    const b_spinner = createSpinner('is homebrew installed?').start()
    const isHomebrewInstalled = await sysCheck('brew --version')
    if (isHomebrewInstalled) {
        b_spinner.success()
    } else {
        b_spinner.error()
    }

    if (isHomebrewInstalled) {

        console.log('you do have '+ chalk.magenta('homebrew') +' installed, so you can run '+ chalk.magenta('brew install gild incus') +' to make sure both requirements are met.\n')
        console.log('after that, run this command again to continue.\n')

    } else {

        console.log('full installation options can be found here: https://gild.gg/install\n')
        console.log('after that, run this command again to continue.\n')

    }

    process.exit(1)
}