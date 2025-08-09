import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: "boutique",
      label: "Boutique",
      icon: "BookOpen",
      path: "/section/boutique"
    },
    {
      id: "academie", 
      label: "Académie",
      icon: "GraduationCap",
      path: "/section/academie"
    },
    {
      id: "coach",
      label: "Coach",
      icon: "Users",
      path: "/section/coach"
    },
    {
      id: "bienetre",
      label: "Bien-Être",
      icon: "Heart",
      path: "/section/bienetre"
    },
    {
      id: "business",
      label: "Business",
      icon: "Briefcase", 
      path: "/section/business"
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-warm-gray-200 mobile-safe-area">
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (location.pathname === "/" && item.id === "boutique");
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-primary-600 bg-primary-50" 
                  : "text-warm-gray-400 hover:text-warm-gray-600"
              )}
            >
              <div className={cn(
                "w-6 h-6 mb-1 transition-all duration-200",
                isActive && "scale-110"
              )}>
                <ApperIcon 
                  name={item.icon} 
                  className="w-full h-full"
                />
              </div>
              <span className={cn(
                "text-xs font-medium truncate",
                isActive ? "text-primary-600" : "text-warm-gray-500"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;