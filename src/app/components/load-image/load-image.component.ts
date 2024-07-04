import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ProductInt } from '../../../../types/products-int';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { environment } from '../../../../environment';
import { UpdateDto } from '../../../dto/update-dto';

type SrcType = UpdateDto["image"];
type ChangeImage = { image: File | SrcType }

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
  @Input() alt?: string = "";
  @Input() src: SrcType = "";
  @Input() customClass?: string;
  @Output() changeImage: EventEmitter<ChangeImage> = new EventEmitter<ChangeImage>();

  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;
  @ViewChild('imageView') imageView!: ElementRef<HTMLImageElement>;

  isLoadedImage: boolean = false;

  onSelectImage () {
    this.inputFile.nativeElement.click()
  }

  onChangeImage (event: Event) {
    const file = ((event.target as HTMLInputElement).files as FileList)[0]
    const fr = new FileReader();

    this.isLoadedImage = true;

    fr.onload = () => {
      this.imageView.nativeElement.srcset = fr.result as string;
      this.changeImage.emit({ image: file });
    }
    fr.readAsDataURL(file);
  }

  onClearImage (e: Event) {
    e.stopPropagation();
    const composeUrl = `${environment.apiStatic}/${this.src}`

    this.isLoadedImage = false;
    this.imageView.nativeElement.srcset = composeUrl;
    this.changeImage.emit({ image: this.src })
  }

  get getShowSrc () {
    return !!this.src
  }

  get getShowEmpty () {
    return !this.src && !this.isLoadedImage
  }

}
