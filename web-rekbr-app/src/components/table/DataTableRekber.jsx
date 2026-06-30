import React, { useState, useEffect, useMemo } from "react";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronDownIcon, ArrowRightIcon } from "lucide-react"; // Import icons
import { getAllTransactions } from "../../services/transaksi.service";
import { useNavigate } from "react-router-dom";
import useRekberStore from "../../store/rekberStore";

const mapStatusToUI = (apiStatus) => {
  const map = {
    pending_payment: "Menunggu Pembayaran",
    waiting_shipment: "Menunggu Resi",
    shipped: "Dalam Pengiriman",
    completed: "Barang Diterima Buyer",
    refunded: "Pengembalian",
  };
  return map[apiStatus] || apiStatus;
};

const mapFundStatusToUI = (apiStatus) => {
  const map = {
    pending: "Ditinjau",
    rejected: "Ditolak",
    approved: "Menunggu Buyer",
    none: "Tanpa Pengajuan",
  };
  return map[apiStatus] || "Tanpa Pengajuan";
};

const DataTableRekber = () => {
  // Helper to format Date object to your desired string format for display
  const formatDateTimeForDisplay = (dateObj) => {
    if (!dateObj) return "";
    const formattedDate = dateObj.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = dateObj.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  const [initialRekberData, setInitialRekberData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllTransactions();
        const apiData = res.data.map((item) => ({
          id: item.id,
          idTransaksi: item.transactionCode,
          waktuBikinRekber: new Date(item.createdAt),
          namaBarang: item.itemName,
          pembeliEmail: item.buyerEmail,
          penjualEmail: item.sellerEmail,
          nominalTransaksi: item.totalAmount,
          statusRekber: mapStatusToUI(item.status), // konversi dari API ke UI-friendly label
          kolomPengajuan: mapFundStatusToUI(item.fundReleaseStatus), // handle nullable
        }));
        setInitialRekberData(apiData);
      } catch (error) {
        console.error("Gagal ambil data transaksi:", error);
      }
    };

    fetchData();
  }, []);

  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Default sortConfig: sort by waktuBikinRekber, descending (recent first)
  const [sortConfig, setSortConfig] = useState({
    key: "waktuBikinRekber",
    direction: "descending",
  });
  const [filterConfig, setFilterConfig] = useState(null);

  // Memoize filtered and sorted data for performance
  const processedData = useMemo(() => {
    let sortableItems = [...initialRekberData]; // Use initial data as base

    // Apply categorization/grouping first if active
    if (filterConfig) {
      if (filterConfig.key === "statusRekber") {
        const order = [
          "Menunggu Pembayaran",
          "Menunggu Resi",
          "Dalam Pengiriman",
          "Barang Diterima Buyer",
          "Pengembalian",
        ];
        sortableItems.sort(
          (a, b) =>
            order.indexOf(a.statusRekber) - order.indexOf(b.statusRekber)
        );
      } else if (filterConfig.key === "kolomPengajuan") {
        const order = [
          "Ditinjau",
          "Menunggu Buyer",
          "Ditolak",
          "Tanpa Pengajuan",
        ];
        sortableItems.sort(
          (a, b) =>
            order.indexOf(a.kolomPengajuan) - order.indexOf(b.kolomPengajuan)
        );
      }
    }

    // Then apply sorting if configured
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.key === "waktuBikinRekber") {
          // Compare Date objects directly
          return sortConfig.direction === "ascending"
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        } else if (typeof aValue === "string" && typeof bValue === "string") {
          // Case-insensitive string comparison for others
          if (aValue.toLowerCase() < bValue.toLowerCase()) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (aValue.toLowerCase() > bValue.toLowerCase()) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          // Numeric comparison
          return sortConfig.direction === "ascending"
            ? aValue - bValue
            : bValue - aValue;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [initialRekberData, sortConfig, filterConfig]); // Depend on initialRekberData

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const currentItems = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Update selectAll state based on checkedItems of the current page
  useEffect(() => {
    const allChecked =
      currentItems.length > 0 &&
      currentItems.every((item) => checkedItems[item.idTransaksi]);
    setSelectAll(allChecked);
  }, [checkedItems, currentItems]);

  const handleHeaderCheckboxChange = (checked) => {
    const newCheckedItems = {};
    currentItems.forEach((item) => {
      newCheckedItems[item.idTransaksi] = checked;
    });
    setCheckedItems(newCheckedItems);
    setSelectAll(checked);
  };

  const handleCheckboxChange = (idTransaksi, checked) => {
    const newCheckedItems = { ...checkedItems, [idTransaksi]: checked };
    setCheckedItems(newCheckedItems);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle sorting click
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else {
        // If already descending, and it's not the current default sort column,
        // then clicking again reverts to the default time sort.
        if (key !== "waktuBikinRekber") {
          // Only reset if not clicking the time column
          setSortConfig({ key: "waktuBikinRekber", direction: "descending" }); // Back to default time sort
          setFilterConfig(null); // Clear category filter
          setCurrentPage(1);
          return; // Exit to prevent further processing
        }
        // If it's the waktuBikinRekber column and already descending, next click makes it ascending
      }
    } else {
      // If a new sort key is clicked, default direction is ascending
      // Except for waktuBikinRekber, where default click should be descending (most recent)
      if (key === "waktuBikinRekber") {
        direction = "descending";
      }
    }

    setSortConfig({ key, direction });
    setFilterConfig(null); // Clear categorization when sorting
    setCurrentPage(1); // Reset to first page on sort
  };

  // Function to handle categorization click
  const handleCategoryFilter = (key) => {
    // If clicking the same filter key again, disable filter and revert to default sort
    if (filterConfig && filterConfig.key === key) {
      setFilterConfig(null);
      setSortConfig({ key: "waktuBikinRekber", direction: "descending" }); // Revert to default time sort
    } else {
      setFilterConfig({ key });
      setSortConfig(null); // Clear sorting when categorizing
    }
    setCurrentPage(1); // Reset to first page on filter
  };

  // Helper function to get status badge classes (with "huge fill" style)
  const getStatusRekberClass = (status) => {
    const baseClasses =
      "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold tracking-wide whitespace-nowrap";

    switch (status) {
      case "Dalam Pengiriman":
        return `${baseClasses} bg-yellow-500 text-white`;
      case "Pengembalian":
        return `${baseClasses} bg-red-500 text-white`;
      case "Barang Diterima Buyer":
        return `${baseClasses} bg-green-500 text-white`;
      case "Menunggu Pembayaran":
        return `${baseClasses} bg-blue-500 text-white`;
      case "Menunggu Resi":
        return `${baseClasses} bg-purple-500 text-white`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  // Helper function to get pengajuan status text color
  const getPengajuanTextColorClass = (status) => {
    switch (status) {
      case "Ditolak":
        return "text-red-700 font-semibold";
      case "Ditinjau":
        return "text-yellow-700 font-semibold";
      case "Menunggu Buyer":
        return "text-green-700 font-semibold";
      case "Tanpa Pengajuan":
        return "text-gray-200 font-medium";
      default:
        return "text-[#5c5c5c]";
    }
  };

  // Helper to get arrow icon and rotation
  const getArrowIcon = (key, type = "sort") => {
    if (type === "sort" && sortConfig && sortConfig.key === key) {
      return (
        <ChevronDownIcon
          className={`w-3 h-3 text-[#5c5c5c] transition-transform duration-200 ${
            sortConfig.direction === "ascending" ? "rotate-180" : ""
          }`}
        />
      );
    }
    if (type === "filter" && filterConfig && filterConfig.key === key) {
      return <ChevronDownIcon className="w-3 h-3 text-blue-500 rotate-180" />;
    }
    return <ChevronDownIcon className="w-3 h-3 text-[#5c5c5c]" />;
  };

  const navigate = useNavigate();
  const handleViewDetail = (id) => {
    navigate(`/transactions/${id}`);
  };

  const { setRekberCount } = useRekberStore();
  useEffect(() => {
    setRekberCount(initialRekberData.length);
  }, [initialRekberData]);

  return (
    <div className="flex w-full justify-center p-4">
      <div className="w-full max-w">
        {/* Component to display the total number of items */}
        <div className="relative w-full flex flex-row items-center justify-start gap-6 text-left text-black font-sf-pro mb-4">
          <div className="relative font-semibold text-lg sm:text-xl md:text-2xl lg:text-xl">
            Jumlah informasi yang ditampilkan
          </div>
          {/* Badge for the total content */}
          <div className="rounded-full bg-blue-500 overflow-hidden flex flex-row items-center justify-center py-1 px-5 gap-1 text-base text-white font-bold min-w-[60px]">
            <b className="relative leading-[22px]">
              {initialRekberData.length}
            </b>
          </div>
        </div>
        {/* End of component to display the total content */}

        <Table className="border-collapse border border-[#c9c9c9] w-full">
          <TableHeader>
            <TableRow className="bg-[#f3f3f3] border-b border-[#c9c9c9]">
              {/* Checkbox Column */}
              <TableHead className="w-[42px] h-[38px] p-0 border-r border-[#c9c9c9] min-w-[42px]">
                <div className="flex h-[38px] items-center justify-center">
                  <Checkbox
                    className="h-4 w-4 rounded border border-solid border-[#5c5c5c] bg-white cursor-pointer"
                    checked={selectAll}
                    onCheckedChange={handleHeaderCheckboxChange}
                  />
                </div>
              </TableHead>

              {/* ID Transaksi Column */}
              <TableHead className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[120px]">
                <div className="flex items-center justify-between w-full">
                  <span>ID Transaksi</span>
                </div>
              </TableHead>

              {/* Waktu Bikin Rekber Column - Clickable for Sorting */}
              <TableHead
                className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[180px]"
                onClick={() => handleSort("waktuBikinRekber")}
              >
                <div className="flex items-center justify-between w-full">
                  <span>Waktu Rekber</span>
                  {getArrowIcon("waktuBikinRekber", "sort")}
                </div>
              </TableHead>

              {/* Nama Barang Column */}
              <TableHead className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[200px]">
                <div className="flex items-center justify-between w-full">
                  <span>Nama Barang</span>
                </div>
              </TableHead>

              {/* Pembeli (Email) Column */}
              <TableHead className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[180px]">
                <div className="flex items-center justify-between w-full">
                  <span>Pembeli</span>
                </div>
              </TableHead>

              {/* Penjual (Email) Column */}
              <TableHead className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[180px]">
                <div className="flex items-center justify-between w-full">
                  <span>Penjual</span>
                </div>
              </TableHead>

              {/* Nominal Transaksi Column - Clickable for Sorting */}
              <TableHead
                className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[150px]"
                onClick={() => handleSort("nominalTransaksi")}
              >
                <div className="flex items-center justify-between w-full">
                  <span>Nominal Transaksi</span>
                  {getArrowIcon("nominalTransaksi", "sort")}
                </div>
              </TableHead>

              {/* Status Rekber Column - Clickable for Categorization */}
              <TableHead
                className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[160px]"
                onClick={() => handleCategoryFilter("statusRekber")}
              >
                <div className="flex items-center justify-between w-full">
                  <span>Status Rekber</span>
                  {getArrowIcon("statusRekber", "filter")}
                </div>
              </TableHead>

              {/* Kolom Pengajuan Column - Clickable for Categorization */}
              <TableHead
                className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[140px]"
                onClick={() => handleCategoryFilter("kolomPengajuan")}
              >
                <div className="flex items-center justify-between w-full">
                  <span>Pengajuan</span>
                  {getArrowIcon("kolomPengajuan", "filter")}
                </div>
              </TableHead>

              {/* Action Column */}
              <TableHead className="w-[52px] h-[38px] p-0 min-w-[52px]">
                <div className="flex h-[38px] items-center justify-center">
                  {/* Empty header for action column */}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentItems.map((item, index) => (
              <TableRow
                key={item.idTransaksi}
                className={`h-[38px] border-b border-[#c9c9c9] ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f3f3f3]"
                } hover:bg-[#e6f7ff]`}
              >
                {/* Checkbox Cell */}
                <TableCell className="w-[42px] p-0 border-r border-[#c9c9c9]">
                  <div className="flex h-[38px] items-center justify-center">
                    <Checkbox
                      className="h-4 w-4 rounded border border-solid border-[#5c5c5c] bg-white cursor-pointer"
                      checked={checkedItems[item.idTransaksi] || false}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(item.idTransaksi, checked)
                      }
                    />
                  </div>
                </TableCell>

                {/* ID Transaksi Cell */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-[0.8rem] sm:text-sm text-[#5c5c5c]">
                  {item.idTransaksi}
                </TableCell>

                {/* Waktu Bikin Rekber Cell */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-[0.8rem] sm:text-sm text-[#5c5c5c]">
                  {formatDateTimeForDisplay(item.waktuBikinRekber)}
                </TableCell>

                {/* Nama Barang Cell */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-[0.8rem] sm:text-sm text-[#5c5c5c]">
                  <div
                    className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[180px]"
                    title={item.namaBarang}
                  >
                    {item.namaBarang}
                  </div>
                </TableCell>

                {/* Pembeli (Email) Cell - Truncated */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-[0.8rem] sm:text-sm text-[#5c5c5c]">
                  <div
                    className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[180px]"
                    title={item.pembeliEmail}
                  >
                    {item.pembeliEmail}
                  </div>
                </TableCell>

                {/* Penjual (Email) Cell - Truncated */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-[0.8rem] sm:text-sm text-[#5c5c5c]">
                  <div
                    className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[180px]"
                    title={item.penjualEmail}
                  >
                    {item.penjualEmail}
                  </div>
                </TableCell>

                {/* Nominal Transaksi Cell - Difomat dengan titik ribuan */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-[0.8rem] sm:text-sm text-[#5c5c5c]">
                  Rp.{" "}
                  {item.nominalTransaksi.toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>

                {/* Status Rekber Cell - With Dynamic Color and "Huge Fill" Badge */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]">
                  <span className={getStatusRekberClass(item.statusRekber)}>
                    {item.statusRekber}
                  </span>
                </TableCell>

                {/* Kolom Pengajuan Cell - With Conditional Text Color */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-[0.8rem] sm:text-sm text-[#5c5c5c]">
                  <span
                    className={`inline-flex items-center justify-center rounded-full text-xs font-medium px-2.5 py-0.5 ${getPengajuanTextColorClass(
                      item.kolomPengajuan
                    )}`}
                  >
                    {item.kolomPengajuan}
                  </span>
                </TableCell>

                {/* Action Cell */}
                <TableCell className="w-[52px] p-0">
                  <div className="flex h-[38px] items-center justify-center">
                    <ArrowRightIcon
                      className="w-4 h-4 text-[#5c5c5c] cursor-pointer hover:text-blue-600 transition"
                      onClick={() => handleViewDetail(item.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-end items-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-[#c9c9c9] rounded text-sm text-[#5c5c5c] bg-white hover:bg-[#e6f7ff] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 border border-[#c9c9c9] rounded text-sm ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-[#5c5c5c] hover:bg-[#e6f7ff]"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-[#c9c9c9] rounded text-sm text-[#5c5c5c] bg-white hover:bg-[#e6f7ff] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTableRekber;
