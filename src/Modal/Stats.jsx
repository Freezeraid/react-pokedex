import React, {useEffect} from 'react'
import './Stats.css'

export default function Stats({stats}) {
  let total = 0;

  const displayStats = () => {
    const arrStats = Object.entries(stats);
    return (
      arrStats.map((element, i) => {
        total += element[1];
        return (
        <div key={i} className="one-stat-container">
          <span className='stat-name'>{element[0]}:</span>
          <div className="stat-progress"><progress max="140" value={element[1]}></progress></div>
          <span className='stat-value'>{element[1]}</span>
        </div>)
      })
    )
  }

  useEffect(() => {
    const allProgressBars = document.querySelectorAll("progress");
    allProgressBars.forEach((element) => {
      element.classList = '';
      if (element.value < 20) {
        element.classList.add('sub20');
      } else if (element.value >= 20 && element.value < 40) {
        element.classList.add('sub40');
      } else if (element.value >= 40 && element.value < 60) {
        element.classList.add('sub60');
      } else if (element.value >= 60 && element.value < 80) {
        element.classList.add('sub80');
      } else if (element.value >= 80 && element.value < 100) {
        element.classList.add('sub100');
      } else if (element.value >= 100 && element.value < 120) {
        element.classList.add('sub120');
      } else if (element.value >= 120 && element.value < 140) {
        element.classList.add('sub140');
      } else if (element.value >= 140) {
        element.classList.add('over140');
      }
    })
  })

  return (
    <div id="stats-component">
      <div id="stats-container">
        {displayStats()}
      </div>
      <span className='stat-name'>Total: {total}</span>
    </div>
    
  )
}
