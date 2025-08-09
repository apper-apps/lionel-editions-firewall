import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "Aucun contenu trouvé", 
  description = "Nous n'avons trouvé aucun contenu correspondant à vos critères.",
  icon = "Search",
  actionLabel,
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-primary-500" />
      </div>
      
      <h3 className="text-2xl font-semibold text-warm-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-warm-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          size="lg"
          className="inline-flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          <span>{actionLabel}</span>
        </Button>
      )}
    </div>
  );
};

export default Empty;