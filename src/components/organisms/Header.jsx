import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import { useCart } from "@/hooks/useCart";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const isSearchPage = location.pathname === "/search";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-warm-gray-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 gradient-gold rounded-lg flex items-center justify-center group-hover:shadow-golden transition-all duration-200">
              <ApperIcon name="BookOpen" className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-xl font-bold text-warm-gray-900">
                Lionel Éditions
              </h1>
              <p className="text-xs text-warm-gray-500">Le Savoir Mobile</p>
            </div>
          </button>

          {/* Search Bar - Hidden on mobile, shown on larger screens */}
          {!isSearchPage && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar placeholder="Rechercher des contenus..." />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            {!isSearchPage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/search")}
                className="md:hidden"
              >
                <ApperIcon name="Search" className="w-5 h-5" />
              </Button>
            )}

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/cart")}
              className="relative"
            >
              <ApperIcon name="ShoppingCart" className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Dashboard Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ApperIcon name="User" className="w-5 h-5" />
              <span className="hidden sm:inline ml-2">Mon Espace</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;