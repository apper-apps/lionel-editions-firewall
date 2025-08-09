import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "@/components/molecules/SearchBar";
import FilterBar from "@/components/molecules/FilterBar";
import ContentGrid from "@/components/organisms/ContentGrid";
import ApperIcon from "@/components/ApperIcon";
import { contentService } from "@/services/api/contentService";

const SectionPage = () => {
  const { sectionId } = useParams();
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [categories, setCategories] = useState([]);
  const [contentTypes, setContentTypes] = useState([]);

  const sectionTitles = {
    boutique: "Boutique d'eBooks",
    academie: "Académie Digitale",
    coach: "Coach Perso",
    bienetre: "Bien-Être & Santé",
    business: "Business Booster"
  };

  const sectionIcons = {
    boutique: "BookOpen",
    academie: "GraduationCap", 
    coach: "Users",
    bienetre: "Heart",
    business: "Briefcase"
  };

  const sectionDescriptions = {
    boutique: "Découvrez notre collection exclusive d'eBooks dans tous les domaines",
    academie: "Formations en ligne et cours interactifs pour développer vos compétences",
    coach: "Accompagnement personnalisé pour atteindre vos objectifs",
    bienetre: "Ressources pour votre équilibre physique et mental",
    business: "Outils et stratégies pour développer votre entreprise"
  };

  useEffect(() => {
    loadContents();
  }, [sectionId]);

  useEffect(() => {
    filterContents();
  }, [contents, searchQuery, selectedCategory, selectedType]);

  const loadContents = async () => {
    try {
      setLoading(true);
      setError("");
      const allContents = await contentService.getAll();
      const sectionContents = allContents.filter(content => content.section === sectionId);
      setContents(sectionContents);

      // Extract unique categories and types
      const uniqueCategories = [...new Set(sectionContents.map(c => c.category))];
      const uniqueTypes = [...new Set(sectionContents.map(c => c.type))];
      setCategories(uniqueCategories);
      setContentTypes(uniqueTypes);
    } catch (err) {
      setError("Erreur lors du chargement des contenus");
    } finally {
      setLoading(false);
    }
  };

  const filterContents = () => {
    let filtered = [...contents];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(content => content.category === selectedCategory);
    }

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter(content => content.type === selectedType);
    }

    setFilteredContents(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRetry = () => {
    loadContents();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 gradient-gold rounded-lg flex items-center justify-center mr-4">
              <ApperIcon 
                name={sectionIcons[sectionId]} 
                className="w-6 h-6 text-white" 
              />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-warm-gray-900">
                {sectionTitles[sectionId]}
              </h1>
              <p className="text-warm-gray-600 mt-2">
                {sectionDescriptions[sectionId]}
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
            <div className="mb-6">
              <SearchBar 
                placeholder={`Rechercher dans ${sectionTitles[sectionId]}...`}
                onSearch={handleSearch}
              />
            </div>
            
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              contentTypes={contentTypes}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
          </div>

          {/* Results Count */}
          {!loading && !error && (
            <div className="mb-6">
              <p className="text-warm-gray-600">
                {filteredContents.length} résultat{filteredContents.length !== 1 ? "s" : ""} trouvé{filteredContents.length !== 1 ? "s" : ""}
                {searchQuery && ` pour "${searchQuery}"`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Content Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <ContentGrid
            contents={filteredContents}
            loading={loading}
            error={error}
            onRetry={handleRetry}
          />
        </div>
      </section>
    </div>
  );
};

export default SectionPage;