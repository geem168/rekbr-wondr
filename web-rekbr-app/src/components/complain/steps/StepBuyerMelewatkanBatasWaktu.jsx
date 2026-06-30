import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const StepBuyerMelewatkanBatasWaktu = ({ waktuKomplain, waktuSellerSetuju, waktuSellerTolak, waktuAdminSetuju, isSellerSetuju, isAdminSetuju }) => (
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
                </div>
            </div>
        </li>

        {/* Step 2: Seller Setuju/Tolak */}
        <li className="relative pb-10">
            <div className="absolute left-6 top-6 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
            <div className="relative flex items-start space-x-3">
                <div className="relative">
                    {isSellerSetuju ? (
                        <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                            <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                    ) : (
                        <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center ring-8 ring-white">
                            <XCircle className="h-6 w-6 text-white" />
                        </div>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <div>
                        <div className="text-sm">
                            <span className="font-medium text-gray-900">
                                {isSellerSetuju ? 'Seller Setuju' : 'Seller Tolak'}
                            </span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                            {isSellerSetuju ? waktuSellerSetuju : waktuSellerTolak}
                        </p>
                    </div>
                </div>
            </div>
        </li>

        {/* Step 3: Admin Setuju (jika seller tolak) */}
        {!isSellerSetuju && isAdminSetuju && (
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
                                <span className="font-medium text-gray-900">Admin Setuju</span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">{waktuAdminSetuju}</p>
                        </div>
                    </div>
                </div>
            </li>
        )}

        {/* Step 4: Buyer Melewatkan Batas Waktu */}
        <li className="relative">
            <div className="relative flex items-start space-x-3">
                <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center ring-8 ring-white">
                        <XCircle className="h-6 w-6 text-white" />
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <div>
                        <div className="text-sm">
                            <span className="font-medium text-gray-900">Buyer Melewatkan Batas Waktu</span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Batas waktu terlampaui</p>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                        <p>Buyer tidak mengirim resi pengembalian dalam batas waktu yang ditentukan</p>
                    </div>
                </div>
            </div>
        </li>
    </>
);

export default StepBuyerMelewatkanBatasWaktu; 