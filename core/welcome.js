import chalk from 'chalk'
import sysCheck from './sysCheck.js'
import { createSpinner } from 'nanospinner'

export default async function () {
    console.log(chalk.bgMagenta(' create gild app ') +' ' + chalk.magenta('v0.1.0') + ' welcome!\n')


    const e_spinner = createSpinner('is Erlang installed?').start();
    const isErlangInstalled = await sysCheck("erl -eval 'erlang:display(erlang:system_info(otp_release)), halt().'  -noshell")
    if (isErlangInstalled) {
        e_spinner.success()
    } else {
        e_spinner.error()

    }


    const g_spinner = createSpinner('is Gleam installed?').start()
    const isGleamInstalled = await sysCheck('gleam --version')
    if (isGleamInstalled) {
        g_spinner.success()
        console.log('\n')
    } else {
        g_spinner.error()
    }


    if (isErlangInstalled && isGleamInstalled) {
        return
    }

    console.log('uh oh! looks like a required dependency is missing!\n\n')

    const b_spinner = createSpinner('is homebrew installed?').start()
    const isHomebrewInstalled = await sysCheck('brew --version')
    if (isHomebrewInstalled) {
        b_spinner.success()
    } else {
        b_spinner.error()
    }

    if (isHomebrewInstalled) {

        console.log('\nyou do have '+ chalk.magenta('homebrew') +' installed, so you can simply run '+ chalk.magenta('brew install gleam') +' to make sure both requirements are met.\n')
        console.log('full installation options can be found here: https://gleam.run/getting-started/installing\n')
        console.log('after that, run this command again to continue.\n')

    } else {

        console.log('\nfull installation options can be found here: https://gleam.run/getting-started/installing\n')
        console.log('after that, run this command again to continue.\n')

    }

    process.exit(1)
}