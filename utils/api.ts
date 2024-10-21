export async function fetchEpisodes() {
    const response = await fetch('https://rickandmortyapi.com/api/episode');
    return await response.json();
  }
  
  export async function fetchCharacters(page: number = 1) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    return await response.json();
  }
  
  export async function fetchCharactersByEpisode(episodeId: number) {
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
    const episode = await response.json();
    const characterPromises = episode.characters.map((url: string) => fetch(url).then(res => res.json()));
    return await Promise.all(characterPromises);
  }
  