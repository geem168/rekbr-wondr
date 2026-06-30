export const STATUS = {
    PERS_SELLER: "Persetujuan Seller",
    PERS_ADMIN: "Persetujuan Admin",
    RETURN: "Pengembalian Barang",
    DONE: "Transaksi Selesai",
    CANCEL: "Dibatalkan",
    LOST: "Barang Hilang",
    NOT_MATCH: "Barang Ga Sesuai",
    DAMAGED: "Barang Rusak"
};

export const STEP_FLOW = {
    "Persetujuan Seller": [
        { name: "Waktu buat komplain", status: "completed" },
        { name: "Menunggu seller setuju", status: "current" }
    ],
    "Persetujuan Admin": [
        { name: "Waktu buat komplain", status: "completed" },
        { name: "Seller menolak komplain", status: "rejected" },
        { name: "Menunggu persetujuan admin", status: "current" }
    ],
    "Pengembalian Barang": [
        { name: "Waktu buat komplain", status: "completed" },
        { name: "Seller menyetujui komplain", status: "completed" },
        { name: "Menunggu buyer pengembalian", status: "current" }
    ],
    "Transaksi Selesai": [
        { name: "Waktu buat komplain", status: "completed" },
        { name: "Seller menyetujui komplain", status: "completed" },
        { name: "Konfirmasi seller dan dana refunded", status: "completed" }
    ],
    "Dibatalkan": [
        { name: "Waktu buat komplain", status: "completed" },
        { name: "Buyer membatalkan komplain", status: "rejected" }
    ],
    // Extend untuk status lain jika perlu
}; 