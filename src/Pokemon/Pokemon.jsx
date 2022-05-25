import React from 'react'
import './Pokemon.css'

export default function Pokemon({id, names, types}) {
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
            types.map((element) => <span className="type">{element}</span>)
        )
    }

    const getPokemonPicture = () => {
        return `/Images/thumbnails/${formatPokeId(id)}.png`;
    }

    return (
        <article className={`pokemon-container ${types[0].toLowerCase()}`}>
            <h4>#{displayIndex(id)} {names.english}</h4>
            <div className='details-container'>
                <div className='type-container'>
                    {displayType()}
                </div>
                <div className='img-container'>
                    <img className='pokemon-picture' src={getPokemonPicture()} alt={`${names.english} illustration`} />
                </div>
            </div>
        </article>
    )
}
