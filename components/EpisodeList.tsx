import { useState, useEffect, memo } from 'react';
import { fetchEpisodes } from '../utils/api';

interface Episode {
  id: number;
  name: string;
}

interface EpisodeListProps {
    onSelectEpisode: (id: number | null) => void;
}

function EpisodeList({ onSelectEpisode }: EpisodeListProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  useEffect(() => {
    async function loadEpisodes() {
      const data = await fetchEpisodes();
      setEpisodes(data.results);
    }
    loadEpisodes();
  }, []);

  const handleClick = (episode: Episode) => {
    const isSelected = selectedEpisode === episode.id;
    setSelectedEpisode(isSelected ? null : episode.id);
    onSelectEpisode(isSelected ? null : episode.id);
  };

  return (
    <div className="w-1/4 bg-primary text-white p-4 rounded-lg shadow-md">
      <h2 className="font-bold mb-4 text-lg">Episodes</h2>
      <ul>
        {episodes.map((episode) => (
          <li
            key={episode.id}
            className={`cursor-pointer p-2 mb-2 rounded transition duration-200 ${
              selectedEpisode === episode.id ? 'bg-accent' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleClick(episode)}
          >
            {episode.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(EpisodeList);
