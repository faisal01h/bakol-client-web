import StoreLayout from "@/layouts/store";
import { getProducts, getCategories } from "@/utils/bakolApi";
import Head from "next/head";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Products() {
    const [ products, setProducts ] = useState<Array<any>>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    let params = useSearchParams();

    useEffect(() => {
        console.log(params.get('name'))
        getCategories(params.get('name'))
        .then((e) => {
            setProducts(e.data);
        })
        .catch((e) => {
            console.error(e)
            toast.error(e.message, {
                position: "bottom-right",
                theme: "colored",
                toastId: "err"
            })
        })
        .finally(() => {
            setLoading(false);
        })
    }, [params])

    return (
        <StoreLayout>
            <Head>
                <title>Semua Produk</title>
                <meta name="description" content="Temukan berbagai pilihan produk digital dengan harga terbaik di BeliBakol. Nikmati kemudahan transaksi, berbagai metode pembayaran, dan layanan pelanggan yang responsif." />
            </Head>
            <ToastContainer />
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
                                    <div className="w-36 h-56 rounded-lg flex flex-col">
                                        <div className={`h-56 bg-emerald-800 rounded-lg `} style={{backgroundImage: `${product.image ? `url("${process.env.NEXT_PUBLIC_FILE_URL+'/storage/'+product.image}")` : ""}`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
                                            {/* <img src={process.env.NEXT_PUBLIC_FILE_URL+'/storage/'+product.image} /> */}
                                        </div>
                                        <div className="absolute bottom-0 w-full flex flex-col -mt-5 px-2 py-1 group-hover:py-10 z-10 transition-all bg-gradient-to-t from-gray-700 via-gray-600 to-transparent text-white rounded-b-lg">
                                            <h2 className="font-semibold text-sm group-hover:text-md group-hover:font-bold transition-all">{product.name}</h2>
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