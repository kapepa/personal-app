import { Component, Input } from '@angular/core';
import { ProductInt } from '../../../../types/products-int';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environment';

type SrcType = ProductInt["image"];

@Component({
  selector: 'app-load-image',
  standalone: true,
  imports: [
    CommonModule,
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
  templateUrl: './load-image.component.html',
  styleUrl: './load-image.component.scss'
})
export class LoadImageComponent {
  @Input() alt: string = "";
  @Input() src: SrcType = "";
  @Input() customClass?: string;

  loadImage: any = "";


}
