// @ts-nocheck
import { createSpinner } from 'nanospinner';
import fs from  'fs/promises'; 

async function exists (path) {  
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

export default async function json(config) {
    const spinner = createSpinner('running...').start();

    // check if folder exists     
    if (await exists(config.location)) {
      spinner.error({ text: 'directory already exists'});
      return "1";
    } else {
      fs.mkdir(config.location, { recursive: true }, (err) => {
        if (err) {
          spinner.error({ text: 'error creating directory'});
          return "1";
        }
      }); 
    };

    // check if package.json exists
    if (await exists(config.location +'/gild.json')) {
        spinner.error({ text: 'package.json already exists'});
        return "1";
    } else {
        // add empty object to file for load to work
        fs.writeFile(config.location +'/gild.json', '{}', { flag: 'w' });
    }

    // create gild.json
    let obj = {
      name: config.name,
      description: 'cool new app project',
    };

    // safe defaults + selected options
    // TODO: error handling in case of issues writing to file
    fs.writeFile(config.location +'/gild.json', JSON.stringify(obj, null, 2), { flag: 'w' });
    
    spinner.success({ text: 'Ok'});
    return "0";
}