let sum = (a,b)=> a+b;
let subtract = (a,b)=> a-b;
let multiply = (a,b)=> a*b;
let divide = (a,b)=> a/b;

let pi = 3.14159265358979323846;
let AOC = (r)=>pi*r*r
let AOR = (w,l)=>w*l
let AOT = (b,h)=>(b*h)/2
let SIM = (p,t,r)=>p*t*r/100
let COM = (p,t,r)=>p*(1+r/100)*t


let students ={
    name: "John",
    age: 25,
    height: 1.80
}
let employees ={
    name: "Jane",
    age: 25,
    height: 1.80
}
module.exports = {
    sum,
    subtract,
    multiply,
    divide,
    AOC,
    AOR,
    AOT,
    SIM,
    COM,
    students,
    employees
}