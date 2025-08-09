import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import ProgressBar from '@/components/molecules/ProgressBar';
import { useDownloads } from '@/hooks/useDownloads';
import { cn } from '@/utils/cn';

const DownloadManager = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { downloads, cancelDownload, getActiveDownloadsCount, getStats } = useDownloads();
  
  const activeDownloadsCount = getActiveDownloadsCount();
  const stats = getStats();

  // Don't render if no active downloads
  if (activeDownloadsCount === 0) {
    return null;
  }

  const handleCancelDownload = (contentId, title) => {
    cancelDownload(contentId);
    toast.info(`Téléchargement de "${title}" annulé`);
  };

  const formatSize = (sizeInMB) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(1)} GB`;
    }
    return `${sizeInMB.toFixed(1)} MB`;
  };

  const formatSpeed = (downloaded, totalTime) => {
    if (totalTime <= 0) return '0 MB/s';
    const speed = downloaded / (totalTime / 1000); // MB per second
    if (speed >= 1) {
      return `${speed.toFixed(1)} MB/s`;
    }
    return `${(speed * 1024).toFixed(0)} KB/s`;
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 max-w-sm">
      <Card className="bg-white/95 backdrop-blur-sm border border-warm-gray-200 shadow-golden">
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Download" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-warm-gray-900">
                Téléchargements
              </h3>
              <p className="text-xs text-warm-gray-500">
                {activeDownloadsCount} actif{activeDownloadsCount > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm">
            <ApperIcon 
              name={isExpanded ? "ChevronDown" : "ChevronUp"} 
              className="w-4 h-4" 
            />
          </Button>
        </div>

        {/* Downloads List */}
        {isExpanded && (
          <div className="border-t border-warm-gray-100">
            <div className="max-h-80 overflow-y-auto">
              {Object.values(downloads).map((download) => {
                const startTime = new Date(download.startedAt);
                const currentTime = new Date();
                const elapsedTime = currentTime - startTime;
                const speed = formatSpeed(download.downloaded || 0, elapsedTime);

                return (
                  <div 
                    key={download.id}
                    className="p-4 border-b border-warm-gray-50 last:border-b-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-warm-gray-900 truncate">
                          {download.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            download.status === 'downloading' && "bg-blue-100 text-blue-800",
                            download.status === 'failed' && "bg-red-100 text-red-800",
                            download.status === 'completed' && "bg-green-100 text-green-800"
                          )}>
                            {download.status === 'downloading' && 'Téléchargement'}
                            {download.status === 'failed' && 'Échec'}
                            {download.status === 'completed' && 'Terminé'}
                          </span>
                          {download.status === 'downloading' && (
                            <span className="text-xs text-warm-gray-500">
                              {speed}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {download.status === 'downloading' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancelDownload(download.contentId, download.title)}
                          className="ml-2 text-warm-gray-400 hover:text-red-500"
                        >
                          <ApperIcon name="X" className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    {download.status === 'downloading' && (
                      <div>
                        <ProgressBar
                          progress={download.progress || 0}
                          size="sm"
                          animated={true}
                          showPercentage={false}
                        />
                        <div className="flex items-center justify-between mt-2 text-xs text-warm-gray-500">
                          <span>
                            {formatSize(download.downloaded || 0)} / {formatSize(download.totalSize || 0)}
                          </span>
                          <span>{download.progress || 0}%</span>
                        </div>
                      </div>
                    )}

                    {download.status === 'failed' && (
                      <div className="mt-2">
                        <p className="text-xs text-red-600">
                          {download.error || 'Erreur de téléchargement'}
                        </p>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="mt-2 text-xs"
                          onClick={() => {
                            // Could implement retry logic here
                            toast.info('Fonction de reprise bientôt disponible');
                          }}
                        >
                          Réessayer
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer Stats */}
            <div className="p-4 bg-warm-gray-50">
              <div className="flex items-center justify-between text-xs text-warm-gray-600">
                <span>
                  {stats.active} téléchargement{stats.active > 1 ? 's' : ''}
                </span>
                <span>
                  {stats.completed} terminé{stats.completed > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DownloadManager;