import { createContext, useState } from "react";
import POKEMONS from '../Constants/pokedex';

export const ModalContext = createContext(false);

export const ModalContextProvider = ({children}) => {
    const [ isVisible, setIsVisible ] = useState(false);
    const [ pokemonData, setPokemonData ] = useState(POKEMONS[0]);

    return (
        <ModalContext.Provider value={{isVisible, setIsVisible, pokemonData, setPokemonData}}>
            {children}
        </ModalContext.Provider>
    )
}