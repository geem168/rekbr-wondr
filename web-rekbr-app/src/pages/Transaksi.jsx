import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/BreadCrumb";
import { getAllTransactions } from "../services/transaksi.service";
import TransactionFilters from "../components/TransactionFilters";
import TransactionTable from "../components/TransactionTable";
import { useDebounce } from "use-debounce";

const TransaksiPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedFundStatus, setSelectedFundStatus] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [transactions, setTransactions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  const [debouncedSearch] = useDebounce(searchQuery, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedStatus, selectedFundStatus, selectedDateRange]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedStatus([]);
    setSelectedFundStatus("");
    setSelectedDateRange([null, null]);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const [start, end] = selectedDateRange;
        const createdFrom = start
          ? new Date(start.setHours(0, 0, 0, 0)).toISOString()
          : undefined;
        const createdTo = end
          ? new Date(end.setHours(23, 59, 59, 999)).toISOString()
          : undefined;

        const data = await getAllTransactions({
          page: currentPage,
          limit: itemsPerPage,
          search: debouncedSearch,
          status: selectedStatus.length > 0 ? selectedStatus : undefined,
          fundReleaseStatus: selectedFundStatus,
          createdFrom,
          createdTo,
        });

        setTransactions(data.data);
        setTotalCount(data.meta.totalCount);
      } catch (err) {
        console.error("Gagal ambil data transaksi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [
    debouncedSearch,
    selectedStatus,
    selectedFundStatus,
    selectedDateRange,
    currentPage,
  ]);

  return (
    <div className='w-full'>
      <Breadcrumb />
      <TransactionFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedFundStatus={selectedFundStatus}
        onFundStatusChange={setSelectedFundStatus}
        selectedDateRange={selectedDateRange}
        onDateChange={setSelectedDateRange}
        onResetFilters={handleResetFilters}
        loading={loading}
      />
      <TransactionTable
        transactions={transactions}
        loading={loading}
        currentPage={currentPage}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TransaksiPage;
