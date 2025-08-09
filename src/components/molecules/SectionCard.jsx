import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const SectionCard = ({ section }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/section/${section.id}`);
  };

  return (
    <Card 
      hover 
      onClick={handleClick} 
      className="p-8 text-center bg-gradient-to-br from-white via-secondary-50 to-primary-50"
    >
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center">
        <ApperIcon 
          name={section.icon} 
          className="w-10 h-10 text-white" 
        />
      </div>
      
      <h3 className="font-display text-xl font-semibold text-warm-gray-900 mb-3">
        {section.title}
      </h3>
      
      <p className="text-warm-gray-600 mb-6 leading-relaxed">
        {section.description}
      </p>
      
      <div className="inline-flex items-center text-primary-600 font-medium group">
        <span className="mr-2">Explorer</span>
        <ApperIcon 
          name="ArrowRight" 
          className="w-4 h-4 transition-transform group-hover:translate-x-1" 
        />
      </div>
    </Card>
  );
};

export default SectionCard;