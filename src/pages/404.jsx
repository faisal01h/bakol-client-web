import StoreLayout from "@/layouts/store";
export default function ErrorNotFound() {
    return (
        <StoreLayout>
            <div className="flex flex-col items-center justify-center h-[80vh]">
                <div>
                    <h1 className="text-4xl font-bold">404</h1>
                </div>
                <div>Halaman yang anda kunjungi tidak ditemukan!</div>
            </div>
        </StoreLayout>
    )
}