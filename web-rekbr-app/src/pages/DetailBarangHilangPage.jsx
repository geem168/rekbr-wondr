import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import VerticalStep from "../components/complain/VerticalStep";
import Breadcrumb from "../components/BreadCrumb";
import { getComplaintDetail, resolveComplaintStatus } from "../services/complaint.service";
import { formatCurrency } from "../components/lib/utils";

const mapStatusComplaint = {
    "completed": "Transaksi Selesai",
    "canceled_by_buyer": "Dibatalkan",
    "under_investigation": "Dalam Investigasi",
    "rejected_by_seller": "Komplain Ditolak",
    "rejected_by_admin": "Komplain Ditolak",
    "approved_by_seller": "Transaksi Selesai",
    "approved_by_admin": "Transaksi Selesai",
}

// Mapping status dari tabel ke status VerticalStepComplain
const mapStatusToStep = (status) => {
    switch (status) {
        case "Dalam Investigasi":
            return "dalamInvestigasi";
        case "Komplain Ditolak":
            return "ditolak";
        case "Transaksi Selesai":
            return "selesai";
        case "Dibatalkan":
            return "dibatalkan";
        default:
            return "dalamInvestigasi";
    }
};

const DetailBarangHilangPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    // State untuk status step vertical (default dari data tabel)
    const [stepStatus, setStepStatus] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getComplaintDetail(params?.id);
            console.log(res);
            const formattedData = {
                ...res,
                trackingStatus: mapStatusComplaint[res?.status],
                komplain: {
                    idKomplain: res?.id,
                    idTransaksi: res?.transaction?.transaction_code,
                    namaBarang: res?.transaction?.item_name,
                    buyer: {
                        email: res?.transaction?.buyer?.email, // Assuming buyer_id is the email
                    },
                    seller: {
                        email: res?.transaction?.seller?.email, // Assuming seller_id is the email
                    },
                    noResi: res?.transaction?.shipment?.tracking_number || "Tidak ada",
                    ekspedisi: res?.transaction?.shipment?.courier?.name || "Tidak ada",
                    buktiPengiriman: res?.transaction?.shipment?.photo_url || null,
                    nomimanlBarang: res?.transaction?.item_price || 0,
                    biayaAsuransi: res?.transaction?.insurance_fee || 0,
                    biayaJasa: res?.transaction?.platform_fee || 0,
                    total: res?.transaction?.total_amount || 0,
                }
            }
            setDetail(formattedData);
            setStepStatus(mapStatusToStep(formattedData?.trackingStatus));
        } catch (error) {
            alert(error.message);
        }
    }

    // Handler tombol aksi
    const handleSetuju = async () => {
        // if (stepStatus === 'dalamInvestigasi') setStepStatus('selesai');
        try {
            await resolveComplaintStatus(detail?.komplain?.idKomplain, 'approve');
            fetchData(); // Refresh data after resolving
        } catch (error) {
            alert(error.message);
        }
    };
    const handleTolak = async () => {
        // if (stepStatus === 'dalamInvestigasi') setStepStatus('ditolak');
         try {
            await resolveComplaintStatus(detail?.komplain?.idKomplain, 'reject');
            fetchData(); // Refresh data after resolving
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <div className="max-w-5xl mx-auto py-8 px-2">
            <Breadcrumb id={detail?.transaction?.transaction_code}/>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Step Vertical di kiri */}
                <div className="md:w-1/3 w-full">
                    <VerticalStep
                        type="hilang"
                        status={stepStatus}
                        onTolak={handleTolak}
                        onSetuju={handleSetuju}
                    />
                </div>
                {/* Informasi di kanan */}
                <div className="flex-1 flex flex-col gap-8">
                    {/* Card utama: layout identik RekberInfoSection */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 font-sf-pro">Informasi Komplain</h2>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold text-base font-sf-pro transition"
                                onClick={() => navigate(`/transactions/${detail?.transaction?.id}`)}
                            >
                                Lihat Detail Rekber
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Kolom Kiri */}
                            <div className="space-y-3">
                                {/* <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">ID Komplain</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail?.komplain?.idKomplain}</span>
                                </div> */}
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">ID Transaksi</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail?.komplain?.idTransaksi}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Nama Barang</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail?.komplain?.namaBarang}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Buyer</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail?.komplain?.buyer?.email}</span>
                                    {/* <div className="text-xs text-gray-500 font-sf-pro">{detail?.komplain?.buyer.userId}</div> */}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Seller</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail?.komplain?.seller?.email}</span>
                                    {/* <div className="text-xs text-gray-500 font-sf-pro">{detail?.komplain?.seller.userId}</div> */}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">No Resi Ekspedisi</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro tracking-widest">{detail?.komplain?.noResi}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Ekspedisi</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail?.komplain?.ekspedisi}</span>
                                </div>
                            </div>
                            {/* Kolom Kanan */}
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Tagihan Rekber</p>
                                    <div className="bg-gray-100 rounded px-4 py-2 text-lg font-bold text-gray-900 font-sf-pro">{formatCurrency(detail?.komplain?.total)}</div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Nominal Barang</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail?.komplain?.nomimanlBarang}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Asuransi Pengiriman BNI Life (0.2%)</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail?.komplain?.biayaAsuransi}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Biaya Jasa Aplikasi</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail?.komplain?.biayaJasa}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailBarangHilangPage; 