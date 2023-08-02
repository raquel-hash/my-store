import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {zip} from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';
import {StoreService} from '../../services/store.service';
import {ProductsService} from '../../services/products.service';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    description: '',
    category: {
      id: '',
      name: ''
    }
  }
  // today = new Date();
  // date = new Date(2021, 1, 21);

  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ){
      this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(10,0)
    .subscribe(data =>{
      this.products = data;
      this.offset += this.limit;
    });
  }
    // {
    //   id: '1',
    //   name: 'EL mejor juguete',
    //   price: 565,
    //   image: './assets/images/dress.jpg'
    // },
    // {
    //   id: '2',
    //   name: 'Bicicleta casi nueva',
    //   price: 356,
    //   image: './assets/images/dress2.jpg'
    // },
    // {
    //   id: '3',
    //   name: 'Colleción de albumnes',
    //   price: 34,
    //   image: './assets/images/dress3.jpg'
    // },
    // {
    //   id: '4',
    //   name: 'Mis libros',
    //   price: 23,
    //   image: './assets/images/dress4.jpg'
    // },
// ];

onAddToShoppingCart(product: Product){
  this.storeService.addProduct(product)
  this.total = this.storeService.getTotal();
}

toggleProductDetail() {
  this.showProductDetail = !this.showProductDetail;
}

onShowDetail(id: string){
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id)
    .subscribe(data => {
      // console.log(data);
      this.productChosen = data;
      this.statusDetail = 'success';
    }, errorMessage => {
      window.alert(errorMessage);
      // console.error(response);
      this.statusDetail = 'error';
    })
}

readAndUpdate(id: string) {
  this.productsService.getProduct(id)
  .pipe(
    switchMap((product)=>this.productsService.update(product.id, {title: 'change'})
    )
  )
  .subscribe(data => {
    console.log(data);
  });
}

createNewProduct(){
  const product: CreateProductDTO = {
    title: 'Nuevo producto',
    description: 'Bla bla bla',
    images: [''],
    price: 1000,
    categoryId: 2
  }
  this.productsService.create(product)
  .subscribe(data => {
    // console.log("created",data);
    this.products.unshift(data);
  })
}

updateProduct(){
  const changes: UpdateProductDTO ={
    title: 'Nuevo titulo',
  }
  const id = this.productChosen.id;
  this.productsService.update(id, changes)
  .subscribe(data =>{
    const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
    this.products[productIndex] = data;
  })
}

deleteProduct() {
  const id = this.productChosen.id;
  this.productsService.delete(id)
  .subscribe(() => {
    const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
    this.products.slice(productIndex, 1);
    this.showProductDetail = false;
  })
}

loadMore(){
  this.productsService.getProductsByPage(this.limit, this.offset)
  .subscribe(data =>{
    this.products = this.products.concat(data);
    this.offset +=this.limit;
  });
}

}
