import axios from "axios";
import { ProductSearchQuery } from "./types";

export function getProducts(query?: ProductSearchQuery) {
    // let products: Array<any> = [];
    return axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/api/products?name=${query?.name}&price=${query?.price}&category=${query?.category}`)
    .then((response) => {
        return response.data;
    })
    .catch(console.error)
}