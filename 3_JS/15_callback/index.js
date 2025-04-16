// In this we learned about Sync, Async.
// If statement's are depentent - CallBack hell, sol^n - Promise's.


//  ---- When there were no promices back in the days. The code was weitten using CallBack's

const fs = require('fs');
const { basename } = require('path');

console.log();
console.log('----- By Sync way -----');
console.log();

console.log('Starting Program');

// ---- This is Sync way i.e. Blocking code ----
const contents = fs.readFileSync('./hello.txt', 'utf-8');
console.log('File Reading Success', contents);

console.log('End of Program');

console.log();
console.log('----- Now by Async way -----');
console.log();
//  ----- For Async -----

console.log('Starting Program');

fs.readFile('./hello.txt', 'utf-8', function(err, content) {
    if(err){
        console.log('Error in file reading', err);
    }
    else{
        console.log('File Reading Success', content);
    }
});

console.log('End of Program');

//  1. Read the contents of file from hello.txt
//  2. Then create a new file named as backup.txt
//  3. Copy the contents of hello file to backup file
//  4. delete the hello file

// ---- By Sync way ----

// const file = fs.readFileSync('./hello.txt', 'utf-8');
// fs.appendFile('./backup.txt');
// fs.writeFileSync('./backup.txt',)
// fs.unlink('./hello.txt');


// ---- Now by Async way ----

// ----******* CallBack Hell *******----

// If you see pyramid forming while callbacking then you are in callback hell.
console.log();
console.log('----- Now by Async way Deleting hello.txt and copting it in backup.txt -----');
console.log();

// ----- Legacy Code -----
fs.readFile('./hello.txt', 'utf-8', function(err2, cont) {
    if(err2){
        console.log('Error in file reading', err2);
    }
    else{
        console.log('File Reading Success', cont);
        fs.writeFile('backup.txt', cont, function(err3) {
            if(err3){
                console.log('Error in writing backup.txt',err3);
            }
            else{
                fs.unlink('./hello.txt', function(err4) {
                    if(err4){
                        console.log('Error deleting file', err4);
                    }
                    else{
                        console.log('File deleting Success');
                    }
                });
            }
        });
    }
});

// -----  Promices  -----
console.log();
console.log('----- Now solution for CallBack Hell is Promises -----');
console.log();


const fs_v2 = require('fs/promises');
const { constants } = require('buffer');

console.log('Starting Program');

// Multiple Async code is running in Sync fashi
fs_v2.readFile('./hello.txt', 'utf-8')
.then((constant3) => fs_v2.writeFile('backup.txt', constant3))
.then(() => fs_v2.unlink('./hello.txt'))
.catch((e) => console.log('Error',e))
.finally(() => console.log('All Done'));

console.log('String Program');

