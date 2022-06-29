import { useState } from 'react';
import { createGame } from './services/fetch-utils';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function CreatePage() {
  // you'll need the history hook from react-router-dom to do your redirecting in the handleSubmit
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [designer, setDesigner] = useState('');
  const [description, setDescription] = useState('');
  const [min_players, setMinPlayers] = useState(0);
  const [max_players, setMaxPlayers] = useState(0);
  // here's the state you'll need:
    // title;
    // genre;
    // designer;
    // description;
    // minPlayers;
    // maxPlayers;

  async function handleSubmit(e) {
    e.preventDefault();

    // create a game
    await createGame({ title, genre, designer, description, min_players, max_players });
    // use history.push to send the user to the list page
    history.push('/board-games');
  }

  return (
    <div className='create'>
      {/* on submit, call your handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <h2>Add board game</h2>
        <label>
            Title
          {/* on change, set the title in state */}
          <input value={title} onChange={e => setTitle(e.target.value)}/>
        </label>
        <label>
            Genre
          {/* on change, set the genre in state */}
          <select value={genre} onChange={e => setGenre(e.target.value)}>
            <option>Tile-laying</option>
            <option>Economic</option>
            <option>War</option>
            <option>Card</option>
            <option>Abstract</option>
            <option>Cooperative</option>
            <option>Solo</option>
          </select>
        </label>
        <label>
            Designer
          {/* on change, set the designer in state */}
          <input value={designer} onChange={e => setDesigner(e.target.value)}/>
        </label>
        <label>
            Min Players
          {/* on change, set the min players in state */}
          <input value={min_players} onChange={e => setMinPlayers(e.target.value)}/>
        </label>
        <label>
            Max Players
          {/* on change, set the max players in state */}
          <input value={max_players} onChange={e => setMaxPlayers(e.target.value)}/>
        </label>
        <label>
            Description
          <textarea value={description} onChange={e => setDescription(e.target.value)}/>
        </label>
        <button>Create game</button>
      </form>
    </div>
  );
}
