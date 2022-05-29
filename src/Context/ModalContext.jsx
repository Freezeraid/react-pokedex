import { createContext, useState } from "react";
import POKEMONS from '../Constants/pokedex';

export const ModalContext = createContext(false);

export const ModalContextProvider = ({children}) => {
    const [ isVisible, setIsVisible ] = useState(false);
    const [ pokemonData, setPokemonData ] = useState(POKEMONS[0]);

    const toggleModal = () => {
        if (isVisible) {
            document.body.style.overflowY = 'scroll';
            document.body.scroll = "yes";
        } else {
            document.body.style.overflowY = 'hidden';
            document.body.scroll = "no";
        }

        setIsVisible(prev => !prev);
    }

    return (
        <ModalContext.Provider value={{isVisible, toggleModal, pokemonData, setPokemonData}}>
            {children}
        </ModalContext.Provider>
    )
}