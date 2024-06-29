import { ProductInt } from "../../types/products-int"

export type CreateDto = Omit<ProductInt, "id">