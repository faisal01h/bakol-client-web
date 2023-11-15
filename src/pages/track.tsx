import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import StoreLayout from '@/layouts/store'
import { useEffect, useState } from 'react'
import { getCategories, trackTransaction } from '@/utils/bakolApi'
import Head from 'next/head'
import AOS from 'aos';
import "aos/dist/aos.css";
import { useSearchParams } from 'next/navigation'

export default function Track() {
  const params = useSearchParams();
  const [ transactions, setTransactions ] = useState<Array<any>>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ notFound, setNotFound ] = useState<boolean>(false);

    useEffect(() => {
      AOS.init({
        easing: "ease-in-out-cubic",
        duration: 300
      })
    }, [])

    useEffect(() => {
        if(params.get('query') && params.get('query') !== '') {
            setLoading(true);
            let query = params.get('query');
            trackTransaction(query)
            .then((e) => {
                console.log(e)
                setTransactions(e)
                if(e.length === 0) {
                    setNotFound(true)
                } else setNotFound(false)
            })
            .catch(() => {
                setNotFound(true)
            })
            .finally(() => {
                setLoading(false);
            })
        }
    }, [params])
  
  return (
    <StoreLayout>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content="Temukan berbagai pilihan produk digital dengan harga terbaik di BeliBakol. Nikmati kemudahan transaksi, berbagai metode pembayaran, dan layanan pelanggan yang responsif." />
        <meta name="keywords" content="belibakol, bakol, pulsa, listrik, token, telco, voucher, game, paket data" />
      </Head>
      <div className='flex flex-col gap-5 py-5'>
        <div>

        </div>
        <div className='flex flex-col gap-3 items-center' data-aos="fade-down">
            <h2 className='text-center text-lg font-semibold'>Lacak Pesanan</h2>
            <form method='get'>
                <div className='flex flex-col'>
                    <label htmlFor="query">Masukkan Nomor WhatsApp atau Invoice Pesanan Anda</label>
                    <input type="text" id="query" name="query"className="border border-gray-300 text-lg rounded-md px-3 py-1 font-mono w-72 text-center" />
                </div>
                <div>
                    <button type="submit">Cari</button>
                </div>
            </form>
        </div>
        <div className='flex flex-col px-8 lg:px-40 gap-3 mb-5'>
        {
            transactions.length > 0 ?
            transactions.map((e, i) => {
                return (
                    <div key={i} data-aos="fade-right" className='border shadow rounded-md px-3 py-1'>
                        <span className='font-bold'>{e.invoice}</span>
                        <div className='flex justify-between'>
                            <div className='flex flex-col'>
                                <span>{e.product.name}</span>
                                <div className={`text-xs rounded-sm px-1 w-fit ${e.status === 'SUCCESS' ? "bg-emerald-300" : e.status === 'CANCELLED' ? "bg-rose-500 text-white" : "bg-gray-300"}`}>
                                    {e.status}
                                </div>
                            </div>
                            <div>
                                <span className='font-semibold'>Rp{Intl.NumberFormat('id').format(e.selling_price)},-</span>
                            </div>
                        </div>
                    </div>
                )
            }) : 
            loading ? <p>Loading...</p>
            : notFound ? <p>Transaksi tidak ditemukan!</p>
            : ""
        }
        </div>
      </div>
    </StoreLayout>
  )
}
