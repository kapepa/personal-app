import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInt } from '../../../../types/products-int';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage, provideImgixLoader } from '@angular/common'
import { SkeletonModule } from 'primeng/skeleton';
import { environment } from '../../../../environment';
import { CommonModule } from '@angular/common';
import { DeleteProduct, EditProduct } from '../../../interface/fn-interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    FormsModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    SkeletonModule,
    NgOptimizedImage,
  ],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `${environment.apiStatic}/${config.src}`;
      }
   },
    // provideImgixLoader(environment.apiStatic),
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product: ProductInt | undefined;
  @Input() index!: number;
  @Output() edit: EventEmitter<EditProduct> = new EventEmitter<EditProduct>()
  @Output() delete: EventEmitter<DeleteProduct> = new EventEmitter<DeleteProduct>()
  
  editProduct() {
    this.edit.emit({product: this.product!, index: this.index})
  }

  deleteProduct() {
    this.delete.emit({product: this.product!, index: this.index});
  }

  get getSkeleton () {
    return !!this.product;
  }
}
