import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({ //Decorador une los archivos
  selector: 'app-img',
  templateUrl: './img.component.html', //Vista
  styleUrls: ['./img.component.scss'] //Vista de stilos
})
export class ImgComponent implements OnInit,OnChanges, AfterViewInit, OnDestroy{

  img: string = '';
  @Input('img')
  set changeImg(newImg: string){
    this.img = newImg;
    console.log('change just img =>', this.img);
  }
  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault : string = 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/bike.jpg';
  // counter = 0;
  // counterFn:number | undefined = 0

  constructor() {
    //before render
    // No Async -- once time
    console.log('Constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // before - during render
    // verificar change on input -- times
    console.log('OnChanges', 'imgValue =>', this.img);
    console.log('changes', changes);

  }

  ngOnInit(): void {
    // before render
    // async - fetch -- once time
    console.log('OnInit', 'imgValue =>', this.img);
    // this.counterFn = window.setInterval(() =>{
    //   this.counter +=1;
    //   console.log('run counter');
    // }, 1000);
  }

  ngAfterViewInit(): void {
    //after render
    //handler children
    console.log('AfterViewInit');
  }

   ngOnDestroy(): void {
     // delete
     console.log('ngOnDestroy');
    //  window.clearInterval(this.counterFn);
   }

  imgError(){
    this.img = this.imgDefault;
  }

  imgLoaded(){
    console.log("log Hijo");
    this.loaded.emit(this.img);
  }
}
