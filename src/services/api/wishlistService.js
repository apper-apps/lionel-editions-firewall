// Wishlist service using localStorage for persistence
// Following the same pattern as contentService with CRUD operations

const WISHLIST_STORAGE_KEY = 'lionel_editions_wishlist';

// Simulate API delay for consistency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get wishlist from localStorage
const getWishlistFromStorage = () => {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading wishlist from storage:', error);
    return [];
  }
};

// Save wishlist to localStorage
const saveWishlistToStorage = (wishlist) => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.error('Error saving wishlist to storage:', error);
  }
};

export const wishlistService = {
  // Get all wishlist items
  async getAll() {
    await delay(200);
    const wishlist = getWishlistFromStorage();
    return wishlist.map(item => ({ ...item }));
  },

  // Get wishlist item by content ID
  async getById(contentId) {
    await delay(100);
    const wishlist = getWishlistFromStorage();
    const item = wishlist.find(item => item.contentId === contentId);
    if (!item) {
      throw new Error("Item not found in wishlist");
    }
    return { ...item };
  },

  // Add content to wishlist
  async add(contentData) {
    await delay(300);
    const wishlist = getWishlistFromStorage();
    
    // Check if already in wishlist
    const existingIndex = wishlist.findIndex(item => item.contentId === contentData.Id);
    if (existingIndex !== -1) {
      throw new Error("Item already in wishlist");
    }

    // Create wishlist item
    const maxId = Math.max(...wishlist.map(item => item.Id), 0);
    const wishlistItem = {
      Id: maxId + 1,
      contentId: contentData.Id,
      title: contentData.title,
      author: contentData.author,
      price: contentData.price,
      type: contentData.type,
      category: contentData.category,
      image: contentData.image,
      section: contentData.section,
      addedAt: new Date().toISOString(),
      description: contentData.description
    };

    wishlist.push(wishlistItem);
    saveWishlistToStorage(wishlist);
    return { ...wishlistItem };
  },

  // Remove item from wishlist by content ID
  async remove(contentId) {
    await delay(200);
    const wishlist = getWishlistFromStorage();
    const index = wishlist.findIndex(item => item.contentId === contentId);
    
    if (index === -1) {
      throw new Error("Item not found in wishlist");
    }

    const removed = wishlist.splice(index, 1)[0];
    saveWishlistToStorage(wishlist);
    return { ...removed };
  },

  // Check if content is in wishlist
  async isInWishlist(contentId) {
    await delay(50);
    const wishlist = getWishlistFromStorage();
    return wishlist.some(item => item.contentId === contentId);
  },

  // Clear entire wishlist
  async clear() {
    await delay(100);
    saveWishlistToStorage([]);
    return { success: true };
  }
};