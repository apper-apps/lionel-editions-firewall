import React from "react";

const Loading = ({ type = "cards" }) => {
  if (type === "skeleton") {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-secondary-200 rounded-lg mb-4"></div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-soft">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-secondary-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                  <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
                </div>
                <div className="w-16 h-6 bg-primary-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-soft overflow-hidden animate-pulse">
            <div className="h-48 bg-secondary-200"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
              <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-primary-200 rounded w-16"></div>
                <div className="h-8 bg-secondary-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-secondary-200"></div>
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
      </div>
      <div className="text-warm-gray-500 font-medium">Chargement...</div>
    </div>
  );
};

export default Loading;