let obj1 = {
    name: 'John',
    age: 25,
    city: 'New York',
    sayData(){
        greet:"hello world";
    }
}
let func1 = () =>{
    console.log("Hi my age is " + obj1.age);
}
module.exports = {
    obj: obj1,
    func: func1
}