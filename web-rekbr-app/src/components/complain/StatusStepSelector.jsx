import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Package, UserCheck, Truck, FileText, Users, Ban } from 'lucide-react';

const StatusStepSelector = ({ currentStep, onStepChange }) => {
    const statusOptions = [
        {
            id: 'menungguSeller',
            label: 'Menunggu Seller',
            description: 'Menunggu persetujuan seller',
            icon: Clock,
            color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
            activeColor: 'bg-yellow-100 border-yellow-300 text-yellow-800'
        },
        {
            id: 'sellerSetuju',
            label: 'Seller Setuju',
            description: 'Seller menyetujui komplain',
            icon: CheckCircle,
            color: 'bg-green-50 border-green-200 text-green-700',
            activeColor: 'bg-green-100 border-green-300 text-green-800'
        },
        {
            id: 'sellerTolak',
            label: 'Seller Tolak',
            description: 'Seller menolak komplain',
            icon: XCircle,
            color: 'bg-red-50 border-red-200 text-red-700',
            activeColor: 'bg-red-100 border-red-300 text-red-800'
        },
        {
            id: 'menungguAdmin',
            label: 'Menunggu Admin',
            description: 'Menunggu persetujuan admin setelah seller tolak',
            icon: Clock,
            color: 'bg-blue-50 border-blue-200 text-blue-700',
            activeColor: 'bg-blue-100 border-blue-300 text-blue-800'
        },
        {
            id: 'adminSetuju',
            label: 'Admin Setuju',
            description: 'Admin menyetujui komplain',
            icon: UserCheck,
            color: 'bg-green-50 border-green-200 text-green-700',
            activeColor: 'bg-green-100 border-green-300 text-green-800'
        },
        {
            id: 'adminTolak',
            label: 'Admin Tolak',
            description: 'Admin menolak komplain',
            icon: Ban,
            color: 'bg-red-50 border-red-200 text-red-700',
            activeColor: 'bg-red-100 border-red-300 text-red-800'
        },
        {
            id: 'dalamPengirimanBalik',
            label: 'Dalam Pengiriman Balik',
            description: 'Barang dalam pengiriman kembali',
            icon: Truck,
            color: 'bg-orange-50 border-orange-200 text-orange-700',
            activeColor: 'bg-orange-100 border-orange-300 text-orange-800'
        },
        {
            id: 'buyerAjukanKonfirmasi',
            label: 'Buyer Ajukan Konfirmasi',
            description: 'Buyer mengajukan konfirmasi',
            icon: AlertCircle,
            color: 'bg-purple-50 border-purple-200 text-purple-700',
            activeColor: 'bg-purple-100 border-purple-300 text-purple-800'
        },
        {
            id: 'teruskanKonfirmasiBuyer',
            label: 'Teruskan Konfirmasi',
            description: 'Admin meneruskan konfirmasi, menunggu seller',
            icon: Users,
            color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
            activeColor: 'bg-indigo-100 border-indigo-300 text-indigo-800'
        },
        {
            id: 'tolakKonfirmasiBuyer',
            label: 'Tolak Konfirmasi',
            description: 'Admin menolak konfirmasi buyer',
            icon: XCircle,
            color: 'bg-red-50 border-red-200 text-red-700',
            activeColor: 'bg-red-100 border-red-300 text-red-800'
        },
        {
            id: 'transaksiSelesai',
            label: 'Transaksi Selesai',
            description: 'Komplain selesai',
            icon: CheckCircle,
            color: 'bg-green-50 border-green-200 text-green-700',
            activeColor: 'bg-green-100 border-green-300 text-green-800'
        },
        {
            id: 'komplainDibatalkan',
            label: 'Komplain Dibatalkan',
            description: 'Komplain dibatalkan buyer',
            icon: XCircle,
            color: 'bg-red-50 border-red-200 text-red-700',
            activeColor: 'bg-red-100 border-red-300 text-red-800'
        }
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Pilih Status Step</h3>
                <p className="text-sm text-gray-600">Pilih status untuk melihat alur komplain yang berbeda</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {statusOptions.map((option) => {
                    const IconComponent = option.icon;
                    const isActive = currentStep === option.id;

                    return (
                        <button
                            key={option.id}
                            onClick={() => onStepChange(option.id)}
                            className={`
                                p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105
                                ${isActive ? option.activeColor : option.color}
                                ${isActive ? 'ring-2 ring-offset-2 ring-blue-500' : 'hover:shadow-md'}
                            `}
                        >
                            <div className="flex flex-col items-center text-center">
                                <IconComponent className={`w-6 h-6 mb-2 ${isActive ? 'scale-110' : ''}`} />
                                <span className="text-sm font-medium mb-1">{option.label}</span>
                                <span className="text-xs opacity-75">{option.description}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                        Status Aktif: <span className="text-blue-600">{statusOptions.find(opt => opt.id === currentStep)?.label}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-500">Live Preview</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusStepSelector; 