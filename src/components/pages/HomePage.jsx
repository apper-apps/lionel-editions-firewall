import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import FeaturedContent from "@/components/organisms/FeaturedContent";

const HomePage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "boutique",
      title: "Boutique d'eBooks",
      description: "Découvrez notre collection exclusive d'eBooks dans tous les domaines",
      icon: "BookOpen",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: "academie",
      title: "Académie Digitale",
      description: "Formations en ligne et cours interactifs pour développer vos compétences",
      icon: "GraduationCap",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: "coach",
      title: "Coach Perso",
      description: "Accompagnement personnalisé pour atteindre vos objectifs",
      icon: "Users",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: "bienetre",
      title: "Bien-Être & Santé",
      description: "Ressources pour votre équilibre physique et mental",
      icon: "Heart",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      id: "business",
      title: "Business Booster",
      description: "Outils et stratégies pour développer votre entreprise",
      icon: "Briefcase",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  const handleSectionClick = (sectionId) => {
    navigate(`/section/${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-warm-gray-900 mb-6">
              Votre{" "}
              <span className="gradient-text">Savoir Mobile</span>
            </h1>
            <p className="text-xl md:text-2xl text-warm-gray-600 max-w-3xl mx-auto leading-relaxed">
              Accédez à une bibliothèque complète de contenus éducatifs premium pour développer vos compétences et transformer votre vie
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="xl" onClick={() => navigate("/section/boutique")}>
              <ApperIcon name="BookOpen" className="w-6 h-6 mr-2" />
              Explorer la Boutique
            </Button>
            <Button variant="secondary" size="xl" onClick={() => navigate("/dashboard")}>
              <ApperIcon name="User" className="w-6 h-6 mr-2" />
              Mon Espace
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-gray-900 mb-4">
              Contenus Vedettes
            </h2>
            <p className="text-lg text-warm-gray-600 max-w-2xl mx-auto">
              Découvrez nos contenus les plus populaires sélectionnés spécialement pour vous
            </p>
          </div>
          <FeaturedContent />
        </div>
      </section>

      {/* Sections Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-gray-900 mb-4">
              Nos Sections
            </h2>
            <p className="text-lg text-warm-gray-600 max-w-2xl mx-auto">
              Explorez nos différentes catégories de contenus pour trouver exactement ce que vous cherchez
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => (
              <Card
                key={section.id}
                hover
                onClick={() => handleSectionClick(section.id)}
                className="p-8 text-center bg-gradient-to-br from-white via-secondary-50 to-primary-50"
              >
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${section.gradient} rounded-full flex items-center justify-center`}>
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
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <Card variant="golden" className="p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-warm-gray-900 mb-8">
              Pourquoi Choisir Lionel Éditions ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">1000+</div>
                <p className="text-warm-gray-600">Contenus Premium</p>
              </div>
              
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">50k+</div>
                <p className="text-warm-gray-600">Utilisateurs Actifs</p>
              </div>
              
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">4.9/5</div>
                <p className="text-warm-gray-600">Note Moyenne</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;