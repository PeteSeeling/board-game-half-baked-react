import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getGameById } from './services/fetch-utils';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function DetailPage() {

  const [game, setGame] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchSingleGame(){
      const response = await getGameById(id);

      setGame(response);
    }
    fetchSingleGame();
  }, [id]);

  // on mount, fetch and set in state the correct board game for this id (the id can be found in match.params using the correct react-router hook)

 

  return (
    <div className='detail'>
      <h1>{game.title}</h1>
      <h2>A {game.genre} game for {game.min_players} to {game.max_players} players</h2>
      <h3>by celebrated designer {game.designer}</h3>
      <p>
        {game.description}
      </p>
    </div>
  );
}
