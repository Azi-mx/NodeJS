const a = require('./export');
let { sum, subtract,multiply,divide,AOC,AOR,AOT,SIM,COM, students,
    employees} = a
console.log(sum(20,50));
console.log(subtract(20,50));
console.log(multiply(20,50));
console.log(divide(20 ,50));
console.log(AOC(50));
console.log(AOR(20,50));
console.log(AOT(20,50));
console.log(SIM(20,50,2));
console.log(COM(20,50,4));
console.log(`Name of the student is: ${students.name} and age is ${students.age} and height is ${students.height}`);
console.log(`Name of the employee is: ${employees.name} and age is ${employees.age} and height is ${employees.height}`);
const http = require('http');


http.createServer((req,res)=>{
    res.write("Server started")
    res.end()
}).listen(3000,"localhost",()=>{
    console.log("Server started")
})
