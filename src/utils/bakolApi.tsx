import axios from "axios";
import { ProductSearchQuery } from "./types";

export const countryCodes = [
    {
        code: "id",
        prefix: "+62",
        icon: "🇮🇩"
    }
]

export function getProducts(query?: ProductSearchQuery) {
    // let products: Array<any> = [];
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/api/products?name=${query?.name}&price=${query?.price}&category=${query?.category}`)
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}

export function getCategories(name?: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/api/products/categories${name? `?name=${name}` : ""}`)
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}

export function getProductsByCategory(category: string | string[]) {
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/api/products/category/${category}`)
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}

export function checkPln(meterNumber: any) {
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/api/products/pln?destination=${meterNumber}`)
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}