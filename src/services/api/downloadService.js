// Download service for managing offline content downloads
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate download progress with realistic timing
const simulateDownloadProgress = async (contentId, onProgress, onComplete, onError) => {
  try {
    const totalSize = Math.floor(Math.random() * 50) + 10; // 10-60 MB
    let downloaded = 0;
    
    while (downloaded < totalSize) {
      await delay(100 + Math.random() * 200); // 100-300ms intervals
      
      const increment = Math.floor(Math.random() * 3) + 1; // 1-3 MB chunks
      downloaded = Math.min(downloaded + increment, totalSize);
      
      const progress = Math.floor((downloaded / totalSize) * 100);
      onProgress({
        contentId,
        progress,
        downloaded,
        totalSize,
        status: 'downloading'
      });
    }
    
    onComplete({
      contentId,
      progress: 100,
      downloaded: totalSize,
      totalSize,
      status: 'completed'
    });
  } catch (error) {
    onError({
      contentId,
      error: error.message,
      status: 'failed'
    });
  }
};

export const downloadService = {
  // Start download for content
  async startDownload(content, onProgress, onComplete, onError) {
    const downloadId = `download_${content.Id}_${Date.now()}`;
    
    // Add to downloads storage
    const downloads = this.getActiveDownloads();
    downloads[content.Id] = {
      id: downloadId,
      contentId: content.Id,
      title: content.title,
      status: 'downloading',
      progress: 0,
      downloaded: 0,
      totalSize: 0,
      startedAt: new Date().toISOString()
    };
    
    localStorage.setItem('lionel-downloads', JSON.stringify(downloads));
    
    // Start progress simulation
    simulateDownloadProgress(
      content.Id,
      (progressData) => {
        this.updateDownloadProgress(progressData);
        onProgress && onProgress(progressData);
      },
      (completeData) => {
        this.completeDownload(completeData);
        onComplete && onComplete(completeData);
      },
      (errorData) => {
        this.failDownload(errorData);
        onError && onError(errorData);
      }
    );
    
    return downloadId;
  },

  // Update download progress
  updateDownloadProgress(progressData) {
    const downloads = this.getActiveDownloads();
    if (downloads[progressData.contentId]) {
      downloads[progressData.contentId] = {
        ...downloads[progressData.contentId],
        ...progressData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('lionel-downloads', JSON.stringify(downloads));
    }
  },

  // Complete download
  completeDownload(completeData) {
    const downloads = this.getActiveDownloads();
    const offlineContent = this.getOfflineContent();
    
    if (downloads[completeData.contentId]) {
      // Move to offline storage
      offlineContent[completeData.contentId] = {
        ...downloads[completeData.contentId],
        ...completeData,
        completedAt: new Date().toISOString()
      };
      
      // Remove from active downloads
      delete downloads[completeData.contentId];
      
      localStorage.setItem('lionel-downloads', JSON.stringify(downloads));
      localStorage.setItem('lionel-offline-content', JSON.stringify(offlineContent));
    }
  },

  // Fail download
  failDownload(errorData) {
    const downloads = this.getActiveDownloads();
    if (downloads[errorData.contentId]) {
      downloads[errorData.contentId] = {
        ...downloads[errorData.contentId],
        ...errorData,
        failedAt: new Date().toISOString()
      };
      localStorage.setItem('lionel-downloads', JSON.stringify(downloads));
    }
  },

  // Cancel download
  cancelDownload(contentId) {
    const downloads = this.getActiveDownloads();
    if (downloads[contentId]) {
      delete downloads[contentId];
      localStorage.setItem('lionel-downloads', JSON.stringify(downloads));
    }
  },

  // Get active downloads
  getActiveDownloads() {
    try {
      const downloads = localStorage.getItem('lionel-downloads');
      return downloads ? JSON.parse(downloads) : {};
    } catch (error) {
      console.error('Error loading downloads:', error);
      return {};
    }
  },

  // Get offline content
  getOfflineContent() {
    try {
      const offline = localStorage.getItem('lionel-offline-content');
      return offline ? JSON.parse(offline) : {};
    } catch (error) {
      console.error('Error loading offline content:', error);
      return {};
    }
  },

  // Check if content is downloaded offline
  isOffline(contentId) {
    const offlineContent = this.getOfflineContent();
    return !!offlineContent[contentId];
  },

  // Check if content is currently downloading
  isDownloading(contentId) {
    const downloads = this.getActiveDownloads();
    return !!downloads[contentId] && downloads[contentId].status === 'downloading';
  },

  // Get download progress for specific content
  getDownloadProgress(contentId) {
    const downloads = this.getActiveDownloads();
    return downloads[contentId] || null;
  },

  // Remove offline content
  removeOfflineContent(contentId) {
    const offlineContent = this.getOfflineContent();
    if (offlineContent[contentId]) {
      delete offlineContent[contentId];
      localStorage.setItem('lionel-offline-content', JSON.stringify(offlineContent));
    }
  },

  // Get all download statistics
  getDownloadStats() {
    const downloads = this.getActiveDownloads();
    const offline = this.getOfflineContent();
    
    return {
      active: Object.keys(downloads).length,
      completed: Object.keys(offline).length,
      totalSize: Object.values(offline).reduce((sum, item) => sum + (item.totalSize || 0), 0)
    };
  }
};