import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "@/components/molecules/SearchBar";
import FilterBar from "@/components/molecules/FilterBar";
import ContentGrid from "@/components/organisms/ContentGrid";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { contentService } from "@/services/api/contentService";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allContents, setAllContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [categories, setCategories] = useState([]);
  const [contentTypes, setContentTypes] = useState([]);

  const sections = [
    { id: "boutique", label: "Boutique d'eBooks" },
    { id: "academie", label: "Académie Digitale" },
    { id: "coach", label: "Coach Perso" },
    { id: "bienetre", label: "Bien-Être & Santé" },
    { id: "business", label: "Business Booster" }
  ];

  useEffect(() => {
    // Get initial query from URL params
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);
    
    loadContents();
  }, [location.search]);

  useEffect(() => {
    filterContents();
  }, [allContents, searchQuery, selectedCategory, selectedType, selectedSection]);

  const loadContents = async () => {
    try {
      setLoading(true);
      setError("");
      const contents = await contentService.getAll();
      setAllContents(contents);

      // Extract unique categories and types
      const uniqueCategories = [...new Set(contents.map(c => c.category))];
      const uniqueTypes = [...new Set(contents.map(c => c.type))];
      setCategories(uniqueCategories);
      setContentTypes(uniqueTypes);
    } catch (err) {
      setError("Erreur lors du chargement des contenus");
    } finally {
      setLoading(false);
    }
  };

  const filterContents = () => {
    let filtered = [...allContents];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.category.toLowerCase().includes(searchQuery.toLowerCase())
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

    // Filter by section
    if (selectedSection) {
      filtered = filtered.filter(content => content.section === selectedSection);
    }

    setFilteredContents(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Update URL without navigation
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    window.history.replaceState(null, "", `${location.pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedType("");
    setSelectedSection("");
    window.history.replaceState(null, "", location.pathname);
  };

  const handleRetry = () => {
    loadContents();
  };

  const hasFilters = searchQuery || selectedCategory || selectedType || selectedSection;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Retour
            </Button>
            
            <h1 className="font-display text-3xl md:text-4xl font-bold text-warm-gray-900 mb-4">
              Recherche de Contenus
            </h1>
            <p className="text-warm-gray-600">
              Trouvez le contenu parfait parmi notre collection premium
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar 
              placeholder="Rechercher par titre, auteur, description..."
              onSearch={handleSearch}
            />
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1">
                <FilterBar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  contentTypes={contentTypes}
                  selectedType={selectedType}
                  onTypeChange={setSelectedType}
                />
              </div>
              
              {/* Section Filter */}
              <div className="lg:w-64">
                <h4 className="text-sm font-medium text-warm-gray-700 mb-2">Section</h4>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full rounded-lg border border-warm-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="">Toutes les sections</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {hasFilters && (
              <div className="mt-4 pt-4 border-t border-warm-gray-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  <ApperIcon name="X" className="w-4 h-4 mr-2" />
                  Effacer tous les filtres
                </Button>
              </div>
            )}
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

      {/* Results */}
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

export default SearchPage;