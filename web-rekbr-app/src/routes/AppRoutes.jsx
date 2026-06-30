import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import User from "../pages/User";
import BarangHilangPage from "../pages/BarangHilangPage";
import DetailBarangHilangPage from "../pages/DetailBarangHilangPage";
import BarangRusakPage from "../pages/BarangRusakPage";
import DetailBarangRusakPage from "../pages/DetailBarangRusakPage";
import BarangGaSesuaiPage from "../pages/BarangGaSesuaiPage";
import DetailBarangGaSesuaiPage from "../pages/DetailBarangGaSesuaiPage";
import Transaksi from "../pages/Transaksi";
import Login from "../pages/Login";
import RekberDetailPage from "../pages/RekberDetailPage";
import ProtectedRoute from "./ProtectedRoute"; // tambahkan ini
import { UserDetail } from "../pages/UserDetail";
import PublicRoute from "./PublicRoute";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route path='*' element={<NotFound />} />

      <Route
        path='/users'
        element={
          <ProtectedRoute>
            <MainLayout>
              <User />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/users/:usersId'
        element={
          <ProtectedRoute>
            <MainLayout>
              <UserDetail />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route path='/' element={<Login />} />

      <Route
        path='/transactions'
        element={
          <ProtectedRoute>
            <MainLayout>
              <Transaksi />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/transactions/:transactionId'
        element={
          <ProtectedRoute>
            <MainLayout>
              <RekberDetailPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/barang-hilang'
        element={
          <ProtectedRoute>
            <MainLayout>
              <BarangHilangPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/barang-hilang/:id'
        element={
          <ProtectedRoute>
            <MainLayout>
              <DetailBarangHilangPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/barang-rusak'
        element={
          <ProtectedRoute>
            <MainLayout>
              <BarangRusakPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/barang-rusak/:id'
        element={
          <ProtectedRoute>
            <MainLayout>
              <DetailBarangRusakPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/barang-ga-sesuai'
        element={
          <ProtectedRoute>
            <MainLayout>
              <BarangGaSesuaiPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/barang-ga-sesuai/:id'
        element={
          <ProtectedRoute>
            <MainLayout>
              <DetailBarangGaSesuaiPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
