import { useState, useEffect, useTransition } from 'react';
import './App.css';
import POKEMONS from './Constants/pokedex';
import Pokemon from './Pokemon/Pokemon';
import Modal from './Modal/Modal';

function App() {
  const [ isPending, startTransition ] = useTransition();
  const [ pokemonList, setPokemonList ] = useState([]);

  const displayPokemonList = () => {
    return(
      pokemonList.map((element, index) => {
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
    const search = e.target.value;
    startTransition(() => {
      const newList = POKEMONS.filter((element) => {
        if (element.name.english.toLowerCase().includes(search.toLowerCase())) {
          return true;
        } else if (element.id == search) {
          return true;
        }
        
        for (let pokeType of element.type){
          if (pokeType.toLowerCase().includes(search.toLowerCase())) {
            return true;
          }
        }

        return false;
      });
      setPokemonList([...newList]);
    })
  }

  useEffect(() => {
    setPokemonList(POKEMONS);
  }, [])

  return (
    <div className="App">
      <img src="./Images/Logo/pokeball-grey.png" id="pokeball-grey" alt="pokeball grey" />
      <input type="text" name="pokemon-input" id="pokemon-input" placeholder="Search a name, an ID, a type"
      onChange={editPokemonList}/>
      <h1 id="pokedex-title">Pokedex</h1>
      <main id="pokedex">
        {displayPokemonList()}
      </main>
      <Modal />
    </div>
  );
}

export default App;
