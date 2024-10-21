"use client"
import { useState } from 'react';
import EpisodeList from '../components/EpisodeList';
import CharacterGrid from '../components/CharacterGrid';

export default function HomePage() {
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  // Function to toggle episode selection
  const handleSelectEpisode = (episodeId: number | null) => {
    setSelectedEpisode((prevEpisode) => (prevEpisode === episodeId ? null : episodeId));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-secondary">
      <EpisodeList onSelectEpisode={handleSelectEpisode} />
      <CharacterGrid episodeId={selectedEpisode} />
    </div>
  );
}

