import React from "react";
import Badge from "@/components/atoms/Badge";

const FilterBar = ({ 
  categories = [], 
  selectedCategory, 
  onCategoryChange, 
  contentTypes = [],
  selectedType,
  onTypeChange 
}) => {
  return (
    <div className="space-y-4">
      {categories.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-warm-gray-700 mb-2">Catégories</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange("")}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "" 
                  ? "bg-primary-500 text-white" 
                  : "bg-warm-gray-100 text-warm-gray-700 hover:bg-warm-gray-200"
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? "bg-primary-500 text-white" 
                    : "bg-warm-gray-100 text-warm-gray-700 hover:bg-warm-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {contentTypes.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-warm-gray-700 mb-2">Types de contenu</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onTypeChange("")}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === "" 
                  ? "bg-primary-500 text-white" 
                  : "bg-warm-gray-100 text-warm-gray-700 hover:bg-warm-gray-200"
              }`}
            >
              Tous
            </button>
            {contentTypes.map((type) => (
              <button
                key={type}
                onClick={() => onTypeChange(type)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === type 
                    ? "bg-primary-500 text-white" 
                    : "bg-warm-gray-100 text-warm-gray-700 hover:bg-warm-gray-200"
                }`}
              >
                {type === "ebook" && "E-Books"}
                {type === "video" && "Vidéos"}
                {type === "audio" && "Audios"}
                {type === "course" && "Cours"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;