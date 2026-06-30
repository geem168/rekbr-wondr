// pages/UserPage.jsx
import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/BreadCrumb";
import { getAllUsers } from "../services/user.service";
import UserFilters from "../components/UserFilters";
import UserTable from "../components/UserTable";
import { useDebounce } from "use-debounce";

const UserPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("");
    setSelectedDateRange([null, null]);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const [start, end] = selectedDateRange;
        const createdFrom = start
          ? new Date(start.setHours(0, 0, 0, 0)).toISOString()
          : undefined;
        const createdTo = end
          ? new Date(end.setHours(23, 59, 59, 999)).toISOString()
          : undefined;

        const data = await getAllUsers({
          page: currentPage,
          limit: itemsPerPage,
          search: debouncedSearch,
          kycStatus: selectedStatus,
          createdFrom,
          createdTo,
        });

        setUsers(data.data);
        setTotalCount(data.meta.totalCount);
      } catch (err) {
        console.error("Gagal ambil data user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearch, selectedStatus, selectedDateRange, currentPage]);

  return (
    <div className='w-full'>
      <Breadcrumb />
      <UserFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedDateRange={selectedDateRange}
        onDateChange={setSelectedDateRange}
        onResetFilters={handleResetFilters}
        loading={loading}
      />
      <UserTable
        users={users}
        loading={loading}
        currentPage={currentPage}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserPage;
