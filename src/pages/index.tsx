import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import StoreLayout from '@/layouts/store'
import { useEffect, useState } from 'react'
import { getCategories } from '@/utils/bakolApi'
import Head from 'next/head'
import AOS from 'aos';
import "aos/dist/aos.css";

export default function Home() {
  const [ products, setProducts ] = useState<Array<any>>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
      AOS.init({
        easing: "ease-in-out-cubic",
        duration: 300
      })

      getCategories()
      .then((e) => {
          setProducts(e.data);
          setLoading(false);
      })
    }, [])
  
  return (
    <StoreLayout>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content="Temukan berbagai pilihan produk digital dengan harga terbaik di BeliBakol. Nikmati kemudahan transaksi, berbagai metode pembayaran, dan layanan pelanggan yang responsif." />
        <meta name="keywords" content="belibakol, bakol, pulsa, listrik, token, telco, voucher, game, paket data" />
      </Head>
      <div className='flex flex-col gap-5'>
        <div>

        </div>
        <div className='flex flex-col gap-3 items-center' data-aos="fade-up">
            <h2 className='text-center text-lg font-semibold'>Produk Unggulan</h2>
            <div className='flex gap-3 flex-wrap'>
              {
                products.length > 0 ?
                products.map((product, i) => {
                  return (
                      <Link href={`products/${product.slug}`} id={product.slug} key={i} className="hover:scale-105 transition-all transform group" data-aos="fade-up">
                          <div className="w-32 h-48 rounded-lg flex flex-col">
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
              : loading ?
              <p>Loading...</p>
              : <p>Tidak ada produk ditemukan</p>
              }
            </div>
            <Link href="/products" className='bg-emerald-300 w-fit py-1 px-3 rounded-md hover:bg-emerald-400 transition-all'>Semua Produk</Link>
        </div>
      </div>
    </StoreLayout>
  )
}
