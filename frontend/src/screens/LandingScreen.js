import React from 'react';
import front from '../images/front.png'
import process from '../images/process.png'
import wordCloud from '../images/wordCloud.png'
import logo from '../images/logo.png'

export default function LandingScreen() {

  return (
    <div>

      <div class="imgblock">
        <img src={front} width="100%" alt="front" />
        <img src={process} width="100%" alt="process" />
        <img src={wordCloud} width="100%" alt="word cloud" />
      </div>

      
    </div>
  );
}
