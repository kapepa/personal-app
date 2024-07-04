import { ProductInt } from "../../types/products-int";
import { CreateDto } from "../dto/create-dto";
import { UpdateDto } from "../dto/update-dto";

export interface EditProduct {
  product: ProductInt, 
  index: number,
}

export interface AddProduct {
  product: CreateDto, 
}

export interface ConfirmProduct {
  product: UpdateDto, 
  index?: number | undefined,
}

export interface DeleteProduct {
  product: ProductInt, 
  index: number,
}
