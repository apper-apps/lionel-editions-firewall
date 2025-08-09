import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import ContentCard from '@/components/molecules/ContentCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { useWishlist } from '@/hooks/useWishlist';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlistItems, loading, error, clearWishlist, loadWishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter wishlist items based on search and category
  const filteredItems = useMemo(() => {
    return wishlistItems.filter(item => {
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [wishlistItems, searchQuery, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(wishlistItems.map(item => item.category))];
    return cats.sort();
  }, [wishlistItems]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClearWishlist = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider tous vos favoris ?')) {
      await clearWishlist();
    }
  };

  const handleRetry = () => {
    loadWishlist();
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <Loading message="Chargement de vos favoris..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <Error
          title="Erreur de chargement"
          message="Impossible de charger vos favoris"
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-surface">
      {/* Header */}
      <div className="bg-white border-b border-warm-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <ApperIcon name="Heart" className="w-6 h-6 text-red-500" />
              <div>
                <h1 className="font-display text-2xl font-bold text-warm-gray-900">
                  Mes Favoris
                </h1>
                <p className="text-sm text-warm-gray-600">
                  {wishlistItems.length} contenu{wishlistItems.length !== 1 ? 's' : ''} sauvegardé{wishlistItems.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {wishlistItems.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClearWishlist}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                Tout vider
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {wishlistItems.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-6">
          <Empty
            icon="Heart"
            title="Aucun favori"
            message="Explorez notre contenu et ajoutez vos favoris pour les retrouver facilement"
            actionLabel="Explorer le contenu"
            onAction={() => navigate('/')}
          />
        </div>
      )}

      {/* Content */}
      {wishlistItems.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Rechercher dans vos favoris..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
              <ApperIcon 
                name="Search" 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-gray-400"
              />
            </div>

            {/* Category Filter */}
            {categories.length > 1 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  Tous ({wishlistItems.length})
                </Button>
                {categories.map(category => {
                  const count = wishlistItems.filter(item => item.category === category).length;
                  return (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'secondary'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="whitespace-nowrap"
                    >
                      {category} ({count})
                    </Button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Results Info */}
          {searchQuery || selectedCategory !== 'all' ? (
            <div className="mb-4 text-sm text-warm-gray-600">
              {filteredItems.length} résultat{filteredItems.length !== 1 ? 's' : ''} 
              {searchQuery && ` pour "${searchQuery}"`}
              {selectedCategory !== 'all' && ` dans "${selectedCategory}"`}
            </div>
          ) : null}

          {/* Content Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <ContentCard
                  key={item.Id}
                  content={{
                    Id: item.contentId,
                    title: item.title,
                    author: item.author,
                    price: item.price,
                    type: item.type,
                    category: item.category,
                    image: item.image,
                    section: item.section,
                    description: item.description
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <ApperIcon name="Search" className="w-12 h-12 text-warm-gray-400 mb-4" />
              <h3 className="font-display text-lg font-semibold text-warm-gray-900 mb-2">
                Aucun résultat
              </h3>
              <p className="text-warm-gray-600 text-center mb-4">
                Aucun contenu ne correspond à vos critères de recherche
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Effacer les filtres
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;