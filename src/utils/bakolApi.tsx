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
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/v1/products?name=${query?.name}&price=${query?.price}&category=${query?.category}`)
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}

export function getProduct(sku: any) {
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/v1/products/details/${sku}`)
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}

export function getCategories(name?: string | null) {
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/v1/products/categories${name? `?name=${name}` : ""}`)
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}

export function getProductsByCategory(category: string | string[]) {
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/v1/products/category/${category}`)
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}

export function checkPln(meterNumber: any) {
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/v1/products/pln?destination=${meterNumber}`)
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
    return axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/v1/checkout`, {
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
    return axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/v1/transaction/pay`, {
        invoice,
        payment_method
    })
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}

export function getTransaction(invoice: any) {
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/v1/transaction/check?invoice=${invoice}`)
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}

export function trackTransaction(query: any) {
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/v1/transaction/track/${query}`)
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
        console.error(err);
    })
}