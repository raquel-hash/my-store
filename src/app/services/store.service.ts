import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

import { Product } from '../models/product.model';

@Injectable({ // decorador como debe comprotarse esta clase
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable();

  // constructor() { }

  addProduct(product: Product){
    // console.log(product)
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
