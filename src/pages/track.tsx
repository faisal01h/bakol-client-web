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
import { ToastContainer, toast } from 'react-toastify'

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
                if(!e) {
                    throw new Error("Not found");
                }
                setTransactions(e)
                if(e.length === 0) {
                    setNotFound(true)
                } else setNotFound(false)
            })
            .catch((e) => {
                console.error(e)
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
      <ToastContainer />
      <div className='flex flex-col gap-5 py-5 px-8'>
        <div>

        </div>
        <div className='flex flex-col gap-3 items-center' data-aos="fade-down">
            <h2 className='text-center text-lg font-semibold'>Lacak Pesanan</h2>
            <form method='get' className='flex flex-col justify-center items-center'>
                <label htmlFor="query" className='text-center'>Masukkan Nomor WhatsApp atau Invoice Pesanan Anda</label>
                <div className='flex sm:flex-col lg:flex-row flex-wrap justify-center items-center gap-3'>
                    <input type="text" id="query" name="query" placeholder="cth: BKL_123456789 atau 628123456789" className="border border-gray-300 text-lg rounded-md px-3 py-1 w-72 text-center" />
                    <div>
                        <button type="submit" className='bg-emerald-300 w-fit py-1 px-3 rounded-md hover:bg-emerald-400 transition-all'>Cari</button>
                    </div>
                </div>
                
            </form>
        </div>
        <div className='flex flex-col px-8 lg:px-40 gap-3 mb-5'>
        {
            transactions.length > 0 ?
            transactions.map((e, i) => {
                return (
                    <Link href={`/checkout/${e.invoice}`} key={i} data-aos="fade-right" className='border shadow rounded-md px-3 py-1 hover:scale-105 hover:bg-emerald-300 transition-all'>
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
                    </Link>
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
