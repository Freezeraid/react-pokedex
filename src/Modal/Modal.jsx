import React, { useContext } from 'react'
import { createPortal } from 'react-dom'
import "./Modal.css"
import "../Backgrounds/Backgrounds.css"
import { ModalContext } from '../Context/ModalContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import Evolutions from './Evolutions'
import Stats from './Stats'
import Informations from './Informations'

export default function Modal() {
    const { isVisible, setIsVisible, pokemonData } = useContext(ModalContext);

    const formatPokeId = (index) => {
        if (index < 10){
            return `00${index}`;
        } else if (index >= 10 && index < 100) {
            return `0${index}`;
        } else return index;
    }

    const getClassVisible = () => {
        if (!isVisible) return 'none';
        else return '';
    }
    
    const displayPokemonTypes = () => {
        return(
            pokemonData.type.map((element, i) => {
                return <span key={i} className='modal-pokemon-type'>{element}</span>
            })
        )
    }

    const getPokemonPicture = () => {
        return `./Images/images/${formatPokeId(pokemonData.id)}.png`
    }

    return createPortal(
        <>
            <div id="background-modal" className={getClassVisible()} onClick={() => setIsVisible(prev => !prev)}>
                &nbsp;
            </div>
            <div id="modal-container" className={getClassVisible()}>
                <div id="modal-pokemon-summary" className={pokemonData.type[0].toLowerCase() ?? ""}>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={() => setIsVisible(prev => !prev)} />
                    <div id="modal-pokemon-header-data">
                        <div>
                            <h2 id="modal-pokemon-name">{pokemonData.name.english}</h2>
                            <div id="modal-pokemon-types">{displayPokemonTypes()}</div>
                        </div>
                        <span id="modal-pokemon-index">#{formatPokeId(pokemonData.id)}</span>   
                    </div>
                    <div id="modal-pokemon-picture-container">
                        <img src={getPokemonPicture()} alt={`${pokemonData.name.english} illustration`} id="modal-pokemon-picture"/>
                    </div>
                </div>
                <div id="modal-pokemon-details">
                    <BrowserRouter>
                        <nav>
                            <NavLink to="/">Informations</NavLink>
                            <NavLink to="/evolutions">Evolutions</NavLink>
                            <NavLink to="/attaques">Statistics</NavLink>
                        </nav>
                        <div id="modal-infos-container">
                        <Routes>
                            <Route path='/' element={<Informations
                            species={pokemonData.species}
                            description={pokemonData.description}
                            profile={pokemonData.profile}
                            />}/>
                            <Route path='/evolutions' element={<Evolutions
                            evolutions={pokemonData.evolution}
                            id={pokemonData.id}
                            />}/>
                            <Route path='/attaques' element={<Stats stats={pokemonData.base} />}/>
                        </Routes>
                        </div>
                    </BrowserRouter>
                </div>  
            </div>
        </>
        , document.body
    )
}
