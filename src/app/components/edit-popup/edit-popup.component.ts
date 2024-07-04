import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ProductInt } from '../../../../types/products-int';
import { FormsModule } from '@angular/forms';
import { LoadImageComponent } from '../load-image/load-image.component';
import { ConfirmProduct } from '../../../interface/fn-interface';
import { UpdateDto } from '../../../dto/update-dto';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    FormsModule,
    RatingModule,
    ButtonModule,
    DialogModule,
    CommonModule,
    InputTextModule,
    InputGroupModule,
    LoadImageComponent,
    InputGroupAddonModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  @Input() visible: boolean = false;
  @Input() header!: string;
  @Input() index!: number | undefined;
  @Input() initProduct?: ProductInt

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirm: EventEmitter<ConfirmProduct> = new EventEmitter<ConfirmProduct>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  image?: File | string | undefined = undefined;
  product : UpdateDto = {
    id: "",
    name: "",
    image: "",
    price: "",
    rating: 0
  }

  ngOnChanges() {
    if (!!this.initProduct) this.product = JSON.parse(JSON.stringify(this.initProduct));
  }

  onLayout (event: Event) {
    const element = (event.target as HTMLElement).classList.contains("p-component-overlay")
    if (element) {
      this.visible = false;
      this.visibleChange.emit(this.visible)
    };
  }

  onChangeField (product: Partial<Omit<ProductInt, "image">> & { image?: File | string }) {
    this.image = product.image;
  }

  onConfirm() {
    if (!!this.image) this.product.image = this.image
    this.confirm.emit({ product: this.product, index: this.index });
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
