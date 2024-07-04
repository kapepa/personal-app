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
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddProduct, ConfirmProduct, DeleteProduct, EditProduct } from '../../interface/fn-interface';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToastModule,
    CommonModule,
    ButtonModule,
    PaginatorModule,
    ProductComponent,
    EditPopupComponent,
    ConfirmDialogModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild("dialog") Dialog!: ConfirmDialog;

  isLoading: boolean = false;
  rows: number = 5;
  totalRecords: number = 0;
  products: ProductInt[] = [];
  apiStatic: string = environment.apiStatic;

  visibleEditPopup: boolean = false;
  visibleAddPopup: boolean = false;

  index: number | undefined = undefined;
  selectedProduct: ProductInt =  {
    id: '',
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  constructor (
    private messageService: MessageService,
    private productsService: ProductsService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.fetchProducts({ page: 0, perPage: this.rows })
  }

  onToggleAddPopup () {
    this.visibleAddPopup = !this.visibleAddPopup;
  }

  onToggleEditPopup ({ product, index }: EditProduct) {
    this.index = !this.visibleEditPopup ? index : undefined;
    this.selectedProduct = product;
    this.visibleEditPopup = !this.visibleEditPopup;
  }

  onConfirmEdit ({ product, index }: ConfirmProduct) {
    this.onEditProduct(product, index!);
    this.visibleEditPopup = false;
  }

  onConfirmAdd ({ product }: ConfirmProduct) {
    this.onAddProduct(product as CreateDto);
    this.visibleAddPopup = false;
  }

  onChangeProduct({ product, index }: EditProduct) {

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
    if (hasClass) this.Dialog.reject()
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

  onEditProduct (product: UpdateDto, index: number) {

    console.log(product)
    // this.productsService.updateProduct(product)
    // .subscribe({
    //   next: (product: ProductInt) => {
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' })
    //     this.selectedProduct = product
    //   },
    //   error: (err) => {

    //   }
    // })
  }

  onDeleteProduct ({ id, index }: {id: string, index: number}) {
    this.productsService.deleteProduct(id)
    .subscribe({
      next: (bol: boolean) => {

      },
      error: (err) => {

      }
    })
  }

  confirmationDelete({ product, index }: DeleteProduct) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete this ${product.name}`,
      accept: () => {
        this.onDeleteProduct({ id: product.id, index });
      }
    })
  }
}
