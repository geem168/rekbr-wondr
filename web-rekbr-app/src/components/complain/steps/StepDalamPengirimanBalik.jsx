import React, { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const StepDalamPengirimanBalik = ({ waktuKomplain, waktuSellerSetuju, waktuAdminSetuju, waktuBuyerKirimResi, isSellerSetuju, isAdminSetuju }) => {
    useEffect(() => {
        console.log(isSellerSetuju);
    }, []);
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

            {/* Step 2: Seller Tolak */}

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
                                <span className="font-medium text-gray-900">Dalam Pengiriman Balik</span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Barang sedang dalam perjalanan</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                            <p>Barang sedang dalam proses pengiriman kembali ke seller</p>
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
};

export default StepDalamPengirimanBalik; 