import { Component } from '@angular/core';
// import {Product} from './product.model'
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { Auth } from './models/auth.model';
import { FilesService } from './services/files.service';

//decorador ->comportamiento de la clase
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private fileService: FilesService
  ) {}

  onLoaded(img: string) {
    console.log('Log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService
      .create({
        name: 'Raquel',
        email: 'raquel@gamil.com',
        password: '12345',
        role: 'customer',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }

  login() {
    this.authService.login('john@mail.com', 'changeme').subscribe((rta) => {
      // console.log(rta.access_token);
      this.token = rta.access_token;
    });
  }

  getProfile() {
    this.authService.getProfile().subscribe((profile) => {
      console.log(profile);
    });
  }

  downloadPDF() {
    this.fileService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file).subscribe((rta) => {
        this.imgRta = rta.location;
      });
    }
  }

  // widthImg = 10;
  // name = 'Raquel Quelca'; //Public
  // age = 23;
  // img = 'https://cdn.vox-cdn.com/thumbor/5CFwNThyu7rnexz_O3xrC_u0Qlc=/0x0:1980x1320/1200x800/filters:focal(1141x290:1457x606)/cdn.vox-cdn.com/uploads/chorus_image/image/71757363/avatar6.0.jpg'
  // btnDisaabled = true;
  // register ={
  //   name: '',
  //   email: '',
  //   password: ''
  // }
  // person ={
  //   name : "Raquel",
  //   age : 23,
  //   img : 'https://cdn.vox-cdn.com/thumbor/5CFwNThyu7rnexz_O3xrC_u0Qlc=/0x0:1980x1320/1200x800/filters:focal(1141x290:1457x606)/cdn.vox-cdn.com/uploads/chorus_image/image/71757363/avatar6.0.jpg'
  // }

  // names:string[] = ['Nico', 'Juli', 'Santi'];
  // newName='';

  // box ={
  //   width:100,
  //   height:100,
  //   background:'red'
  // }

  // products:Product[] = [
  //   {
  //     name: 'EL mejor juguete',
  //     price: 565,
  //     image: 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/toy.jpg',
  //     category: 'all',
  //   },
  //   {
  //     name: 'Bicicleta casi nueva',
  //     price: 356,
  //     image: 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/bike.jpg'
  //   },
  //   {
  //     name: 'Colleción de albumnes',
  //     price: 34,
  //     image: 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/album.jpg'
  //   },
  //   {
  //     name: 'Mis libros',
  //     price: 23,
  //     image: 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/books.jpg'
  //   },
  //   {
  //     name: 'Casa para perro',
  //     price: 34,
  //     image: 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/house.jpg'
  //   },
  //   {
  //     name: 'Gafas',
  //     price: 3434,
  //     image: 'https://raw.githubusercontent.com/platzi/angular-fundamentals/10-step/src/assets/images/glasses.jpg'
  //   }
  // ]

  // toggleButton(){
  //   this.btnDisaabled = !this.btnDisaabled;
  // }

  // increaseAge(){
  //   this.person.age +=1;
  // }

  // onScroll(event: Event){
  //   const element = event.target as HTMLElement;
  //   console.log(element.scrollTop);
  // }

  // changeName(event: Event){
  //   const element = event.target as HTMLInputElement;
  //   this.person.name = element.value;
  // }

  // addName(){
  //   this.names.push(this.newName);
  //   this.newName='';
  // }

  // deleteName(index: number){
  //   this.names.splice(index,1);
  // }

  // onRegister(){
  //   console.log(this.register)
  // }
}
