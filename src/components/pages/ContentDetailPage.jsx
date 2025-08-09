import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { contentService } from "@/services/api/contentService";
import { useCart } from "@/hooks/useCart";

const ContentDetailPage = () => {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [relatedContent, setRelatedContent] = useState([]);
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    loadContent();
  }, [contentId]);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError("");
      const contentData = await contentService.getById(parseInt(contentId));
      setContent(contentData);

      // Load related content
      const allContent = await contentService.getAll();
      const related = allContent
        .filter(c => c.Id !== parseInt(contentId) && c.section === contentData.section)
        .slice(0, 3);
      setRelatedContent(related);
    } catch (err) {
      setError("Contenu non trouvé");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(content);
    toast.success(`${content.title} ajouté au panier !`);
  };

  const handleBuyNow = () => {
    addToCart(content);
    navigate("/cart");
  };

  const handleRetry = () => {
    loadContent();
  };

  const typeIcons = {
    ebook: "BookOpen",
    video: "Play",
    audio: "Headphones", 
    course: "GraduationCap"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <Loading type="skeleton" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <Error message={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Back Button */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>

      {/* Content Details */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="p-8 mb-8">
                {/* Content Header */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-secondary-100 to-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ApperIcon 
                      name={typeIcons[content.type]} 
                      className="w-16 h-16 text-primary-600" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge variant={content.type}>
                        {content.type === "ebook" && "E-Book"}
                        {content.type === "video" && "Vidéo"}
                        {content.type === "audio" && "Audio"}
                        {content.type === "course" && "Cours"}
                      </Badge>
                      {content.duration && (
                        <Badge variant="secondary">{content.duration}</Badge>
                      )}
                      <Badge variant="primary">{content.category}</Badge>
                    </div>
                    
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-warm-gray-900 mb-4">
                      {content.title}
                    </h1>
                    
                    <div className="flex items-center text-warm-gray-600 mb-6">
                      <ApperIcon name="User" className="w-5 h-5 mr-2" />
                      <span className="text-lg">Par {content.author}</span>
                    </div>
                    
                    <div className="text-3xl font-bold gradient-text">
                      {content.price}€
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="font-display text-2xl font-semibold text-warm-gray-900 mb-4">
                    Description
                  </h2>
                  <p className="text-warm-gray-700 leading-relaxed text-lg">
                    {content.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="font-display text-xl font-semibold text-warm-gray-900 mb-4">
                    Ce que vous obtiendrez
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <ApperIcon name="Check" className="w-5 h-5 text-green-600 mr-3" />
                      <span>Accès à vie au contenu</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Check" className="w-5 h-5 text-green-600 mr-3" />
                      <span>Support client dédié</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Check" className="w-5 h-5 text-green-600 mr-3" />
                      <span>Mises à jour gratuites</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Check" className="w-5 h-5 text-green-600 mr-3" />
                      <span>Compatible mobile</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Purchase Card */}
              <Card variant="golden" className="p-6 mb-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {content.price}€
                  </div>
                  <p className="text-warm-gray-600">Prix unique, accès à vie</p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    size="lg"
                    onClick={handleBuyNow}
                    className="w-full"
                    disabled={isInCart(content.Id)}
                  >
                    <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2" />
                    {isInCart(content.Id) ? "Déjà dans le panier" : "Acheter maintenant"}
                  </Button>
                  
                  {!isInCart(content.Id) && (
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={handleAddToCart}
                      className="w-full"
                    >
                      <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
                      Ajouter au panier
                    </Button>
                  )}
                </div>

                <div className="flex items-center justify-center text-sm text-warm-gray-500">
                  <ApperIcon name="Shield" className="w-4 h-4 mr-2" />
                  Paiement 100% sécurisé
                </div>
              </Card>

              {/* Preview */}
              <Card className="p-6">
                <h3 className="font-display text-lg font-semibold text-warm-gray-900 mb-4">
                  Aperçu gratuit
                </h3>
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Button variant="secondary">
                    <ApperIcon name="Play" className="w-5 h-5 mr-2" />
                    Voir l'aperçu
                  </Button>
                </div>
                <p className="text-sm text-warm-gray-600">
                  Découvrez un extrait de ce contenu avant de l'acheter
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Content */}
      {relatedContent.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-warm-gray-900 mb-8">
              Contenus similaires
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedContent.map((item) => (
                <Card 
                  key={item.Id} 
                  hover 
                  onClick={() => navigate(`/content/${item.Id}`)}
                  className="overflow-hidden"
                >
                  <div className="h-40 bg-gradient-to-br from-secondary-100 to-primary-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ApperIcon 
                        name={typeIcons[item.type]} 
                        className="w-10 h-10 text-primary-600" 
                      />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <Badge variant={item.type} className="mb-2">
                      {item.type === "ebook" && "E-Book"}
                      {item.type === "video" && "Vidéo"}
                      {item.type === "audio" && "Audio"}
                      {item.type === "course" && "Cours"}
                    </Badge>
                    
                    <h3 className="font-medium text-warm-gray-900 mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-warm-gray-600 mb-3">
                      Par {item.author}
                    </p>
                    
                    <div className="text-lg font-bold gradient-text">
                      {item.price}€
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ContentDetailPage;