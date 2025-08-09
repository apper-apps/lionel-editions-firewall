import React from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  const handleRemove = () => {
    removeFromCart(item.Id);
  };

  const typeIcons = {
    ebook: "BookOpen",
    video: "Play", 
    audio: "Headphones",
    course: "GraduationCap"
  };

  return (
    <Card className="p-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <ApperIcon 
            name={typeIcons[item.type]} 
            className="w-8 h-8 text-primary-600" 
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-warm-gray-900 truncate">
                {item.title}
              </h4>
              <p className="text-sm text-warm-gray-500 truncate">
                Par {item.author}
              </p>
              <div className="mt-2">
                <Badge variant={item.type}>
                  {item.type === "ebook" && "E-Book"}
                  {item.type === "video" && "Vidéo"}
                  {item.type === "audio" && "Audio"}
                  {item.type === "course" && "Cours"}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 ml-4">
              <div className="text-lg font-bold gradient-text">
                {item.price}€
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;