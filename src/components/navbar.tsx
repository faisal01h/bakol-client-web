import Link from "next/link";
import ApplicationIcon from "./applicationIcon";

export default function Navbar() {
    return (
        <div id="navbar" className="flex justify-between bg-emerald-500 py-3 px-8 lg:px-40">
            <Link href={'/'}>
                <ApplicationIcon width={50} />
            </Link>
            <div className="flex gap-5 items-center text-white">
                <Link href={'/products'} className="hover:font-semibold">
                    Produk
                </Link>
                <Link href={'/track'} className="hover:font-semibold">
                    Lacak Pesanan
                </Link>
                <Link href={'/products'} className="hover:font-semibold">
                    Hubungi Kami
                </Link>
            </div>
        </div>
    )
}