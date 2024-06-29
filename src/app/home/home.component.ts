import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductInt, ProductsResInt } from '../../../types/products-int';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../environment';
import { PaginatorModule } from 'primeng/paginator';
import { CreateDto } from '../../dto/create-dto';
import { UpdateDto } from '../../dto/update-dto';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    PaginatorModule,
    ProductComponent,
    EditPopupComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  rows: number = 5;
  totalRecords: number = 0;
  products: ProductInt[] = [];
  apiStatic: string = environment.apiStatic;

  visibleEditPopup: boolean = false
  visibleAddPopup: boolean = false 

  selectedProduct: ProductInt =  {
    id: "",
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  constructor (
    private productsService: ProductsService,
  ) {}

  ngOnInit() {
    this.fetchProducts({ page: 0, perPage: this.rows })
  }

  onToggleEditPopup (product: ProductInt) {
    this.selectedProduct = product;
    this.visibleEditPopup = !this.visibleEditPopup;
  }

  onToggleAddPopup () {
    this.visibleAddPopup = !this.visibleAddPopup;
  }

  onToggleDeletePopup (id: string) {
    // this.selectedProduct = product;
    // this.visibleEditPopup = !this.visibleEditPopup;
  }

  onConfirmEdit (product: ProductInt) {
    this.onEditProduct(product);
    this.visibleEditPopup = false
  }

  onConfirmAdd (product: Omit<ProductInt, "id">) {
    this.onAddProduct(product);
    this.visibleAddPopup = false;
  }

  onProductOutput (product: ProductInt) {

  }

  onPageChange (event: any) {
    this.fetchProducts({page: event.page, perPage: event.row})
  }

  fetchProducts ({page, perPage}: {page: number, perPage: number}) {
    this.productsService.getProducts({
      page, perPage,
    })
    .subscribe((products: ProductsResInt) => {
      this.products = products.items;
      this.totalRecords = products.total;
    })
  }

  redefine (product: ProductInt): ProductInt {
    if (!product.image.startsWith(this.apiStatic)) product.image =  `${this.apiStatic}/${product.image}`
    return product
  }

  onAddProduct (product: CreateDto) {
    this.productsService.createProduct(product)
    .subscribe({
      next: (product: ProductInt) => {

      },
      error: (err) => {

      }
    })
  }

  onEditProduct (product: UpdateDto) {
    this.productsService.updateProduct(product)
    .subscribe({
      next: (product: ProductInt) => {

      },
      error: (err) => {

      }
    })
  }

  onDeleteProduct (id: string) {
    this.productsService.deleteProduct(id)
    .subscribe({
      next: (bol: boolean) => {

      },
      error: (err) => {

      }
    })
  }
}
