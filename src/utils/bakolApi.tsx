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

export function getProduct(sku: any) {
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/api/products/details/${sku}`)
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

export function csrf() {
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/sanctum/csrf-cookie`)
    .then((e) => {
        return e.data;
    })
    .catch(console.error)
}

export function createInvoice(sku: any, phone: any, destination: any) {
    return axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/checkout`, {
        sku,
        phone,
        destination
    })
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
    
}

export function createPayment(invoice: any, payment_method: any) {
    return axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/transaction/pay`, {
        invoice,
        payment_method
    })
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}

export function getTransaction(invoice: any) {
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/api/transaction/check?invoice=${invoice}`)
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}