import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ProductInt } from '../../../../types/products-int';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environment';

type SrcType = ProductInt["image"];
type ChangeImage = { image: File }

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
  ],
  templateUrl: './load-image.component.html',
  styleUrl: './load-image.component.scss'
})
export class LoadImageComponent {
  @Input() alt: string = "";
  @Input() src: SrcType = "";
  @Input() customClass?: string;
  @Output() changeImage: EventEmitter<ChangeImage> = new EventEmitter<ChangeImage>()

  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;
  @ViewChild('imageView') imageView!: ElementRef<HTMLImageElement>;
  loadImage: File | undefined = undefined;

  onSelectImage () {
    this.inputFile.nativeElement.click()
  }

  onChangeImage (event: Event) {
    const file = ((event.target as HTMLInputElement).files as FileList)[0]
    const fr = new FileReader();
    fr.onload = () => {
      this.imageView.nativeElement.src = fr.result as string;
      this.imageView.nativeElement.srcset = fr.result as string;
      this.changeImage.emit({ image: file })
    }
    fr.readAsDataURL(file);
  }
}
