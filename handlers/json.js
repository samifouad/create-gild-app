// @ts-nocheck
import PackageJson from '@npmcli/package-json';
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
    if (await exists(config.location +'/package.json')) {
        spinner.error({ text: 'package.json already exists'});
        return "1";
    } else {
        // add empty object to file for load to work
        fs.writeFile(config.location +'/package.json', '{}', { flag: 'w' });
    }

    // load empty package.json
    const pkgJson = await PackageJson.load(config.location);

    let obj = {
      name: config.name,
      version: '0.1.0',
      description: 'cool new app project',
      type: "module",
      main: 'index.js',
      scripts: {
        "start": "serve ./public",
      },
      dependencies: {
        "@fromafrica/rex": '^0.1.0',
        "serve": '^14.0.0',
      },
    };

    // safe defaults + selected options
    pkgJson.update(obj);

    // write to file
    await pkgJson.save();
    
    spinner.success({ text: 'Ok'});
    return "0";
}