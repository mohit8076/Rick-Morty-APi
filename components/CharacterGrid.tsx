import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchCharacters, fetchCharactersByEpisode } from '../utils/api';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharacterGridProps {
  episodeId: number | null;
}

export default function CharacterGrid({ episodeId }: CharacterGridProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    async function loadCharacters() {
      if (episodeId) {
        const episodeCharacters = await fetchCharactersByEpisode(episodeId);
        setCharacters(episodeCharacters);
      } else {
        const data = await fetchCharacters(page);
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      }
    }
    loadCharacters();
  }, [episodeId, page]);

  // Handle pagination controls
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="w-3/4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {characters.map((character) => (
          <div key={character.id} className="p-4 bg-secondary rounded-lg shadow hover:shadow-lg transition duration-200">
            <Image
              src={character.image}
              alt={character.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover rounded"
              placeholder="blur"
              blurDataURL="/placeholder.jpg" // Optional: Add a low-res placeholder
            />
            <h3 className="font-bold text-primary mt-2 text-center">{character.name}</h3>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {!episodeId && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            disabled={page === 1}
            onClick={handlePrevPage}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            disabled={page === totalPages}
            onClick={handleNextPage}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
