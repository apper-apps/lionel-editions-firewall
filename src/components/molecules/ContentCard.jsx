import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";

const ContentCard = ({ content }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(content);
    toast.success(`${content.title} ajouté au panier !`);
  };

  const handleCardClick = () => {
    navigate(`/content/${content.Id}`);
  };

  const typeIcons = {
    ebook: "BookOpen",
    video: "Play",
    audio: "Headphones",
    course: "GraduationCap"
  };

  const formatPrice = (price) => {
    return `${price}€`;
  };

  return (
    <Card hover onClick={handleCardClick} className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 bg-gradient-to-br from-secondary-100 to-primary-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <ApperIcon 
              name={typeIcons[content.type]} 
              className="w-8 h-8 text-primary-600" 
            />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <Badge variant={content.type}>
            {content.type === "ebook" && "E-Book"}
            {content.type === "video" && "Vidéo"}
            {content.type === "audio" && "Audio"}
            {content.type === "course" && "Cours"}
          </Badge>
        </div>
        {content.duration && (
          <div className="absolute top-4 right-4">
            <Badge variant="secondary">
              {content.duration}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold text-warm-gray-900 mb-2 line-clamp-2">
            {content.title}
          </h3>
          
          <p className="text-warm-gray-600 text-sm mb-3 line-clamp-2">
            Par {content.author}
          </p>
          
          <p className="text-warm-gray-500 text-sm line-clamp-3 mb-4">
            {content.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="text-xl font-bold gradient-text">
            {formatPrice(content.price)}
          </div>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isInCart(content.Id)}
            className={isInCart(content.Id) ? "opacity-50" : ""}
          >
            {isInCart(content.Id) ? (
              <>
                <ApperIcon name="Check" className="w-4 h-4 mr-2" />
                Ajouté
              </>
            ) : (
              <>
                <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-2" />
                Ajouter
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ContentCard;