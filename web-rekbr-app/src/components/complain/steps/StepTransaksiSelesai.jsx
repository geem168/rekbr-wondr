import React from 'react';
import { CheckCircle, Clock, XCircle, Info } from 'lucide-react';

const StepTransaksiSelesai = ({
    waktuKomplain,
    waktuSellerSetuju,
    waktuAdminSetuju,
    waktuBuyerKirimResi,
    waktuBuyerAjukanKonfirmasi,
    waktuTeruskanKonfirmasiBuyer,
    waktuTolakKonfirmasiBuyer,
    waktuTransaksiSelesai,
    isSellerSetuju,
    isAdminSetuju
}) => {
    console.log(waktuBuyerAjukanKonfirmasi == "-");
    return (
        <>
            {/* Step 1: Buat Komplain */}
            <li className="relative pb-10">
                <div className="absolute left-6 top-6 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                <div className="relative flex items-start space-x-3">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                            <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-900">Buat Komplain</span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">{waktuKomplain}</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                            <p>Komplain telah dibuat dan menunggu persetujuan seller</p>
                        </div>
                    </div>
                </div>
            </li>

            {/* Step 2: Seller Setuju/Tolak */}
            {!isSellerSetuju && <li className="relative pb-10">
                <div className="absolute left-6 top-6 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                <div className="relative flex items-start space-x-3">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center ring-8 ring-white">
                            <XCircle className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-900">Seller Tolak</span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">{waktuSellerSetuju}</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                            <p>Seller menolak komplain</p>
                        </div>
                    </div>
                </div>
            </li>}

            {/* Step 2: Seller/Admin Setuju */}
            <li className="relative pb-10">
                <div className="absolute left-6 top-6 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                <div className="relative flex items-start space-x-3">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                            <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-900">
                                    {isSellerSetuju ? 'Seller Setuju' : 'Admin Setuju'}
                                </span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">
                                {isSellerSetuju ? waktuSellerSetuju : waktuAdminSetuju}
                            </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                            <p>
                                {isSellerSetuju
                                    ? 'Seller telah menyetujui komplain'
                                    : 'Admin telah menyetujui komplain setelah seller menolak'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </li>


            {/* Step 4: Buyer Kirim Resi */}
            <li className="relative pb-10">
                <div className="absolute left-6 top-6 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                <div className="relative flex items-start space-x-3">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                            <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-900">Buyer Kirim Resi</span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">{waktuBuyerKirimResi}</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                            <p>Buyer telah mengirim resi pengembalian barang</p>
                        </div>
                    </div>
                </div>
            </li>

            {/* Step 5: Buyer Ajukan Konfirmasi (jika ada) */}
            {waktuBuyerAjukanKonfirmasi !== "-" && (
                <li className="relative pb-10">
                    <div className="absolute left-6 top-6 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                    <div className="relative flex items-start space-x-3">
                        <div className="relative">
                            <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div>
                                <div className="text-sm">
                                    <span className="font-medium text-gray-900">Buyer Ajukan Konfirmasi</span>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">{waktuBuyerAjukanKonfirmasi}</p>
                            </div>
                            <div className="mt-2 text-sm text-gray-700">
                                <p>Buyer telah mengajukan konfirmasi</p>
                            </div>
                        </div>
                    </div>
                </li>
            )}

            {/* Step 6: Admin Action (jika ada) */}
            {(waktuTeruskanKonfirmasiBuyer !== "-") && (
                <li className="relative pb-10">
                    <div className="absolute left-6 top-6 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                    <div className="relative flex items-start space-x-3">
                        <div className="relative">
                            <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div>
                                <div className="text-sm">
                                    <span className="font-medium text-gray-900">
                                        {waktuTeruskanKonfirmasiBuyer ? 'Admin Teruskan Konfirmasi' : 'Admin Tolak Konfirmasi'}
                                    </span>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                    {waktuTeruskanKonfirmasiBuyer || waktuTolakKonfirmasiBuyer}
                                </p>
                            </div>
                            <div className="mt-2 text-sm text-gray-700">
                                <p>
                                    {waktuTeruskanKonfirmasiBuyer
                                        ? 'Admin telah meneruskan konfirmasi buyer'
                                        : 'Admin telah menolak konfirmasi buyer'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
            )}

            {/* Step 7: Konfirmasi Seller Terima Barang */}
            <li className="relative">
                <div className="relative flex items-start space-x-3">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                            <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-900">Konfirmasi Seller Terima Barang</span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">{waktuTransaksiSelesai}</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                            <p>Seller telah mengkonfirmasi barang retur sudah diterima. Proses komplain selesai.</p>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
};

export default StepTransaksiSelesai; 