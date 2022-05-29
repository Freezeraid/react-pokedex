import React from 'react'
import "./Informations.css"

export default function Informations({species, description, profile}) {
  const displayEggGroups = () => {
    return (
      profile.egg.map((element, i) => {
        return <p key={i}>{element}</p>
      })
    )
  }

  const displayAbilities = () => {
    return (
      profile.ability.map((element, i) => {
        return <p key={i}>{element[0]}</p>
      })
    )
  }

  return (
    <div id="informations-component">
      <div>
        <div>
          <h4>Height :</h4>
          <span>{profile.height}</span>
        </div>
        <div>
          <h4>Weight :</h4>
          <span>{profile.weight}</span>
        </div>
        <div>
          <h4>Egg Group :</h4>
          <span>{displayEggGroups()}</span>
        </div>
        <div>
          <h4>Abilities :</h4>
          <span>{displayAbilities()}</span>
        </div>
      </div>
      <div>
        <div>
          <h4>Species :</h4>
          <span>{species}</span>
        </div>
        <div>
          <h4>Description :</h4>
          <span>{description}</span>
        </div>
        <div>
          <h4>Gender :</h4>
          <span>♂ {profile.gender.replace(":", " - ")} ♀</span>
        </div>
      </div>
    </div>
  )
}
