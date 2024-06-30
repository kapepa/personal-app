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
    ConfirmationService,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor (
    private confirmationService: ConfirmationService,
  ) {}

  @Input() product: ProductInt | undefined;
  @Output() edit: EventEmitter<ProductInt> = new EventEmitter<ProductInt>()
  @Output() delete: EventEmitter<string> = new EventEmitter<string>()
  
  editProduct() {
    this.edit.emit(this.product)
  }

  deleteProduct() {
    this.delete.emit(this.product?.id);
  }

  confirmationDelete() {
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete this project",
      accept: () => {
        this.deleteProduct()
      }
    })
  }

  get getSkeleton () {
    return !!this.product;
  }
}
