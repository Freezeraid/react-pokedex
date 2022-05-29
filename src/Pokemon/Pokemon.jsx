import React from 'react'
import './Pokemon.css'
import { useContext } from 'react'
import { ModalContext } from '../Context/ModalContext'
import POKEMONS from '../Constants/pokedex';
import '../Backgrounds/Backgrounds.css'

export default function Pokemon({id, names, types}) {
    const { toggleModal, setPokemonData } = useContext(ModalContext);

    const formatPokeId = (index) => {
        if (index < 10){
            return `00${index}`;
        } else if (index >= 10 && index < 100) {
            return `0${index}`;
        } else return index;
    }

    const displayIndex = (pokeId) => {
        return formatPokeId(pokeId);
    }

    const displayType = () => {
        return (
            types.map((element, i) => <span className="type" key={i}>{element}</span>)
        )
    }

    const getPokemonPicture = () => {
        return `./Images/thumbnails/${formatPokeId(id)}.png`;
    }

    const getPokemonIcon = () => {
        return `./Images/sprites/${formatPokeId(id)}MS.png`;
    }

    const callModal = (e) => {
        toggleModal(); 
        setPokemonData(POKEMONS[id - 1]);
    }

    return (
        <article className={`pokemon-container ${types[0].toLowerCase()}`} onClick={(e) => callModal(e)}>
            <div className='name-container'>
                <h4>#{displayIndex(id)} {names.english}</h4><img loading="lazy" src={getPokemonIcon()} alt={`${names.english} sprite`}></img>
            </div>
            <div className='details-container'>
                <div className='type-container'>
                    {displayType()}
                </div>
                <div className='img-container'>
                    <img loading="lazy" className='pokemon-picture' src={getPokemonPicture()} alt={`${names.english} illustration`} />
                </div>
            </div>
        </article>
    )
}
