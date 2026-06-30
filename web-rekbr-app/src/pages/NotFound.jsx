import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-6xl font-bold text-blue-600 mb-4'>404</h1>
      <p className='text-xl text-gray-700 mb-6'>Halaman tidak ditemukan</p>
      <Link
        to='/users'
        className='px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
