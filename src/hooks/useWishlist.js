import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { wishlistService } from '@/services/api/wishlistService';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load wishlist items
  const loadWishlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await wishlistService.getAll();
      setWishlistItems(items);
    } catch (err) {
      setError(err.message);
      console.error('Error loading wishlist:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add item to wishlist
  const addToWishlist = useCallback(async (contentData) => {
    try {
      await wishlistService.add(contentData);
      await loadWishlist();
      toast.success(`"${contentData.title}" ajouté à vos favoris`);
    } catch (err) {
      if (err.message === "Item already in wishlist") {
        toast.info("Ce contenu est déjà dans vos favoris");
      } else {
        toast.error("Erreur lors de l'ajout aux favoris");
        console.error('Error adding to wishlist:', err);
      }
    }
  }, [loadWishlist]);

  // Remove item from wishlist
  const removeFromWishlist = useCallback(async (contentId) => {
    try {
      const removedItem = await wishlistService.remove(contentId);
      await loadWishlist();
      toast.success(`"${removedItem.title}" retiré de vos favoris`);
    } catch (err) {
      toast.error("Erreur lors de la suppression");
      console.error('Error removing from wishlist:', err);
    }
  }, [loadWishlist]);

  // Toggle item in wishlist
  const toggleWishlist = useCallback(async (contentData) => {
    const isInList = wishlistItems.some(item => item.contentId === contentData.Id);
    if (isInList) {
      await removeFromWishlist(contentData.Id);
    } else {
      await addToWishlist(contentData);
    }
  }, [wishlistItems, addToWishlist, removeFromWishlist]);

  // Check if item is in wishlist
  const isInWishlist = useCallback((contentId) => {
    return wishlistItems.some(item => item.contentId === contentId);
  }, [wishlistItems]);

  // Clear entire wishlist
  const clearWishlist = useCallback(async () => {
    try {
      await wishlistService.clear();
      await loadWishlist();
      toast.success("Favoris vidés");
    } catch (err) {
      toast.error("Erreur lors de la suppression");
      console.error('Error clearing wishlist:', err);
    }
  }, [loadWishlist]);

  // Get wishlist count
  const wishlistCount = wishlistItems.length;

  // Load wishlist on mount
  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  return {
    wishlistItems,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount,
    loadWishlist
  };
};