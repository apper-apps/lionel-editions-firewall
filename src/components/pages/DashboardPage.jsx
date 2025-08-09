import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contentService } from "@/services/api/contentService";
import { useWishlist } from "@/hooks/useWishlist";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
const DashboardPage = () => {
  const navigate = useNavigate();
const { wishlistCount } = useWishlist();
  const [purchasedContent, setPurchasedContent] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    totalPurchases: 0,
    completedContent: 0,
    hoursLearned: 0,
    currentStreak: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Simulate purchased content (first 6 items)
      const allContent = await contentService.getAll();
      const purchased = allContent.slice(0, 6);
      setPurchasedContent(purchased);

      // Simulate recent activity including wishlist
      const activities = [
        {
          id: 1,
          type: "purchase",
          title: "Nouveau contenu acheté",
          description: purchased[0]?.title || "Contenu premium",
          time: "Il y a 2 heures",
          icon: "ShoppingCart"
        },
        {
          id: 2,
          type: "wishlist",
          title: "Ajouté aux favoris",
          description: "3 nouveaux contenus dans vos favoris",
          time: "Il y a 4 heures",
          icon: "Heart"
        },
        {
          id: 3,
          type: "completion",
          title: "Contenu terminé",
          description: purchased[1]?.title || "Formation complétée",
          time: "Hier",
          icon: "CheckCircle"
        },
        {
          id: 4,
          type: "milestone",
          title: "Objectif atteint",
          description: "5 heures d'apprentissage cette semaine",
          time: "Il y a 3 jours",
          icon: "Trophy"
        }
      ];
      setRecentActivity(activities);

      // Simulate stats
      setStats({
        totalPurchases: purchased.length,
        completedContent: Math.floor(purchased.length * 0.6),
        hoursLearned: 47,
        currentStreak: 12
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContentClick = (contentId) => {
    navigate(`/content/${contentId}`);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 gradient-gold rounded-lg flex items-center justify-center mr-4">
                <ApperIcon name="User" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-warm-gray-900">
                  Mon Espace Personnel
                </h1>
                <p className="text-warm-gray-600 mt-2">
                  Suivez vos progrès et accédez à vos contenus
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="ShoppingBag" className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">
                {stats.totalPurchases}
              </div>
              <p className="text-sm text-warm-gray-600">Contenus achetés</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="CheckCircle" className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">
                {stats.completedContent}
              </div>
              <p className="text-sm text-warm-gray-600">Terminés</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Clock" className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">
                {stats.hoursLearned}h
              </div>
              <p className="text-sm text-warm-gray-600">Temps d'étude</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Zap" className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">
                {stats.currentStreak}
              </div>
              <p className="text-sm text-warm-gray-600">Jours consécutifs</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* My Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold text-warm-gray-900">
                  Mes Contenus
                </h2>
                <Button variant="ghost" onClick={() => navigate("/")}>
                  <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                  Ajouter du contenu
                </Button>
              </div>

              {purchasedContent.length === 0 ? (
                <Empty
                  title="Aucun contenu acheté"
                  description="Découvrez notre catalogue et commencez votre apprentissage"
                  icon="BookOpen"
                  actionLabel="Explorer le catalogue"
                  onAction={() => navigate("/")}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {purchasedContent.map((content) => (
                    <Card 
                      key={content.Id} 
                      hover 
                      onClick={() => handleContentClick(content.Id)}
                      className="overflow-hidden"
                    >
                      <div className="h-32 bg-gradient-to-br from-secondary-100 to-primary-100 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ApperIcon 
                            name={typeIcons[content.type]} 
                            className="w-10 h-10 text-primary-600" 
                          />
                        </div>
                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/20 h-1">
                          <div 
                            className="h-full bg-primary-500 transition-all duration-500"
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <Badge variant={content.type} className="mb-2">
                          {content.type === "ebook" && "E-Book"}
                          {content.type === "video" && "Vidéo"}
                          {content.type === "audio" && "Audio"}
                          {content.type === "course" && "Cours"}
                        </Badge>
                        
                        <h3 className="font-medium text-warm-gray-900 mb-1 line-clamp-2">
                          {content.title}
                        </h3>
                        
                        <p className="text-sm text-warm-gray-600 mb-3">
                          Par {content.author}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-warm-gray-500">
                            {Math.floor(Math.random() * 100)}% terminé
                          </span>
                          <Button size="sm" variant="ghost">
                            Continuer
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-warm-gray-900 mb-6">
                Activité Récente
              </h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <Card key={activity.id} className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ApperIcon 
                          name={activity.icon} 
                          className="w-5 h-5 text-primary-600" 
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-warm-gray-900">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-warm-gray-600 truncate">
                          {activity.description}
                        </p>
                        <p className="text-xs text-warm-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
<Card variant="golden" className="p-6 mt-8">
                <h3 className="font-display text-lg font-semibold text-warm-gray-900 mb-4">
                  Actions Rapides
                </h3>
                
                <div className="space-y-3">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => navigate("/search")}
                  >
                    <ApperIcon name="Search" className="w-4 h-4 mr-2" />
                    Rechercher du contenu
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full justify-start relative"
                    onClick={() => navigate("/wishlist")}
                  >
                    <ApperIcon name="Heart" className="w-4 h-4 mr-2" />
                    Mes Favoris
                    {wishlistCount > 0 && (
                      <span className="absolute right-3 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => navigate("/cart")}
                  >
                    <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-2" />
                    Voir mon panier
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => navigate("/")}
                  >
                    <ApperIcon name="Home" className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                  </Button>
                </div>
              </Card>
            </div>
          </div>
</div>
      </div>
    </div>
  );
};

export default DashboardPage;