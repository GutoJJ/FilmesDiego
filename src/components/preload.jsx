import React from 'react'; 

import pfp from '../img/pfp.png';
import audio from '../img/audio.mp3';

function Preload({ onButtonClick }) { 
    function play() {
        new Audio(audio).play();
    }

    const logar = () => {
        const inp = document.querySelector(".inp").value;
        if (inp === "lindo") {
            console.log("logou");
            play();
            document.querySelector(".preload").style.animation = "fadeOut 1s";
            setTimeout(() => {
                onButtonClick();
            }, 950);
        }
    }

    return (
        <div className="preload">
            <div className="lock">
                <img src={pfp} alt="Profile" /> {/* Adicione um atributo alt para a imagem */}
                <h1>Augusto</h1>
                <div className="entrar">
                    <input className='inp' placeholder='Password' type="password" />
                    <button className='btn' type='submit' onClick={logar}>{'>'}</button>
                </div>
            </div>
        </div>
    )
}

export default Preload;
