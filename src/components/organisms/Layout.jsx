import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import BottomNavigation from "@/components/organisms/BottomNavigation";
import DownloadManager from "@/components/organisms/DownloadManager";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pb-20"> {/* Bottom padding for mobile navigation */}
        <Outlet />
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
      
      {/* Download Manager */}
      <DownloadManager />
    </div>
  );
};

export default Layout;