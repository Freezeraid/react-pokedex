import React, { useContext } from 'react'
import { createPortal } from 'react-dom'
import "./Modal.css"
import "../Backgrounds/Backgrounds.css"
import { ModalContext } from '../Context/ModalContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Modal() {
    const { isVisible, setIsVisible, pokemonData } = useContext(ModalContext);

    console.log(pokemonData);

    const getClassVisible = () => {
        if (!isVisible) return 'none';
        else return '';
    }
    
    const displayPokemonTypes = () => {
        return(
            pokemonData.types.map((element) => {
                return <span className='modal-pokemon-type'>{element}</span>
            })
        )
    }

    return createPortal(
        <>
            <div id="background-modal" className={getClassVisible()} onClick={() => setIsVisible(prev => !prev)}>
                &nbsp;
            </div>
            <div id="modal-container" className={getClassVisible()}>
                <div id="modal-pokemon-summary" className={pokemonData.types?.[0]?.toLowerCase() ?? ""}>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={() => setIsVisible(prev => !prev)} />
                    <div id="modal-pokemon-header-data">
                        <div>
                            <h2 id="modal-pokemon-name">{pokemonData.names.english}</h2>
                            <div id="modal-pokemon-types">{displayPokemonTypes()}</div>
                        </div>
                        <span id="modal-pokemon-index">#{pokemonData.id}</span>   
                    </div>
                </div>
                <div id="modal-pokemon-details">
                    <div id="modal-pokemon-picture-container">
                        <img src={pokemonData.picture} alt={`${pokemonData.names.english} illustration`} id="modal-pokemon-picture"/>
                    </div>
                    
                    test
                </div>  
            </div>
        </>
        , document.body
    )
}
