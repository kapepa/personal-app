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

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirm: EventEmitter<ProductInt> = new EventEmitter<ProductInt>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  @Input() product: ProductInt = {
    id: "",
    name: "",
    image: "",
    price: "",
    rating: 0
  }

  onLayout (event: Event) {
    const element = (event.target as HTMLElement).classList.contains("p-component-overlay")
    if (element) this.visibleChange.emit();
  }

  onChangeField (product: Partial<Omit<ProductInt, "image">> & { image?: File | string  }) {
    console.log(product)
  }

  showDialog() {

  }

  onConfirm() {
    this.confirm.emit(this.product);
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnInit () {
  }
}
