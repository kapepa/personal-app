import { ProductInt } from "../../types/products-int";

export type UpdateDto = Omit<Partial<ProductInt>, "id"> & Pick<ProductInt, "id">