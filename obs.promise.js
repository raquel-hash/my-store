const { resolve } = require('@angular/compiler-cli');
const { Observable } = require('rxjs');

const doSomething = () => { // Emite un solo valor, simplicidad
  return new Promise((resolve)=>{
    resolve('valor 1');
  })
}

const doSomething$ = () => {
  return new Observable(observer=>{ // emite multiples valores
    // posible escuchar constantemente: Eventos, resposive, fetchs
    // se puede cancelar
    observer.next('valor 1 $');
  })
}

(async () =>{
  const rta = await doSomething();
  console.log(rta);
})();

(() =>{
  const obs$ = doSomething();
  obs$.subscribe(rta =>{
    console.log(rta);
  })
})();


