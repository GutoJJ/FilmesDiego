import '../style/main.sass';
import React, { useState, useEffect } from "react";
import Diego from "../img/easter.png";//augustolindo
import Detalhes from './detalhes.jsx';
//augustolindo
function Home() {
    const [inputValue, setInputValue] = useState('');
    const [passado, setPassado] = useState([]);

    const imagePath = "https://image.tmdb.org/t/p/original";

    const [movies, setMovies] = useState([]);
    const KEY = import.meta.env.VITE_KEY;
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {//augustolindo
                setMovies(data.results);
            });
    }, [KEY]);
    let novoElemento;
    const handleKeyDown = (event) => { //comandos
        if (event.key === 'Enter') {
            event.preventDefault();
            let separado = inputValue.split(" ");//augustolindo

            switch (separado[0].toLowerCase()) {
                case 'clear':
                    document.querySelector('.registro').innerHTML = '';
                    setTimeout(function () {
                        document.querySelector('.registro').innerHTML = '';//augustolindo
                    }, 1);
                    break;
                case 'lindo':
                    novoElemento = (
                        <div key={passado.length}>
                            <p>[<span>gutojj</span>]:- [<span>Augusto</span>]$ <span className="color">{inputValue}</span> <br /></p>
                            <p >Augusto é gostoso</p>
                        </div>
                    );
                    break;
                case 'ls':
                    novoElemento = (
                        <div key={passado.length}>
                            <p>[<span>gutojj</span>]:- [<span>Augusto</span>]$ <span className="color">{inputValue}</span> <br /></p>
                            <p>Listando filmes e séries...</p>
                            <p>======================================</p>
                            {movies.map((movie) => {
                                return (
                                    <button className='color' onClick={() => CriarCard(movie.id)}><span>| </span>{movie.title} </button>
                                );
                                //augustolindo
                            })}
                            <p>======================================</p>
                        </div>
                    )
                    break;//augustolindo
                case 'qualquermerda':
                    novoElemento = (
                        <div key={passado.length}>
                            <p>[<span>gutojj</span>]:- [<span>Augusto</span>]$ <span className="color">{inputValue}</span> <br /></p>
                            <p>Vai aparecer qualquer <span>merda</span> na tela</p>
                        </div>
                    )
                    break;
                case 'burro':
                    novoElemento = (
                        <div key={passado.length}>
                            <p>[<span>gutojj</span>]:- [<span>Augusto</span>]$ <span className="color">{inputValue}</span> <br /></p>
                            <p><span>{separado[1] || "O usuário"}</span> é burro</p>
                        </div>
                    )
                    break;
                case 'diego':
                    novoElemento = (
                        <div key={passado.length}>
                            <p>[<span>gutojj</span>]:- [<span>Augusto</span>]$ <span className="color">{inputValue}</span> <br /></p>
                            <img className='diego' src={Diego} />
                        </div>
                    )
                    break;
                case 'joanaxmateus'://augustolindo
                    novoElemento = (
                        <div key={passado.length}>
                            <p>[<span>gutojj</span>]:- [<span>Augusto</span>]$ <span className="color">{inputValue}</span> <br /></p>
                            <p>CASAL DA TURMA!!!!!!!</p>
                        </div>
                    )
                    break;
                default://voseéfeio
                    novoElemento = (
                        <div key={passado.length}>
                            <p>[<span>gutojj</span>]:- [<span>Augusto</span>]$ <span className="color">{inputValue}</span> <br /></p>
                            <p>Comando Inválido!</p>
                        </div>
                    );
                //augustolindo
            }
            setPassado([...passado, novoElemento]);


            setInputValue('');
        }
    };

    const CriarCard = (id) => { //função de detalhes
        console.log(id);
        //augustolindo
        novoElemento = (
            <div className='card' key={passado.length}>
                <Detalhes movieId={id} />
                <p>Exibindo detalhes...</p>
            </div>
        );
        setPassado([...passado, novoElemento]);
    }

    const removeWindowTerminal = () => {
        document.querySelector(".container").style.animation = "goOut .5s";
        setTimeout(function () {
            document.querySelector(".wrapper").innerHTML = '';
            location.reload();
        },450);
    }
    //augustolindo
    return (
        <div className="container">
            <div className="topBar">
                <div className="botoes">
                    <div onClick={removeWindowTerminal} className="vermelho"></div>
                    <div className="amarelo"></div>
                    <div className="verde"></div>
                </div>
                <h2>gutojj</h2>
            </div>

            <div className="content">
                <p className="header-text">Last login: <span> Mon Sep 19 10:30:45</span> on <span>ttys000</span></p>
                <div className="registro">
                    {passado.map((elemento, index) => (
                        <div key={index}>{elemento}</div>
                    ))}

                </div>

                <div className="terminal">
                    {nome()}
                    <input
                        type="text"
                        className="term-input"
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    )
}

function nome() {
    //augustolindo
    return (
        <p>[<span>gutojj</span>]:- [<span>Augusto</span>]$</p>
    )
}

export default Home

//augustolindo