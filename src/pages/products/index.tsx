import StoreLayout from "@/layouts/store";
import { getProducts, getCategories } from "@/utils/bakolApi";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
    const [ products, setProducts ] = useState<Array<any>>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        getCategories()
        .then((e) => {
            console.log(e)
            setProducts(e.data);
            setLoading(false);
        })
    }, [])

    return (
        <StoreLayout>
            <div className="px-8 lg:px-40 py-8 bg-gray-50 text-gray-900">
                <div>
                    <h1 className="font-bold text-2xl">Semua Produk</h1>
                </div>
                <div className="flex flex-row flex-wrap gap-4 py-5">
                    {
                        products.length > 0 ?
                        products.map((product, i) => {
                            return (
                                <Link href={`products/${product.slug}`} id={product.slug} key={i} className="hover:scale-105 transition-all transform group">
                                    <div className="w-56 h-72 bg-gray-300 rounded-lg flex flex-col">
                                        <div className="h-56 bg-emerald-800 rounded-t-lg">
                                            img
                                        </div>
                                        <div className="flex flex-col px-2 py-1">
                                            <h2 className="font-semibold text-sm">{product.name}</h2>
                                            {/* <div className="text-sm">
                                                {
                                                    <div className="flex flex-col">
                                                        <div className="flex flex-wrap gap-2">
                                                            <span className="text-xs text-gray-500">Rp{Intl.NumberFormat('id-ID').format(product.selling_price)}</span>
                                                            <span className="text-xs bg-emerald-200 text-emerald-700 font-bold px-1 rounded">-{(100-(product.discounted_price/product.selling_price)*100).toFixed(0)}%</span>
                                                        </div>
                                                    </div>
                                                }
                                            </div> */}
                                            <span className="transition-transform group-hover:translate-x-10">👉</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                        : loading ? <span>Memuat...</span>
                        : <span>Tidak ada produk yang tersedia.</span>
                    }
                </div>
            </div>
        </StoreLayout>
    )
}