import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import HomePage from "@/components/pages/HomePage";
import SectionPage from "@/components/pages/SectionPage";
import ContentDetailPage from "@/components/pages/ContentDetailPage";
import CartPage from "@/components/pages/CartPage";
import DashboardPage from "@/components/pages/DashboardPage";
import SearchPage from "@/components/pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="section/:sectionId" element={<SectionPage />} />
            <Route path="content/:contentId" element={<ContentDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-50"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;