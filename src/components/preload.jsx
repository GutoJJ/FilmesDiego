import { useEffect, useState, React } from "react";

import pfp from "../img/pfp.jpg";
import audio from "../img/audio.mp3";

function Preload({ onButtonClick }) {
  const [audioPlayed, setAudioPlayed] = useState(false);

  function play() {
    const audioElement = new Audio(audio);
    audioElement.volume = 0.1;
    audioElement.play();
    setAudioPlayed(true);
  }

  const logar = () => {
    const inp = document.querySelector(".inp").value;

    if (!audioPlayed)  {
      play();
    }
    document.querySelector(".preload").style.animation = "fadeOut 1s";
    setTimeout(() => {
      onButtonClick();
    }, 950);
  };

  return (
    <div className="preload">
      <div className="lock">
        <img src={pfp} alt="Profile" />
        <h1>User</h1>
        <div className="entrar">
          <input className="inp" placeholder="Password" type="password" />
          <button className="btn" type="submit" onClick={logar}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Preload;
