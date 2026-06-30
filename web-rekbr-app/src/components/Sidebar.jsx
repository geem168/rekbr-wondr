import { Link, useLocation } from "react-router-dom";
import { UsersRound, Activity, Shuffle, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const renderNavItem = (path, icon, label, badgeCount) => {
    const isActive = location.pathname === path;

    if (isActive) {
      return (
        <div className='w-full h-9 flex items-center justify-start py-2 pl-8 pr-6 gap-2 bg-[#d6e6ff] border-l-[4px] border-[#066afe] text-[13px] text-darkblue font-sf-pro font-semibold'>
          <div className='w-4 h-4'>{icon}</div>
          <div className='flex-1 leading-[18px]'>{label}</div>
          {badgeCount !== undefined && (
            <div className='rounded bg-[#e5e5e5] h-[20px] flex items-center justify-center py-0.5 px-2 text-xs text-[#5c5c5c]'>
              <div className='relative leading-[17px]'>{badgeCount}</div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <Link
          to={path}
          className='flex items-center gap-3 px-6 py-3 rounded-[8px] transition text-dimgray hover:bg-gainsboro'
        >
          <div className='w-5 h-5'>{icon}</div>
          <div className='text-[13px] leading-[18px] font-sf-pro'>{label}</div>
          {badgeCount !== undefined && (
            <div className='rounded bg-[#e5e5e5] h-[20px] flex items-center justify-center py-0.5 px-2 text-[11px] text-dimgray ml-auto'>
              <div className='relative leading-[17px]'>{badgeCount}</div>
            </div>
          )}
        </Link>
      );
    }
  };

  return (
    <div className='w-64 h-screen bg-white flex flex-col py-6 rounded-[10px] shadow-[4px_0px_10px_rgba(0,0,0,0.1)] items-center justify-between'>
      {/* Top Section: Logo & Nav */}
      <div className='w-full'>
        {/* Logo */}
        <div className='flex items-center justify-center mb-8'>
          <img src='/logoRekbar-sidebar.png' alt='Logo' />
        </div>

        {/* Navigation */}
        <nav className='flex flex-col gap-2 text-[12px] font-sf-pro w-full'>
          <b className='px-6 mb-1 text-base text-darkslateblue'>
            Manajemen Pengguna
          </b>
          {renderNavItem(
            "/users",
            <UsersRound className='w-4 h-4 stroke-current' />,
            "User"
          )}

          <b className='px-6 mt-4 mb-1 text-base text-darkslateblue'>
            Manajemen Rekber
          </b>
          {renderNavItem(
            "/transactions",
            <Activity className='w-4 h-4 stroke-current' />,
            "Transaksi"
          )}

          <b className='px-6 mt-4 mb-1 text-base text-darkslateblue'>
            Manajemen Komplain
          </b>
          {renderNavItem(
            "/barang-hilang",
            <Shuffle className='w-4 h-4 stroke-current' />,
            "Barang Hilang"
          )}
          {renderNavItem(
            "/barang-rusak",
            <Shuffle className='w-4 h-4 stroke-current' />,
            "Barang Rusak"
          )}
          {/* {renderNavItem(
            "/barang-ga-sesuai",
            <Shuffle className="w-4 h-4 stroke-current" />,
            "Barang Ga Sesuai"
          )} */}
        </nav>
      </div>

      {/* Bottom Section: Logout */}
      <div className='w-full px-6 mt-6'>
        <button
          onClick={handleLogout}
          className='w-full flex cursor-pointer items-center gap-2 text-sm px-4 py-2 rounded-[8px] bg-red-100 text-red-700 hover:bg-red-200 transition'
        >
          <LogOut className='w-4 h-4' />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
