import StoreLayout from "@/layouts/store";
import { checkPln, getProductsByCategory, countryCodes } from "@/utils/bakolApi";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';

export default function ProductsByCategory() {
    let params = useParams();
    const [ products, setProducts ] = useState([]);
    const [ category, setCategory ] = useState<any>();
    const [ activeSku, setActiveSku ] = useState();
    const [ canCheckout, setCanCheckout ] = useState(false);
    const [ destination, setDestination ] = useState<string>();
    const [ phone, setPhone ] = useState<string>('');
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
                        <div className="text-lg rounded-full px-3 py-1 font-mono w-72 text-center flex items-center justify-center">
                            {/* <select title="countryCode">
                                {
                                    countryCodes.map((e, i) => {
                                        return <option key={i}>{e.icon} {e.prefix}</option>
                                    })
                                }
                            </select>
                            <input onChange={e=>setPhone(e.target.value)} className="active:outline-none active:ring-0 w-48 form-control" id="phone" type="number" /> */}
                            <PhoneInput
                                defaultCountry="id"
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
                                className="font-sans font-medium border-none outline-none ring-0"
                                inputClassName="border-none outline-none"
                                style={{border: "none"}}
                                
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-fit bg-white shadow rounded-r-md px-5 py-2">
                        <label htmlFor="destination">{category?.prompt}</label>
                        <input onChange={e=>setDestination(e.target.value)} className="border border-gray-300 text-lg rounded-md px-3 py-1 font-mono w-72 text-center" id="destination" type="text" />
                        {
                            category && category.slug === "pln" ?
                            <button className="bg-emerald-300 mt-3 px-3 rounded-md text-sm py-1 font-semibold text-emerald-800" onClick={plnInquiry}>Cek ID Pelanggan</button> : ""
                        }
                    </div>
                    
                </div>
                {
                    plnQuery ?
                    <div className="mt-4 flex justify-center">
                        <div className=" bg-emerald-300 rounded-md">
                            <div className="flex flex-col items-center">
                                <div className="bg-emerald-400 rounded-t-md px-5 w-64 text-center">
                                    <b>Informasi Pelanggan</b>
                                </div>
                                <div className="px-5 flex flex-col justify-center items-center py-2 w-64">
                                    <b>{plnQuery?.name}</b>
                                    <span>{plnQuery?.customer_no}</span>
                                </div>
                            </div>
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
                                    className={`${activeSku === product.sku? "bg-emerald-600 shadow shadow-emerald-300 text-white" : ""} group cursor-pointer shadow w-56 hover:bg-emerald-500 px-3 py-2 rounded-md transition-all hover:scale-105`}
                                    onClick={() => {
                                        setActiveSku(product.sku)
                                    }}
                                >
                                    <h3>{product.name}</h3>
                                    {
                                        product.selling_price !== product.discounted_price ?
                                        <div className="flex gap-2">
                                            <span className={`${activeSku === product.sku ? "text-gray-300" : ""} group-hover:text-gray-600 text-xs font-semibold line-through text-gray-600`}>Rp{Intl.NumberFormat('id').format(product.selling_price)}</span>
                                            <span className="text-xs bg-emerald-200 text-emerald-700 font-bold px-1 rounded">DISKON {(100-(product.discounted_price/product.selling_price)*100).toFixed(0)}%</span>
                                        </div> : ""
                                    }
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
                        <button disabled={canCheckout} className={`px-4 py-2 rounded-md ${canCheckout ? "bg-emerald-300 hover:bg-emerald-500 hover:text-white cursor-pointer text-emerald-800 font-semibold" : "text-gray-600 bg-gray-300 cursor-default"}`}>Checkout</button>
                    </div>: ""
                }
            </div>
        </StoreLayout>
    )
}