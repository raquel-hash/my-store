import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../../services/store.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/product.model';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('john@mail.com', 'changeme').subscribe((user) => {
      // console.log(rta.access_token);
      this.profile = user;
    });
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe((data) => {
      this.categories = data;
    })
  }
}
