import StoreLayout from "@/layouts/store";
import { createPayment, getProduct, getTransaction } from "@/utils/bakolApi";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function ProductSku() {
    let params = useParams();
    const { push } = useRouter()
    const [ availableMethods, setAvailableMethods ] = useState<any>([
        {
            name: 'xendit.qris',
            display: 'QRIS'
        },
        {
            name: 'xendit.ewallet.dana',
            display: 'DANA'
        },
    ]);
    const [ selectedMethod, setSelectedMethod ] = useState<any>();
    const [ data, setData ] = useState<any>();
    const [ showQr, setShowQr ] = useState<boolean>(false);
    const [ paymentToken, setPaymentToken ] = useState<string|undefined>();

    useEffect(() => {
        if(params && params.invoice) {
            getTransaction(params.invoice)
            .then((e) => {
                console.log('trx', e.data.transaction);
                setData(e.data.transaction);

                if(e.data.transaction.remarks !== '' && e.data.transaction.remarks !== '-') {
                    setPaymentToken(e.data.transaction.remarks);
                    if(e.data.transaction.payment_method === 'xendit.qris') {
                        setShowQr(true);
                    }
                }
            })
        }
    }, [params])

    function cancel(e:any) {
        e.preventDefault()
        // sessionStorage.clear()
        push('/products')
    }

    function pay(e:any) {
        e.preventDefault();
        createPayment(data.invoice, selectedMethod)
        .then((e) => {
            console.log(e)
            setPaymentToken(e.payment.qr_string)
            setShowQr(true)
        })
    }

    return (
        <StoreLayout>
            <Head>
                <title>{data?.product?.name} Checkout - {process.env.NEXT_PUBLIC_APP_NAME}</title>
            </Head>
            <div>
                <div className="px-8 lg:px-40 py-12 flex flex-col gap-3 lg:gap-5">
                    <div>
                        <h1 className="font-bold text-4xl">Checkout</h1>
                    </div>
                    <div className="shadow border rounded-md px-4 py-2">
                        <div className="flex justify-between">
                            <h2 className="font-semibold text-lg">{data?.product?.name}</h2>
                            <span>Rp{Intl.NumberFormat('id').format(data?.selling_price)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span>
                                Tujuan: <b className="tracking-wider font-mono">{data?.destination}</b>
                            </span>
                            <span>
                                Nomor WhatsApp: {data?.user_identifier}
                            </span>
                        </div>
                    </div>
                    {/* <div className="flex flex-col">
                        <label htmlFor="voucher">Kode Voucher</label>
                        <input type="text" id="voucher" className="border border-gray-300 text-lg rounded-md px-3 py-1 font-mono w-72 text-center" />
                    </div> */}
                    {
                        !paymentToken ?
                        <div>
                            <div>
                                <h3 className="font-semibold text-lg">Metode Pembayaran</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {
                                    availableMethods.map((e:any, i:number) => {
                                        return (
                                            <div key={i} onClick={_=>setSelectedMethod(e.name)}>
                                                <label htmlFor={e.name}>
                                                    <div className={`h-32 w-32 flex flex-col items-center cursor-pointer justify-center hover:shadow ${selectedMethod === e.name ? "bg-emerald-600 text-white" : ""} rounded-md border transition-all`}>
                                                        {e.display}
                                                    </div>
                                                </label>
                                                <input type="radio" id={e.name} className="hide" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <button onClick={pay}>Bayar</button>
                                <button onClick={cancel}>Batal</button>
                            </div>
                        </div>
                        : showQr ?
                        <div className="flex flex-col items-center gap-5">
                            <span>Scan QR code QRIS berikut untuk melakukan pembayaran</span>
                            <QRCode
                                size={256}
                                value={paymentToken}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                        : ""
                    }
                </div>
            </div>
        </StoreLayout>
    )
}