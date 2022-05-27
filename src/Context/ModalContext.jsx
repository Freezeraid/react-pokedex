import { createContext, useState } from "react";

export const ModalContext = createContext(false);

export const ModalContextProvider = ({children}) => {
    const [ isVisible, setIsVisible ] = useState(false);
    const [ pokemonData, setPokemonData ] = useState({
        'id': 0,
        'icon': "",
        'picture': "",
        'names': {},
        'types': [],
        'bg': ""
    });

    return (
        <ModalContext.Provider value={{isVisible, setIsVisible, pokemonData, setPokemonData}}>
            {children}
        </ModalContext.Provider>
    )
}