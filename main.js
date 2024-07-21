#!/usr/bin/env node

// setup questions
import * as questions from './questions/index.js'

// handle answers
import * as handlers from './handlers/index.js'

// core/helper functions
import * as core from './core/index.js'

await core.welcome()

const config = {}

// defaults
config.pkgmgr = core.detect(process.env.npm_execpath)
config.name = 'gild-app'
config.location = './'
config.style = 'Yes'
config.git = 'Yes'

// run cli
await questions.name().then((answer) => {
    config.name = answer.result;
});
await core.runner();

await questions.location(config.name).then((answer) => {
    config.location = answer.result;
});
await core.runner();

// await questions.style().then((answer) => {
//     config.style = answer.result;
// });
// await core.runner();

await questions.gitSetup().then((answer) => {
    config.git = answer.result;
});
await core.runner();

// run handlers
try {
    console.log('\n Generating gild.json');
    await handlers.json(config).then((err) => {
        if (err == '1') {
            throw new Error('error generating gild.json')
        }
    });

    // console.log('\n Fetching starter template to '+ config.location);
    // await handlers.fetchTemplate(config.location).then((err) => {
    //     if (err == '1') {
    //         throw new Error('error fetching template')
    //     }
    // });

    if (config.git === 'Yes') {
        console.log('\n Setting up git repo');
        await handlers.git(config).then((err) => {
            if (err == '1') {
                throw new Error('error setting up git repo')
            }
        })
    }

    // if (config.deps === 'Yes') {
    //     console.log('\n Installing dependencies');
    //     await handlers.deps().then((err) => {
    //         if (err == '1') {
    //             throw new Error('error installing frontend dependencies')
    //         }
    //     });
    // }

    // all done
    process.exit(0)

} catch (err) {
    console.error('an error occured setting up your project. please try again.\n');
    //console.error(err)
    process.exit(1)
}