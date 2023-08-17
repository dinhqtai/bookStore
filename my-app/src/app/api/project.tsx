import instant from ".";
import { IProduct } from "../page";
export const getProducts = async () => {
    return await instant.get("/products")
}
export const getProduct = async (id: number) => {
    return await instant.get(`/products/${id}`)
}
export const addProducts = async (data: IProduct) => {
    return await instant.post("/products", data)
}
export const updateProducts = async (data: IProduct, id: number) => {
    return await instant.put(`/products/${id}`, data)
}
export const deleteProducts = async (id: number) => {
    return await instant.delete("/products/" + id)
}
