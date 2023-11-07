import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import StoreLayout from '@/layouts/store'
import { useEffect, useState } from 'react'
import { getCategories } from '@/utils/bakolApi'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [ products, setProducts ] = useState<Array<any>>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        getCategories()
        .then((e) => {
            setProducts(e.data);
            setLoading(false);
        })
    }, [])
  
  return (
    <StoreLayout>
      <div className='flex flex-col gap-5'>
        <div>

        </div>
        <div className='flex flex-col gap-3 items-center'>
            <h2 className='text-center text-lg font-semibold'>Featured Products</h2>
            <div className='flex gap-3 flex-wrap'>
              {
                products.map((product, i) => {
                  return (
                      <Link href={`products/${product.slug}`} id={product.slug} key={i} className="hover:scale-105 transition-all transform group">
                          <div className="w-32 h-48 bg-gray-300 rounded-lg flex flex-col">
                              <div className="h-56 bg-emerald-800 rounded-t-lg">
                                  img
                              </div>
                              <div className="flex flex-col px-2 py-1 group-hover:py-10 transition-all">
                                  <h2 className="font-semibold text-sm">{product.name}</h2>
                              </div>
                          </div>
                      </Link>
                  )
              })
              }
            </div>
            <Link href="/products" className='bg-emerald-300 w-fit py-1 px-3 rounded-md'>Semua Produk</Link>
        </div>
      </div>
    </StoreLayout>
  )
}
