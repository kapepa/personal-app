import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductInt, ProductsResInt } from '../../../types/products-int';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products: ProductInt[] = [];
  apiStatic: string = environment.apiStatic;

  constructor (
    private productsService: ProductsService,
  ) {}

  ngOnInit() {
    this.productsService.getProducts({
      page: 0, perPage: 5,
    })
    .subscribe((products: ProductsResInt) => {
      this.products = products.items;

    })
  }

  onProductOutput (product: ProductInt) {

  }

  redefine (product: ProductInt): ProductInt {
    if (!product.image.startsWith(this.apiStatic)) product.image =  `${this.apiStatic}/${product.image}`
    return product
  }

}
