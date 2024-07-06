import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductInt, ProductsResInt } from '../../../types/products-int';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../environment';
import { PaginatorModule } from 'primeng/paginator';
import { UpdateDto } from '../../dto/update-dto';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmProduct, DeleteProduct, EditProduct } from '../../interface/fn-interface';
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

  isLoader: boolean = false;

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

  toForm <T>( entity: T ): FormData {
    const form = new FormData();

    for (let key in entity) {
      const val = entity[key];

      if(!val) continue;
  
      if (val instanceof File) {
        form.append(key, val, val.name);
      } else {
        form.append(key, String(val));
      }
    }
  
    return form
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
    const form = this.toForm<UpdateDto>(product);
    this.isLoader = true;
    
    this.productsService.updateProduct(product.id, form)
    .subscribe({
      next: (product: ProductInt) => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: `You were able to upgrade the product ${product.name}`
        })
        this.products.splice(index!, 1, product)
      },
      error: (err) => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: `Something went wrong`
        })
      },
      complete: () => {
        this.visibleEditPopup = false;
        this.isLoader = false
      },
    })
  }

  onConfirmAdd ({ product }: ConfirmProduct) {
    const form = this.toForm<UpdateDto>(product);
    this.isLoader = true;

    this.productsService.createProduct(form)
    .subscribe({
      next: (product: ProductInt) => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: `You have created a new product ${product.name}`
        })
        this.products.push(product);
      },
      error: () => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: `Something went wrong`
        })
      },
      complete: () => {
        this.visibleAddPopup = false;
        this.isLoader = false
      },
    })
  }

  onDeleteProduct ({ id, index }: {id: string, index: number}) {
    this.productsService.deleteProduct(id)
    .subscribe({
      next: (bol: boolean) => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: `You removed the product`
        })
        this.products.splice(index, 1);
      },
      error: () => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: `Something went wrong`
        })
      },
      complete: () => {
        this.visibleAddPopup = false;
      },
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
}
