import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VerticalStep from "../components/complain/VerticalStep";
import buktiPengirimanImg from "../assets/contoh-resi.png";
import Breadcrumb from "../components/BreadCrumb";
import { Check } from "lucide-react";
import { mapTableStatusToStepStatus, mapDataToStepPropsGaSesuai } from "../components/table/DataTableBarangGaSesuai";
import ComplainInfoSection from '../components/ComplainInfoSection';

const detailKomplain = {
    komplain: {
        idTransaksi: "123456789",
        namaBarang: "Smartphone Canggih",
        seller: { email: "seller_shop@gmail.com" },
    }
};

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-800 font-semibold">{value}</span>
    </div>
);

const fallbackMockData = {
    id: "GS2345678903",
    waktu: "21 Juni 2025",
    nama: "Sepatu Ukuran 42",
    pembeli: "user8@example.com",
    noResi: "GS3474124015",
    ekspedisi: "SiCepat Express",
    status: "Pengembalian Barang",
    asuransi: false,
    statusPengajuan: "Ditinjau",
};

const formatDate = (date) => {
    return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }) + " WIB";
};

const DetailBarangGaSesuaiPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const komplainData = location.state?.data || fallbackMockData;

    const [status, setStatus] = useState(komplainData.status || "Persetujuan Seller");
    const [statusPengajuan, setStatusPengajuan] = useState(komplainData.statusPengajuan || "Tanpa pengajuan");
    const [adminActionTimestamp, setAdminActionTimestamp] = useState(null);
    const [isRejectedByAdmin, setIsRejectedByAdmin] = useState(false);
    const [resiPengembalian, setResiPengembalian] = useState(null);
    const [buyerReturnTimestamp, setBuyerReturnTimestamp] = useState(null);
    const [buyerTimeout, setBuyerTimeout] = useState(false);
    const [buyerConfirmTimestamp, setBuyerConfirmTimestamp] = useState(null);
    const [showNewSlicing, setShowNewSlicing] = useState(false);
    const [adminActionType, setAdminActionType] = useState(null);
    const [sellerConfirmTimestamp, setSellerConfirmTimestamp] = useState(null);

    const waktuBuatKomplain = "19 Juni 2025, 11:30 WIB";
    const waktuSellerSetuju = "19 Juni 2025, 12:00 WIB";
    const waktuSellerTolak = "19 Juni 2025, 12:00 WIB";
    const waktuAdminSetuju = adminActionTimestamp || "19 Juni 2025, 14:00 WIB";
    const waktuBuyerInputResi = buyerReturnTimestamp || "20 Juni 2025, 09:00 WIB";

    const handleSellerSetuju = () => {
        setStatus("Pengembalian Barang");
        setStatusPengajuan("Tanpa pengajuan");
        setIsRejectedByAdmin(false);
        setResiPengembalian(null);
        setBuyerReturnTimestamp(null);
        setBuyerTimeout(false);
    };

    const handleSellerTolak = () => {
        setStatus("Persetujuan Admin");
        setStatusPengajuan("Ditinjau");
        setIsRejectedByAdmin(false);
        setResiPengembalian(null);
        setBuyerReturnTimestamp(null);
        setBuyerTimeout(false);
    };

    const handleAdminSetuju = () => {
        if (!showNewSlicing) {
            setStatus("Pengembalian Barang");
            setStatusPengajuan("Ditinjau");
            setAdminActionTimestamp(new Date().toLocaleString("id-ID", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) + " WIB");
            setIsRejectedByAdmin(false);
            setResiPengembalian(null);
            setBuyerReturnTimestamp(null);
            setBuyerTimeout(false);
        } else {
            setAdminActionType('teruskan');
            setAdminActionTimestamp(formatDate(new Date()));
        }
    };

    const handleAdminTolak = () => {
        if (!showNewSlicing) {
            setStatus("Transaksi Selesai");
            setStatusPengajuan("Ditolak");
            setAdminActionTimestamp(new Date().toLocaleString("id-ID", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) + " WIB");
            setIsRejectedByAdmin(true);
            setResiPengembalian(null);
            setBuyerReturnTimestamp(null);
            setBuyerTimeout(false);
        } else {
            setAdminActionType('tolak');
            setAdminActionTimestamp(formatDate(new Date()));
        }
    };

    const handleBuyerInputResi = () => {
        setResiPengembalian("RETURGA123456");
        setBuyerReturnTimestamp(new Date().toLocaleString("id-ID", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) + " WIB");
        setBuyerTimeout(false);
        setBuyerConfirmTimestamp(null);
        setShowNewSlicing(false);
    };

    const handleBuyerConfirm = () => {
        setBuyerConfirmTimestamp(new Date().toLocaleString("id-ID", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) + " WIB");
        setShowNewSlicing(true);
    };

    const handleBuyerNoConfirm = () => {
        setBuyerConfirmTimestamp(null);
        setShowNewSlicing(false);
        setAdminActionType(null);
        setAdminActionTimestamp(null);
        setSellerConfirmTimestamp(null);
    };

    const handleSellerConfirmReceived = () => {
        setSellerConfirmTimestamp(formatDate(new Date()));
    };

    const handleBuyerTimeout = () => {
        setStatus("Transaksi Selesai");
        setBuyerTimeout(true);
    };

    let steps = [];
    if (status === "Persetujuan Seller") {
        steps = [
            { name: "Waktu buat komplain", description: waktuBuatKomplain, status: "completed" },
            { name: "Menunggu seller setuju", description: "", status: "current" },
        ];
    } else if (status === "Persetujuan Admin") {
        steps = [
            { name: "Waktu buat komplain", description: waktuBuatKomplain, status: "completed" },
            { name: "Seller menolak komplain", description: waktuSellerTolak, status: "rejected" },
            { name: "Menunggu persetujuan admin", description: "", status: "current" },
        ];
    } else if (status === "Pengembalian Barang") {
        if (statusPengajuan === "Tanpa pengajuan" || statusPengajuan === "Ditinjau") {
            steps = [
                { name: "Waktu buat komplain", description: waktuBuatKomplain, status: "completed" },
                { name: "Seller menyetujui komplain", description: waktuSellerSetuju, status: "completed" },
            ];
        } else {
            steps = [
                { name: "Waktu buat komplain", description: waktuBuatKomplain, status: "completed" },
                { name: "Seller menolak komplain", description: waktuSellerTolak, status: "rejected" },
                { name: "Admin menyetujui komplain", description: waktuAdminSetuju, status: "completed" },
            ];
        }
        if (buyerTimeout) {
            steps.push({ name: "Menunggu buyer pengembalian", description: "1 x 24 jam", status: "completed" });
            steps.push({ name: "Buyer melewati batas waktu pengembalian", description: "", status: "rejected" });
        } else if (resiPengembalian && buyerReturnTimestamp) {
            steps.push({ name: "Buyer kirim resi pengembalian", description: waktuBuyerInputResi, status: "completed" });
            steps.push({ name: "Dalam Pengiriman Balik", description: "", status: "current" });
        } else {
            steps.push({ name: "Menunggu buyer pengembalian", description: "1 x 24 jam", status: "current" });
        }
    } else if (status === "Transaksi Selesai") {
        if (buyerTimeout) {
            steps = [
                { name: "Waktu buat komplain", description: waktuBuatKomplain, status: "completed" },
                { name: "Seller menyetujui komplain", description: waktuSellerSetuju, status: "completed" },
                { name: "Menunggu buyer pengembalian", description: "1 x 24 jam", status: "completed" },
                { name: "Buyer melewati batas waktu pengembalian", description: "", status: "rejected" },
            ];
        } else {
            steps = [
                { name: "Waktu buat komplain", description: waktuBuatKomplain, status: "completed" },
                { name: "Seller menolak komplain", description: waktuSellerTolak, status: "rejected" },
                { name: "Admin menolak komplain", description: waktuAdminSetuju, status: "rejected" },
            ];
        }
    }

    const handleNavigateToRekberDetail = () => {
        const idTransaksi = detailKomplain.komplain.idTransaksi || komplainData.idTransaksi;
        navigate(`/transactions/${idTransaksi}`);
    };

    const stepStatus = mapTableStatusToStepStatus(status, statusPengajuan);

    // Mapping data ke prop step jika status Transaksi Selesai
    let stepProps = {};
    if (
        status === "Transaksi Selesai" ||
        (status === "Pengembalian Barang" && statusPengajuan === "Menunggu Seller") ||
        (status === "Pengembalian Barang" && statusPengajuan === "Ditolak")
    ) {
        stepProps = mapDataToStepPropsGaSesuai(komplainData);
    }

    return (
        <div className="max-w-5xl mx-auto py-8 px-2">
            <Breadcrumb />
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 w-full">
                    {showNewSlicing ? (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className={`flex items-center p-3 mb-4 rounded-lg ${sellerConfirmTimestamp
                                ? 'bg-[#E6F4EA] text-[#1E4620]'
                                : 'bg-[#FEF3C7] text-[#92400E]'
                                }`}>
                                {sellerConfirmTimestamp ? (
                                    <Check className="w-5 h-5 mr-3" />
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 20 20" className="mr-3">
                                        <circle cx="10" cy="10" r="9" fill="none" stroke="#92400E" strokeWidth="2" />
                                        <path d="M10 6V10" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="10" cy="14" r="1" fill="#92400E" />
                                    </svg>
                                )}
                                <span className="text-base font-semibold">
                                    {sellerConfirmTimestamp ? 'Transaksi selesai' : 'Menunggu Pengembalian'}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Tracking Komplain</h2>
                                <p className="text-lg text-gray-600 mb-6">Barang Ga Sesuai</p>
                                <ol>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-7 h-7 flex items-center justify-center">
                                                <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="w-0.5 h-12 bg-[#066afe] ml-[0px]" />
                                        </div>
                                        <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                            <span className="text-base font-medium text-[#1c1c1c]">Waktu buat komplain</span>
                                            <span className="text-base font-bold text-gray-800">{waktuBuatKomplain}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-7 h-7 flex items-center justify-center">
                                                <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="w-0.5 h-12 bg-[#066afe] ml-[0px]" />
                                        </div>
                                        <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                            <span className="text-base font-medium text-[#1c1c1c]">Seller menyetujui komplain</span>
                                            <span className="text-base font-bold text-gray-800">{waktuSellerSetuju}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-7 h-7 flex items-center justify-center">
                                                <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="w-0.5 h-12 bg-[#066afe] ml-[0px]" />
                                        </div>
                                        <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                            <span className="text-base font-medium text-[#1c1c1c]">Buyer kirim resi pengembalian</span>
                                            <span className="text-base font-bold text-gray-800">{waktuBuyerInputResi}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-7 h-7 flex items-center justify-center">
                                                <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="w-0.5 h-12 bg-[#066afe] ml-[0px]" />
                                        </div>
                                        <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                            <span className="text-base font-medium text-[#1c1c1c]">Dalam Pengiriman Balik</span>
                                            <span className="text-base font-bold text-gray-800">Barang sedang dalam perjalanan</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-7 h-7 flex items-center justify-center -ml-[2px]">
                                                <div className={`w-6 h-6 rounded-full box-border flex items-center justify-center ${adminActionType ? 'bg-[#066afe] border-[#066afe]' : 'border-2 border-[#066afe] bg-white'
                                                    }`}>
                                                    {adminActionType && (
                                                        <svg width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            {adminActionType && <div className="w-0.5 h-12 bg-[#066afe] ml-[0px]" />}
                                        </div>
                                        <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                            <span className={`text-base font-medium ${adminActionType ? 'text-[#1c1c1c]' : 'text-[#066afe] font-semibold'
                                                }`}>Buyer pengajuan konfirmasi</span>
                                            <span className="text-base font-bold text-gray-800">{buyerConfirmTimestamp}</span>
                                        </div>
                                    </div>
                                    {adminActionType && (
                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-7 h-7 flex items-center justify-center">
                                                    <div className={`w-6 h-6 rounded-full box-border flex items-center justify-center ${sellerConfirmTimestamp
                                                        ? 'bg-[#066afe] border-[#066afe]'
                                                        : adminActionType === 'teruskan'
                                                            ? 'bg-white border-4 border-blue-600'
                                                            : 'border-2 border-[#C30052] bg-white'
                                                        }`}>
                                                        {sellerConfirmTimestamp ? (
                                                            <svg width="16" height="16" viewBox="0 0 16 16">
                                                                <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                            </svg>
                                                        ) : adminActionType === 'teruskan' ? (
                                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                        ) : (
                                                            <div className="w-2 h-2 bg-[#C30052] rounded-full"></div>
                                                        )}
                                                    </div>
                                                </div>
                                                {sellerConfirmTimestamp && <div className="w-0.5 h-12 bg-[#066afe] ml-[0px]" />}
                                            </div>
                                            <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                                <span className={`text-base font-medium ${sellerConfirmTimestamp
                                                    ? 'text-[#1c1c1c]'
                                                    : adminActionType === 'teruskan'
                                                        ? 'text-[#066afe] font-semibold'
                                                        : 'text-[#C30052] font-semibold'
                                                    }`}>
                                                    {adminActionType === 'teruskan' ? 'Admin meneruskan pengajuan' : 'Admin menolak pengajuan'}
                                                </span>
                                                <span className="text-base font-bold text-gray-800">{adminActionTimestamp}</span>
                                            </div>
                                        </div>
                                    )}
                                    {sellerConfirmTimestamp && (
                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-7 h-7 flex items-center justify-center">
                                                    <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                                                        <svg width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                                <span className="text-base font-medium text-[#1c1c1c]">Konfirmasi seller dan dana refunded</span>
                                                <span className="text-base font-bold text-gray-800">{sellerConfirmTimestamp}</span>
                                            </div>
                                        </div>
                                    )}
                                </ol>
                            </div>
                            {!adminActionType && (
                                <div className="flex gap-4 mt-8">
                                    <button onClick={handleAdminTolak} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#FDE8EF] text-[#C30052] hover:bg-[#F9D6E2]">Tolak</button>
                                    <button onClick={handleAdminSetuju} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#0066FF] text-white hover:bg-[#005FCC]">Teruskan</button>
                                </div>
                            )}
                            {adminActionType && !sellerConfirmTimestamp && (
                                <div className="flex gap-4 mt-8">
                                    <button onClick={handleSellerConfirmReceived} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#E6F4EA] text-[#1E4620] hover:bg-[#D4EDDA]">Simulate Seller Konfirmasi Diterima</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <VerticalStep
                            type="rusak"
                            complainType="Barang Ga Sesuai"
                            currentStatus={stepStatus}
                            steps={steps}
                            onTolak={handleAdminTolak}
                            onSetuju={handleAdminSetuju}
                            adminActionTimestamp={waktuAdminSetuju}
                            isRejectedByAdmin={isRejectedByAdmin}
                            statusPengajuan={statusPengajuan}
                            resiPengembalian={resiPengembalian}
                            buyerReturnTimestamp={waktuBuyerInputResi}
                            {...stepProps}
                        />
                    )}
                </div>
                <div className="flex-1 flex flex-col gap-8">
                    <ComplainInfoSection
                        data={{
                            id: komplainData.id,
                            idTransaksi: detailKomplain.komplain.idTransaksi,
                            nama: komplainData.nama,
                            pembeli: komplainData.pembeli,
                            seller: detailKomplain.komplain.seller.email,
                            noResi: komplainData.noResi,
                            ekspedisi: komplainData.ekspedisi,
                            tagihanRekber: komplainData.tagihanRekber,
                            nominalBarang: komplainData.nominalBarang,
                            biayaAsuransi: komplainData.biayaAsuransi,
                            biayaJasa: komplainData.biayaJasa,
                        }}
                        onDetailRekberClick={handleNavigateToRekberDetail}
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailBarangGaSesuaiPage; 