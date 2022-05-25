import { useState, useEffect, useTransition } from 'react';
import './App.css';
import POKEMONS from './Constants/pokedex';
import Pokemon from './Pokemon/Pokemon';

function App() {
  const [ isPending, startTransition ] = useTransition();
  const [ pokemonList, setPokemonList ] = useState([]);

  const displayPokemonList = () => {
    return(
      pokemonList.map((element) => {
        return <Pokemon 
        key={element.id}
        id={element.id}
        names={element.name}
        types={element.type}
        />
      })
    )
  }

  const editPokemonList = (e) => {
    const pokemonName = e.target.value;
    startTransition(() => {
      const newList = POKEMONS.filter((element) => element.name.english.includes(pokemonName));
      setPokemonList([...newList]);
    })
  }

  useEffect(() => {
    setPokemonList(POKEMONS);
  }, [])

  return (
    <div className="App">
      <input type="text" name="pokemon-input" id="pokemon-input" placeholder='Search for a Pokemon'
      onChange={editPokemonList}/>
      <h1 id="pokedex-title">Pokedex</h1>
      <main id="pokedex">
        {displayPokemonList()}
      </main>
    </div>
  );
}

export default App;
