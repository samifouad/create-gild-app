import fs from  'fs/promises'; 
import { createSpinner } from 'nanospinner';

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function exists (path) {  
    try {
      await fs.access(path)
      return true
    } catch {
      return false
    }
  }

export default async function fetchTemplate (localPath) {

    const spinner = createSpinner('running...').start();

    const BASE_URL = "https://fromafri.ca";

    // fetch data from the server, located in 'github/fromafrica/rex' repo
    const response = await fetch(BASE_URL +"/hello-world.json");
    const files = await response.json();

    let createFile = [];
    let createDir = [];

    await sleep(1500);

    // iterate, prep which files/dirs to create
    files.forEach(async (item) => {
        if(item.substring(0, 1) === "#") {
            createFile.push(item.substring(1));
            await spawnFile(localPath, item.substring(1));
        }

        if(item.substring(0, 1) === "+") {
            createDir.push(item.substring(1));
            await spawnDir(localPath, item.substring(1));
        }
    });

    spinner.success({ text: 'Ok'});
    return "0";
}

// create file
async function spawnFile(localPath, file) {
    const res = await fetch("https://fromafri.ca/"+ file);
    await res.text().then((text) => {
        try {
            fs.writeFile(localPath +'/public'+ file, text, { flag: 'w' });
            return true;
        } catch (err) {
            throw new Error('unable to create file: '+ file);
        }
    });
}

// create dir
async function spawnDir(localPath, dir) {
    try {
        await fs.mkdir(localPath +'/public'+ dir, { recursive: true });
        return true;
    } catch (err) {
        throw new Error('unable to create directory: '+ dir);
    }
}  