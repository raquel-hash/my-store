//Puedes colocar o no tipado
//const username:string | number = 'raquelquelca';
const username:string | number = 'raquelquelca';


const sum = (a: number, b: number) =>{
  return a+b;
}

sum(1,2);


class Person {
  // private age: number;
  // lastname: string;

  // constructor(age: number, lastaname: string){
  //   this.age=age;
  //   this.lastname=lastaname;
  // }

    constructor(public age: number, public lastaname: string){}

}

const raquel = new Person(22, 'Quelca');
raquel.age;

