import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ProductInt } from '../../../../types/products-int';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    FormsModule,
    RatingModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: ProductInt;
  @Output() productOutput: EventEmitter<ProductInt> = new EventEmitter<ProductInt>()

  ngOnInit () {
    this.productOutput.emit(this.product)
  }
}
