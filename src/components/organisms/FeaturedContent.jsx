import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { contentService } from "@/services/api/contentService";

const FeaturedContent = () => {
  const [featuredContent, setFeaturedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    try {
      setLoading(true);
      const allContent = await contentService.getAll();
      // Get first 3 items as featured
      setFeaturedContent(allContent.slice(0, 3));
    } catch (error) {
      console.error("Error loading featured content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewContent = (contentId) => {
    navigate(`/content/${contentId}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-64 bg-secondary-200 rounded-xl mb-4"></div>
            <div className="h-4 bg-secondary-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredContent.map((content, index) => (
        <Card 
          key={content.Id} 
          variant="golden" 
          hover
          onClick={() => handleViewContent(content.Id)}
          className="overflow-hidden relative"
        >
          {index === 0 && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="primary">
                <ApperIcon name="Star" className="w-3 h-3 mr-1" />
                Vedette
              </Badge>
            </div>
          )}
          
          <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ApperIcon 
                  name={content.type === "ebook" ? "BookOpen" : 
                       content.type === "video" ? "Play" :
                       content.type === "audio" ? "Headphones" : "GraduationCap"} 
                  className="w-10 h-10 text-primary-600" 
                />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <Badge variant={content.type} className="mb-3">
              {content.type === "ebook" && "E-Book"}
              {content.type === "video" && "Vidéo"}
              {content.type === "audio" && "Audio"}
              {content.type === "course" && "Cours"}
            </Badge>
            
            <h3 className="font-display text-lg font-semibold text-warm-gray-900 mb-2 line-clamp-2">
              {content.title}
            </h3>
            
            <p className="text-warm-gray-600 text-sm mb-4 line-clamp-2">
              Par {content.author}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold gradient-text">
                {content.price}€
              </div>
              
              <Button size="sm">
                <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
                Voir
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedContent;