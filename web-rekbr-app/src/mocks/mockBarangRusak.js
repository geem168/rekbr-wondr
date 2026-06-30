// Mock data barang rusak
export const mockBarangRusak = {
    statusKomplain: 'Menunggu Persetujuan Seller', // contoh: 'Menunggu Persetujuan Seller', 'Menunggu Persetujuan Admin', dst
    statusSeller: 'menunggu', // 'setuju', 'tolak', atau 'menunggu'
    statusAdmin: 'menunggu', // 'setuju', 'tolak', atau 'menunggu'
    waktuKomplain: '16 Juni 2025, 10:00 WIB',
    waktuSellerSetuju: '16 Juni 2025, 12:00 WIB',
    waktuSellerTolak: '16 Juni 2025, 12:00 WIB',
    waktuAdminSetuju: '16 Juni 2025, 14:00 WIB',
    waktuAdminTolak: '16 Juni 2025, 14:30 WIB',
    waktuBuyerKirimResi: '17 Juni 2025, 09:00 WIB',
    waktuBuyerAjukanKonfirmasi: '18 Juni 2025, 15:00 WIB',
    waktuTeruskanKonfirmasiBuyer: '19 Juni 2025, 10:00 WIB',
    waktuTolakKonfirmasiBuyer: '19 Juni 2025, 11:00 WIB',
    waktuTransaksiSelesai: '20 Juni 2025, 16:00 WIB',
    buyerMelewatkanBatasWaktu: false,
    dalamPengirimanBalik: false,
    buyerSudahAjukanKonfirmasi: false,
    teruskanKonfirmasiBuyer: false,
    tolakKonfirmasiBuyer: false,
    transaksiSelesai: false,
    sellerSudahSetuju: false,
    sellerSudahTolak: false,
    adminSudahSetuju: false,
    adminSudahTolak: false,
    buyerSudahKirimResi: false,
};

// Contoh data untuk berbagai status
export const mockDataSellerSetuju = {
    ...mockBarangRusak,
    statusKomplain: 'Menunggu Buyer Kirim Resi',
    sellerSudahSetuju: true,
    statusSeller: 'setuju',
};

export const mockDataSellerTolak = {
    ...mockBarangRusak,
    statusKomplain: 'Menunggu Persetujuan Admin',
    sellerSudahTolak: true,
    statusSeller: 'tolak',
};

export const mockDataAdminSetuju = {
    ...mockBarangRusak,
    statusKomplain: 'Menunggu Buyer Kirim Resi',
    sellerSudahTolak: true,
    adminSudahSetuju: true,
    statusSeller: 'tolak',
    statusAdmin: 'setuju',
};

export const mockDataAdminTolak = {
    ...mockBarangRusak,
    statusKomplain: 'Komplain Ditolak',
    sellerSudahTolak: true,
    adminSudahTolak: true,
    statusSeller: 'tolak',
    statusAdmin: 'tolak',
};

export const mockDataBuyerKirimResi = {
    ...mockBarangRusak,
    statusKomplain: 'Menunggu Pengiriman Balik',
    sellerSudahSetuju: true,
    buyerSudahKirimResi: true,
    statusSeller: 'setuju',
};

export const mockDataTransaksiSelesai = {
    ...mockBarangRusak,
    statusKomplain: 'Transaksi Selesai',
    transaksiSelesai: true,
    sellerSudahSetuju: true,
    buyerSudahKirimResi: true,
    buyerSudahAjukanKonfirmasi: true,
    teruskanKonfirmasiBuyer: true,
    statusSeller: 'setuju',
    waktuBuyerAjukanKonfirmasi: '18 Juni 2025, 15:00 WIB',
    waktuTeruskanKonfirmasiBuyer: '19 Juni 2025, 10:00 WIB',
    waktuTransaksiSelesai: '20 Juni 2025, 16:00 WIB',
};

export const mockDataDalamPengirimanBalik = {
    ...mockBarangRusak,
    statusKomplain: 'Dalam Pengiriman Balik',
    dalamPengirimanBalik: true,
    sellerSudahSetuju: true,
    buyerSudahKirimResi: true,
    statusSeller: 'setuju',
};

export const mockDataBuyerAjukanKonfirmasi = {
    ...mockBarangRusak,
    statusKomplain: 'Menunggu Konfirmasi',
    buyerSudahAjukanKonfirmasi: true,
    sellerSudahSetuju: true,
    buyerSudahKirimResi: true,
    dalamPengirimanBalik: true,
    statusSeller: 'setuju',
    waktuBuyerAjukanKonfirmasi: '18 Juni 2025, 15:00 WIB',
};

export const mockDataTeruskanKonfirmasiBuyer = {
    ...mockBarangRusak,
    statusKomplain: 'Teruskan Konfirmasi Buyer',
    teruskanKonfirmasiBuyer: true,
    sellerSudahSetuju: true,
    buyerSudahKirimResi: true,
    buyerSudahAjukanKonfirmasi: true,
    dalamPengirimanBalik: true,
    statusSeller: 'setuju',
    waktuBuyerAjukanKonfirmasi: '18 Juni 2025, 15:00 WIB',
    waktuTeruskanKonfirmasiBuyer: '19 Juni 2025, 10:00 WIB',
};

export const mockDataTolakKonfirmasiBuyer = {
    ...mockBarangRusak,
    statusKomplain: 'Tolak Konfirmasi Buyer',
    tolakKonfirmasiBuyer: true,
    sellerSudahSetuju: true,
    buyerSudahKirimResi: true,
    buyerSudahAjukanKonfirmasi: true,
    dalamPengirimanBalik: true,
    statusSeller: 'setuju',
    waktuBuyerAjukanKonfirmasi: '18 Juni 2025, 15:00 WIB',
    waktuTolakKonfirmasiBuyer: '19 Juni 2025, 11:00 WIB',
};

export const mockDataMenungguAdmin = {
    ...mockBarangRusak,
    statusKomplain: 'Menunggu Persetujuan Admin',
    sellerSudahTolak: true,
    statusSeller: 'tolak',
    waktuSellerTolak: '16 Juni 2025, 12:00 WIB',
};

// Fungsi mapping otomatis dari data ke props VerticalStepRusak
export function mapDataToStepProps(data) {
    return {
        sellerSudahSetuju: !!data.sellerSudahSetuju,
        sellerSudahTolak: !!data.sellerSudahTolak,
        adminSudahSetuju: !!data.adminSudahSetuju,
        adminSudahTolak: !!data.adminSudahTolak,
        buyerSudahKirimResi: !!data.buyerSudahKirimResi,
        buyerMelewatkanBatasWaktu: !!data.buyerMelewatkanBatasWaktu,
        dalamPengirimanBalik: !!data.dalamPengirimanBalik,
        buyerSudahAjukanKonfirmasi: !!data.buyerSudahAjukanKonfirmasi,
        teruskanKonfirmasiBuyer: !!data.teruskanKonfirmasiBuyer,
        tolakKonfirmasiBuyer: !!data.tolakKonfirmasiBuyer,
        transaksiSelesai: !!data.transaksiSelesai,
        waktuKomplain: data.waktuKomplain,
        waktuSellerSetuju: data.waktuSellerSetuju,
        waktuSellerTolak: data.waktuSellerTolak,
        waktuAdminSetuju: data.waktuAdminSetuju,
        waktuAdminTolak: data.waktuAdminTolak,
        waktuBuyerKirimResi: data.waktuBuyerKirimResi,
        waktuBuyerAjukanKonfirmasi: data.waktuBuyerAjukanKonfirmasi,
        waktuTeruskanKonfirmasiBuyer: data.waktuTeruskanKonfirmasiBuyer,
        waktuTolakKonfirmasiBuyer: data.waktuTolakKonfirmasiBuyer,
        waktuTransaksiSelesai: data.waktuTransaksiSelesai,
        waktuDibatalkan: data.waktuDibatalkan,
        currentStatus: data.currentStatus,
        isSellerSetuju: data.statusSeller === 'setuju',
        isAdminSetuju: data.statusAdmin === 'setuju',
    };
}

// Contoh penggunaan komponen VerticalStepRusak dengan berbagai status
export const contohPenggunaan = {
    // Contoh 1: Transaksi Selesai
    transaksiSelesai: {
        data: mockDataTransaksiSelesai,
        props: mapDataToStepProps(mockDataTransaksiSelesai)
    },

    // Contoh 2: Dalam Pengiriman Balik
    dalamPengirimanBalik: {
        data: mockDataDalamPengirimanBalik,
        props: mapDataToStepProps(mockDataDalamPengirimanBalik)
    },

    // Contoh 3: Buyer Ajukan Konfirmasi
    buyerAjukanKonfirmasi: {
        data: mockDataBuyerAjukanKonfirmasi,
        props: mapDataToStepProps(mockDataBuyerAjukanKonfirmasi)
    },

    // Contoh 4: Teruskan Konfirmasi Buyer
    teruskanKonfirmasiBuyer: {
        data: mockDataTeruskanKonfirmasiBuyer,
        props: mapDataToStepProps(mockDataTeruskanKonfirmasiBuyer)
    },

    // Contoh 5: Tolak Konfirmasi Buyer
    tolakKonfirmasiBuyer: {
        data: mockDataTolakKonfirmasiBuyer,
        props: mapDataToStepProps(mockDataTolakKonfirmasiBuyer)
    },

    // Contoh 6: Menunggu Admin
    menungguAdmin: {
        data: mockDataMenungguAdmin,
        props: mapDataToStepProps(mockDataMenungguAdmin)
    }
};

/*
Cara penggunaan di komponen:

import { VerticalStepRusak } from '../components/complain/VerticalStep';
import { mockDataTransaksiSelesai, mapDataToStepProps } from '../mocks/mockBarangRusak';

function ContohKomponen() {
    const data = mockDataTransaksiSelesai;
    const props = mapDataToStepProps(data);
    
    return (
        <VerticalStepRusak
            complainType="Barang Rusak"
            {...props}
        />
    );
}
*/

// Mock data for cancelled complaints with stepStatus 'komplainDibatalkan'
export const mockCancelledComplaints = [
    {
        id: 6,
        namaBarang: "Laptop Gaming",
        namaSeller: "TechStore",
        namaBuyer: "Gamer123",
        status: "Komplain Dibatalkan",
        stepStatus: "komplainDibatalkan",
        statusPengajuan: "Dibatalkan",
        tanggalKomplain: "16 Juni 2025",
        waktuKomplain: "10:00 WIB",
        waktuDibatalkan: "17 Juni 2025, 14:00 WIB",
        alasanKomplain: "Barang tidak sesuai deskripsi",
        resiPengembalian: "-",
        jumlahBarang: 1,
        hargaBarang: 15000000,
        totalHarga: 15000000
    },
    {
        id: 7,
        namaBarang: "Smartphone",
        namaSeller: "PhoneShop",
        namaBuyer: "MobileUser",
        status: "Komplain Dibatalkan",
        stepStatus: "komplainDibatalkan",
        statusPengajuan: "Dibatalkan",
        tanggalKomplain: "15 Juni 2025",
        waktuKomplain: "09:30 WIB",
        waktuDibatalkan: "16 Juni 2025, 11:00 WIB",
        alasanKomplain: "Barang rusak saat diterima",
        resiPengembalian: "-",
        jumlahBarang: 1,
        hargaBarang: 8000000,
        totalHarga: 8000000
    },
]; 