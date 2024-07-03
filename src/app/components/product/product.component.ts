import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInt } from '../../../../types/products-int';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage, provideImgixLoader } from '@angular/common'
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmationService } from 'primeng/api';
import { environment } from '../../../../environment';
import { CommonModule } from '@angular/common';

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
  @Output() edit: EventEmitter<ProductInt> = new EventEmitter<ProductInt>()
  @Output() delete: EventEmitter<ProductInt> = new EventEmitter<ProductInt>()
  
  editProduct() {
    this.edit.emit(this.product)
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }

  get getSkeleton () {
    return !!this.product;
  }
}
