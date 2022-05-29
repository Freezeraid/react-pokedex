import React, {useEffect, useContext} from 'react'
import { ModalContext } from '../Context/ModalContext'
import POKEMONS from '../Constants/pokedex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './Evolutions.css'

export default function Evolutions({evolutions, id}) {
  const {setPokemonData} = useContext(ModalContext);

  const formatPokeId = (index) => {
    if (index < 10){
        return `00${index}`;
    } else if (index >= 10 && index < 100) {
        return `0${index}`;
    } else return index;
  }

  const getLineage = (lineage, direction) => {
    let arrLineage = Object.entries(lineage);
    for (let evo of arrLineage) {
      if (evo[0] === direction) {
        const pokemonIndex = direction === 'next' ? evo[1][0][0] : evo[1][0];
        const nextLineage = getLineage(POKEMONS[Number(pokemonIndex) - 1].evolution, direction);
        if (nextLineage === undefined) {
          return evo;
        } else {
          return [evo, nextLineage];
        }
      }
    }
    return;
  }

  const getSprite = (id) => `./Images/sprites/${formatPokeId(id)}MS.png`;

  const displayEvolutions = () => {
    let pokeLineage = Object.entries(evolutions);
    if (pokeLineage.length === 0) {
      return <h3 id="no-evolution-warning">This pokemon doesn't have evolutive lineage.</h3>
    }

    const actualEvo = ['actual', [[id]]];

    let lineage = pokeLineage.length === 2 ? pokeLineage : getLineage(evolutions, pokeLineage[0][0]);
    
    if (typeof lineage[0] === "string") lineage = [lineage];
    
    if (lineage[0][0] === "prev") {
      if (lineage.length === 2) {
        if (lineage[1][0] === "prev") {
          lineage = lineage.reverse();
          lineage.push(actualEvo);
        } else {
          lineage = [lineage[0], actualEvo, lineage[1]];
        }
      } else {
        lineage.push(actualEvo);
      }
    } else {
      lineage.unshift(actualEvo);
    }

    return (
      lineage.map((element, i) => {
        const evoIndex = element[0] === "prev" ? element[1][0] : element[1][0][0];
        const evoText = element[0] === "prev" ? element[1][1] : element[1][0][1];
        return (
        <>
          {element[0] === "next" && <FontAwesomeIcon icon={faArrowRight} title={evoText}/>}
          <img className='pokemon-evolution-sprite' src={getSprite(evoIndex)} alt="" onClick={() => setPokemonData(POKEMONS[evoIndex - 1])}></img>
          {element[0] === "prev" && <FontAwesomeIcon icon={faArrowRight} title={evoText}/>}
        </>
        )
      })
    )
  }

  useEffect(() => {
    const pokemonSpritesCount = document.querySelectorAll(".pokemon-evolution-sprite").length;
    const evolutionContainer = document.querySelector('#evolutions-container');
    if (pokemonSpritesCount === 3) {
      evolutionContainer.style.width = "70%";
    } else {
      evolutionContainer.style.width = "40%";
    }
  })

  return (
    <>
      <div id="evolutions-container">
        {displayEvolutions()}
      </div>
      <p id="evolution-indication">Put your mouse on arrow to see evolution details...</p>
    </>
  )
}
