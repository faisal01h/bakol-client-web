import StoreLayout from "@/layouts/store";
import { checkPln, getProductsByCategory, countryCodes } from "@/utils/bakolApi";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsByCategory() {
    let params = useParams();
    const [ products, setProducts ] = useState([]);
    const [ category, setCategory ] = useState<any>();
    const [ activeSku, setActiveSku ] = useState();
    const [ canCheckout, setCanCheckout ] = useState(false);
    const [ destination, setDestination ] = useState<string>();
    const [ phone, setPhone ] = useState<string>();
    const [ plnQuery, setPlnQuery ] = useState<any>();

    useEffect(() => {
        if(params && params.categorySlug) {
            getProductsByCategory(params.categorySlug)
            .then((e) => {
                if(e?.data) {
                    setProducts(e.data);
                }
                if(e?.category) {
                    setCategory(e.category);
                }
                
            })
        }
    }, [params]);

    useEffect(() => {
        if(activeSku && destination && destination !== "" && phone && phone !== "") {
            setCanCheckout(true);
        } else {
            setCanCheckout(false);
        }
    }, [activeSku, destination, phone]);

    function plnInquiry() {
        checkPln(destination)
        .then((e) => {
            console.log(e)
            setPlnQuery(e.data)
        })
    }

    return (
        <StoreLayout>
            <Head>
                <title>{category ? category.name : "BeliBakol"}</title>
            </Head>
            <div>
                <div className="h-56 bg-emerald-300 flex flex-col justify-end">
                    <div className="p-10">
                        <h1 className="font-bold text-3xl">{category?.name}</h1>
                    </div>
                </div>
                <div className="lg:-mt-5 flex flex-row flex-wrap justify-center">
                    <div className="flex flex-col items-center w-fit bg-white shadow rounded-l-md border-r px-5 py-2">
                        <label htmlFor="phone">Masukkan nomor WhatsApp</label>
                        <div className="border shadow text-lg rounded-full px-3 py-1 font-mono w-72 text-center flex items-center">
                            <select title="countryCode">
                                {
                                    countryCodes.map((e, i) => {
                                        return <option key={i}>{e.icon} {e.prefix}</option>
                                    })
                                }
                            </select>
                            <input onChange={e=>setPhone(e.target.value)} className="active:outline-none active:ring-0 w-48 form-control" id="phone" type="number" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-fit bg-white shadow rounded-r-md px-5 py-2">
                        <label htmlFor="destination">{category?.prompt}</label>
                        <input onChange={e=>setDestination(e.target.value)} className="border shadow text-lg rounded-full px-3 py-1 font-mono w-72 text-center" id="destination" type="text" />
                        {
                            category && category.slug === "pln" ?
                            <button className="bg-emerald-300 mt-3 px-3 rounded-full" onClick={plnInquiry}>Cek ID Pelanggan</button> : ""
                        }
                    </div>
                    
                </div>
                {
                    plnQuery ?
                    <div className="flex justify-center mt-4">
                        <div className="flex flex-col items-center">
                            <b>{plnQuery?.name}</b>
                            <span>{plnQuery?.customer_no}</span>
                        </div>
                    </div> : ""
                }
                <div className="flex flex-row flex-wrap justify-center gap-5 py-8 lg:px-40 px-8">
                    {
                        products.length > 0 ?
                        products.map((product: any, i) => {
                            return (
                                <div 
                                    key={i} 
                                    className={`${activeSku === product.sku? "bg-emerald-600 shadow shadow-emerald-300 text-white" : ""} cursor-pointer shadow w-56 hover:bg-emerald-300 px-3 py-2 rounded-md transition-all hover:scale-105`}
                                    onClick={() => {
                                        setActiveSku(product.sku)
                                    }}
                                >
                                    <h3>{product.name}</h3>
                                    <span className="font-medium">Rp{Intl.NumberFormat('id').format(product.discounted_price)}</span>
                                </div>
                            )
                        })
                        : <p>Tidak ada produk yang ditemukan</p>
                    }
                </div>
                {
                    products.length > 0 ?
                    <div className="flex items-center justify-center mb-10">
                        <button disabled={canCheckout} className={`px-4 py-2 rounded-md ${canCheckout ? "bg-emerald-300 hover:bg-emerald-500 hover:text-white cursor-pointer" : "text-gray-600 bg-gray-300 cursor-default"}`}>Checkout</button>
                    </div>: ""
                }
            </div>
        </StoreLayout>
    )
}