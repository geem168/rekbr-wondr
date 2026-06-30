import React from "react";

const ComplainInfoSection = ({ data, onDetailRekberClick }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-900 font-sf-pro">Informasi Komplain</h2>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold text-base font-sf-pro transition"
                    onClick={onDetailRekberClick}
                >
                    Lihat Detail Rekber
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <div>
                        <p className="text-sm text-gray-500 mb-1 font-sf-pro">ID Komplain</p>
                        <span className="text-sm font-medium text-gray-900 font-sf-pro">{data.id}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1 font-sf-pro">ID Transaksi</p>
                        <span className="text-sm font-medium text-gray-900 font-sf-pro">{data.idTransaksi}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1 font-sf-pro">Nama Barang</p>
                        <span className="text-sm font-medium text-gray-900 font-sf-pro">{data.nama}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1 font-sf-pro">Buyer</p>
                        <span className="text-sm font-medium text-gray-900 font-sf-pro">{data.pembeli}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1 font-sf-pro">Seller</p>
                        <span className="text-sm font-medium text-gray-900 font-sf-pro">{data.seller}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1 font-sf-pro">No Resi Ekspedisi</p>
                        <span className="text-sm font-medium text-gray-900 font-sf-pro tracking-widest">{data.noResi}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1 font-sf-pro">Ekspedisi</p>
                        <span className="text-sm font-medium text-gray-900 font-sf-pro">{data.ekspedisi}</span>
                    </div>
                </div>
                <div className="space-y-3">
                    <div>
                        <p className="text-sm text-gray-500 mb-1 font-sf-pro">Tagihan Rekber</p>
                        <div className="bg-gray-100 rounded px-4 py-2 text-lg font-bold text-gray-900 font-sf-pro">{data.tagihanRekber || "Rp. 8.080.000,00"}</div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1 font-sf-pro">Nominal Barang</p>
                        <span className="text-sm font-medium text-gray-900 font-sf-pro">{data.nominalBarang || "Rp. 8.000.000,00"}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1 font-sf-pro">Asuransi Pengiriman BNI Life (0.2%)</p>
                        <span className="text-sm font-medium text-gray-900 font-sf-pro">{data.biayaAsuransi || "Rp. 16.000,00"}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1 font-sf-pro">Biaya Jasa Aplikasi</p>
                        <span className="text-sm font-medium text-gray-900 font-sf-pro">{data.biayaJasa || "Rp. 64.000,00"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplainInfoSection; 