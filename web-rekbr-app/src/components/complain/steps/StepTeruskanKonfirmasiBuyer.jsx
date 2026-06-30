import React from 'react';
import { CheckCircle, Clock, XCircle, Info } from 'lucide-react';

const StepTeruskanKonfirmasiBuyer = ({
    waktuKomplain,
    waktuSellerSetuju,
    waktuAdminSetuju,
    waktuBuyerKirimResi,
    waktuBuyerAjukanKonfirmasi,
    waktuTeruskanKonfirmasiBuyer,
    isSellerSetuju = false,
    isAdminSetuju = false,
}) => {
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

            {/* Step 3: Buyer Kirim Resi */}
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

            {/* Step 4: Dalam Pengiriman Balik */}
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
                                <span className="font-medium text-gray-900">Dalam Pengiriman Balik</span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Barang telah diterima seller</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                            <p>Barang telah sampai dan diterima oleh seller</p>
                        </div>
                    </div>
                </div>
            </li>

            {/* Step 5: Buyer Ajukan Konfirmasi */}
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

            {/* Step 6: Admin Teruskan Konfirmasi */}
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
                                <span className="font-medium text-gray-900">Admin Teruskan Konfirmasi</span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">{waktuTeruskanKonfirmasiBuyer}</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                            <p>Admin telah meneruskan konfirmasi buyer ke seller</p>
                        </div>
                    </div>
                </div>
            </li>

            {/* Step 7: Menunggu Konfirmasi Seller Barang Diterima */}
            <li className="relative">
                <div className="relative flex items-start space-x-3">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div>
                            <div className="text-sm">
                                <span className="font-medium text-blue-600">Menunggu Konfirmasi Seller Barang Diterima</span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Sedang menunggu</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                            <p>Menunggu seller mengkonfirmasi bahwa barang telah diterima</p>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
};

export default StepTeruskanKonfirmasiBuyer; 