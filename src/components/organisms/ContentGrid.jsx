import React from "react";
import ContentCard from "@/components/molecules/ContentCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ContentGrid = ({ contents, loading, error, onRetry }) => {
  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!contents || contents.length === 0) {
    return (
      <Empty 
        title="Aucun contenu disponible"
        description="Il n'y a pas encore de contenu dans cette section. Revenez bientôt pour découvrir de nouveaux contenus !"
        icon="BookOpen"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((content) => (
        <ContentCard key={content.Id} content={content} />
      ))}
    </div>
  );
};

export default ContentGrid;