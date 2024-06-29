import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInt } from '../../../../types/products-int';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    FormsModule,
    RatingModule,
    ButtonModule,
  ],
  providers: [
    ConfirmationService,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  constructor (
    private confirmationService: ConfirmationService,
  ) {}

  @Input() product!: ProductInt;
  @Output() edit: EventEmitter<ProductInt> = new EventEmitter<ProductInt>()
  @Output() delete: EventEmitter<string> = new EventEmitter<string>()
  
  editProduct() {
    this.edit.emit(this.product)
  }

  deleteProduct() {
    this.delete.emit(this.product.id);
  }

  confirmationDelete() {
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete this project",
      accept: () => {
        this.deleteProduct()
      }
    })
  }

  ngOnInit () {}
}
