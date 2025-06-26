// Converting Legacy Code into a Promisified version.

const fs = require('fs');

console.log('Starting Program');

function readFileWithPromise(filepath, encoding){
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, encoding, (err, content) => {
            if(err) {
                reject(err);  // Signal do - user ke catch() function ko execute kardo
            }  
            else{
                resolve(content);   // Signal do - user ke then() function ko execute kardo
            }
        });
    });
}

function writeFileWithPromise(filepath, content){
    return new Promise((resolve, reject) => {
        fs.writeFile('backup.txt', content, function (err){
            if(err){
                reject(err);
            }
            else{
                resolve();
            }
        });
    });
}

function unlinkWithPromise(filepath){
    return new Promise((resolve, reject) => {
        fs.unlink('./hello.txt', function(err){
            if(err){
                reject(err);
            }
            else{
                resolve();
            }
        })
    })
}

function wait(seconds){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), seconds * 1000);
    });
}

readFileWithPromise('./hello.txt', 'utf-8')     // Here we are running async code in sychronous fashion
    .then((content) => writeFileWithPromise('./backup.txt', content))
    .then(() => unlinkWithPromise('./hello.txt'))
    .catch(e => console.log('Error', e))
    .finally(() => console.log('All Done'));

console.log('Ending Program');

//  ----- async_ _ _ await (Syntantic sugar) -----     
//  This is a way to write async code in a more readable way, like synchronous code. It is similar to promises but with a cleaner syntax.

console.log('Starting Program');

async function doTasks() {
    try{
        const fileContent = await readFileWithPromise('./hello.txt', 'utf-8');
        await writeFileWithPromise('./backup.txt', fileContent);
        await wait(10);
        await unlinkWithPromise('./hello.txt');
    }
    catch(err){
        console.log('Error', err);
    }
    finally{
        console.log('All Done');
    }    
}

doTasks().then(() => console.log('All Done'));

console.log('Ending Program');