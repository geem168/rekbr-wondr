import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const StepAdminTolak = ({ waktuKomplain, waktuSellerTolak, waktuAdminTolak }) => (
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

        {/* Step 2: Seller Tolak */}
        <li className="relative pb-10">
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
                        <p className="mt-0.5 text-sm text-gray-500">{waktuSellerTolak}</p>
                    </div>
                </div>
            </div>
        </li>

        {/* Step 3: Admin Tolak */}
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
                            <span className="font-medium text-gray-900">Admin Tolak</span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">{waktuAdminTolak}</p>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                        <p>Admin telah menolak komplain</p>
                    </div>
                </div>
            </div>
        </li>
    </>
);

export default StepAdminTolak; 