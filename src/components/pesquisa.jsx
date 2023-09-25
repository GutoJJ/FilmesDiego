import { useEffect, useState } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import '../style/main.sass';
import Detalhes from './detalhes.jsx';

function pesquisa({ pesquisaTitle }) {
    const titulo = pesquisaTitle.charAt(0).toUpperCase() + pesquisaTitle.slice(1);
    function removeWindowPesquisa() {
        document.getElementById("Pesquisa").style.animation = "goOut .5s";
        setTimeout(() => {
            //augustolindo
            document.getElementById("Pesquisa").outerHTML = '';
        }, 450);
    }


    const imagePath = "https://image.tmdb.org/t/p/original";

    const [movies, setMovies] = useState([]);
    const KEY = import.meta.env.VITE_KEY;
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${pesquisaTitle}&api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {//augustolindo
                console.log(data);
                setMovies(data.results);
            });
    }, [KEY]);
    const [passado, setPassado] = useState([]);
    const CriarCard2 = (id) => { //função de detalhes
        console.log(id);
        let novoElemento = (
            <div className='card' key={passado.length}>
                <Detalhes movieId={id} />
                <p>Exibindo detalhes...</p>
            </div>
        );
        setPassado([...passado, novoElemento]);

    }

    return (
        <div className="wrapperPesquisa">


            <Draggable
                handle=".topBar"
            >
                <div className="window" id="Pesquisa">
                    <div className="topBar" id="branco">
                        <div className="botoes">
                            <div className="vermelho" onClick={removeWindowPesquisa}></div>
                            <div className="amarelo"></div>
                            <div className="verde" id="TAPESQUISANDO"></div>
                        </div>
                        <h2>🔍 {titulo}</h2>
                    </div>
                    <div className="results">
                        {movies.map((movie) => {
                            return (
                                <div key={movie.id} className="movieCard"
                                    onClick={() => CriarCard2(movie.id)}
                                    style={{
                                        backgroundImage: `url('${imagePath}${movie.backdrop_path}')`,
                                    }}>
                                    <div className="cardDetails">
                                        <h2>{movie.title}</h2>
                                    </div>
                                </div>
                            );
                            //augustolindo
                        })}
                    </div>

                </div>
            </Draggable>
            {passado.map((elemento, index) => (
                        <div key={index}>{elemento}</div>
            ))}
        </div>
    )
}

export default pesquisa