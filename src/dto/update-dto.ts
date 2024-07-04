import { ProductInt } from "../../types/products-int";

export type UpdateDto = Omit<Partial<ProductInt>, "id" | "image"> & Pick<ProductInt, "id"> & { image?: File | string | undefined  }