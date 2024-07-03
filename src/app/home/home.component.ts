import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductInt, ProductsResInt } from '../../../types/products-int';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../environment';
import { PaginatorModule } from 'primeng/paginator';
import { CreateDto } from '../../dto/create-dto';
import { UpdateDto } from '../../dto/update-dto';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    PaginatorModule,
    ProductComponent,
    EditPopupComponent,
    ConfirmDialogModule,
  ],
  providers: [
    ConfirmationService,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild("confirmDialog") confirmDialog!: ConfirmDialog;

  isLoading: boolean = false;
  rows: number = 5;
  totalRecords: number = 0;
  products: ProductInt[] = [];
  apiStatic: string = environment.apiStatic;

  visibleEditPopup: boolean = false;
  visibleAddPopup: boolean = false;

  selectedProduct: ProductInt =  {
    id: "",
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  constructor (
    private productsService: ProductsService,
    private confirmationService: ConfirmationService,
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
    const emptyCell: number = 4;
    const emptyProduct = new Array(emptyCell).fill(undefined);
    this.products.push(...emptyProduct)
    this.productsService.getProducts({
      page, perPage,
    })
    .subscribe((products: ProductsResInt) => {
      this.products.splice(-emptyCell);
      this.products = this.products.concat(products.items);
      this.totalRecords = products.total;
    })
  }

  onLayoutConfirmation (e: Event) {
    const layout = (e.target as HTMLDivElement)
    const hasClass = layout.classList.contains("p-dialog-mask")
    if (hasClass) {
      
    }
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
    console.log(id)
    // this.productsService.deleteProduct(id)
    // .subscribe({
    //   next: (bol: boolean) => {

    //   },
    //   error: (err) => {

    //   }
    // })
  }

  confirmationDelete(product: ProductInt) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete this ${product.name}`,
      accept: () => {
        this.onDeleteProduct(product.id);
      }
    })
  }
}
