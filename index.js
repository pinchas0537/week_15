import fs from "fs"
function delayedGreet(name, delay){
    const res = new Promise((resolve, reject) => {
        const time = setTimeout(() => {
            resolve(`hello ${name}`)
        }, delay);
        if (time) return time;
        else{ reject(error)}
    })
    return res
}

delayedGreet("pinchas",1000)
.then((res => console.log(res)))
.catch((error => console.log(error.message)))

function readFileContent(path) {
    const res = new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (data) return resolve(data)
            reject(err)
        })
    })
    return res
}
readFileContent("a.txt").then((res => console.log(`This is my file content: ${res}`)))
    .catch((err => console.error(err)));

function randomOperation() {
    const res = new Promise((resolve, reject) => {
        const random = Math.floor(Math.random() * 10)
        if (random % 2 === 0) return resolve("Success!")
        reject("Failure!")
    })
    return res
}

randomOperation()
    .then((res => console.log(res)))
    .catch((err => console.log(err)))

function p(name, age) {
    return { name, age ,get:function(){
       console.log(this.name);
        
    }}
}
console.log(p(1, 2));
