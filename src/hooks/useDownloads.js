import { useState, useEffect, useCallback } from 'react';
import { downloadService } from '@/services/api/downloadService';

export const useDownloads = () => {
  const [downloads, setDownloads] = useState({});
  const [offlineContent, setOfflineContent] = useState({});

  // Load downloads on mount
  useEffect(() => {
    const loadDownloads = () => {
      const activeDownloads = downloadService.getActiveDownloads();
      const offlineData = downloadService.getOfflineContent();
      
      setDownloads(activeDownloads);
      setOfflineContent(offlineData);
    };

    loadDownloads();

    // Set up storage listener for cross-tab updates
    const handleStorageChange = (event) => {
      if (event.key === 'lionel-downloads' || event.key === 'lionel-offline-content') {
        loadDownloads();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Start download
  const startDownload = useCallback(async (content) => {
    if (downloadService.isDownloading(content.Id) || downloadService.isOffline(content.Id)) {
      return null;
    }

    const downloadId = await downloadService.startDownload(
      content,
      // onProgress
      (progressData) => {
        setDownloads(prev => ({
          ...prev,
          [progressData.contentId]: {
            ...prev[progressData.contentId],
            ...progressData
          }
        }));
      },
      // onComplete
      (completeData) => {
        setDownloads(prev => {
          const updated = { ...prev };
          delete updated[completeData.contentId];
          return updated;
        });
        
        setOfflineContent(prev => ({
          ...prev,
          [completeData.contentId]: completeData
        }));
      },
      // onError
      (errorData) => {
        setDownloads(prev => ({
          ...prev,
          [errorData.contentId]: {
            ...prev[errorData.contentId],
            ...errorData
          }
        }));
      }
    );

    return downloadId;
  }, []);

  // Cancel download
  const cancelDownload = useCallback((contentId) => {
    downloadService.cancelDownload(contentId);
    setDownloads(prev => {
      const updated = { ...prev };
      delete updated[contentId];
      return updated;
    });
  }, []);

  // Remove offline content
  const removeOfflineContent = useCallback((contentId) => {
    downloadService.removeOfflineContent(contentId);
    setOfflineContent(prev => {
      const updated = { ...prev };
      delete updated[contentId];
      return updated;
    });
  }, []);

  // Get download status for specific content
  const getContentStatus = useCallback((contentId) => {
    if (downloads[contentId]) {
      return downloads[contentId];
    }
    if (offlineContent[contentId]) {
      return { ...offlineContent[contentId], status: 'offline' };
    }
    return { status: 'available' };
  }, [downloads, offlineContent]);

  // Check if content is offline
  const isOffline = useCallback((contentId) => {
    return !!offlineContent[contentId];
  }, [offlineContent]);

  // Check if content is downloading
  const isDownloading = useCallback((contentId) => {
    return downloads[contentId]?.status === 'downloading';
  }, [downloads]);

  // Get active downloads count
  const getActiveDownloadsCount = useCallback(() => {
    return Object.keys(downloads).length;
  }, [downloads]);

  // Get download statistics
  const getStats = useCallback(() => {
    return {
      active: Object.keys(downloads).length,
      completed: Object.keys(offlineContent).length,
      totalSize: Object.values(offlineContent).reduce((sum, item) => sum + (item.totalSize || 0), 0)
    };
  }, [downloads, offlineContent]);

  return {
    downloads,
    offlineContent,
    startDownload,
    cancelDownload,
    removeOfflineContent,
    getContentStatus,
    isOffline,
    isDownloading,
    getActiveDownloadsCount,
    getStats
  };
};