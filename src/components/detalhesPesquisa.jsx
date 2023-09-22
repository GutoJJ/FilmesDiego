import '../style/main.sass';
import Diego from "../img/easter.png";
//augustolindo
import { useEffect, useState } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import Vibrant from 'node-vibrant';


function detalhesPesquisa({ movieId }) {
    const titulo = "Titulo";

    function removeWindow() {
        document.getElementById(movieId).style.animation = "goOut .5s";
        setTimeout(() => {
            //augustolindo
            document.getElementById(movieId).outerHTML = '';
        }, 450);
    }

    const id = movieId;
    const imagePath = "https://image.tmdb.org/t/p/original";
    console.log("id tá aqui "+id);
    const [movie, setMovie] = useState([]);
    const KEY = import.meta.env.VITE_KEY;
    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data) {
                    setMovie(data);
                } else {
                    // Handle the case where no results are found
                    console.error("No movie data found in the API response.");
                }
            }); // eslint-disable-next-line
    }, []);
    
    

    const imagem = imagePath + movie.poster_path;
    const corsImageModified = new Image();
    corsImageModified.crossOrigin = "Anonymous";
    corsImageModified.src = imagem + "?not-from-cache-please";
    corsImageModified.onload = () => {
        //augustolindo
        var v = new Vibrant(corsImageModified);
        v.getPalette((err, palette) => {
            if (!err) {
                const mainColorHex = getDominantColor(palette);

                console.log("Cor principal da imagem em hexadecimal: " + mainColorHex);
                document.getElementById(movieId).style.background = `linear-gradient(90deg, ${mainColorHex} 0.08%, rgba(242, 241, 241, 0.85) 41.34%)`;
            } else {
                console.error("Erro ao obter a paleta de cores: " + err);
            }
        });
    };
    function getDominantColor(palette) {

        let dominantColor = "";
        let maxCount = 0;
        
        for (const color in palette) {
            const count = palette[color].population;
            if (count > maxCount) {
                maxCount = count;
                dominantColor = palette[color].getHex();
            }
        }

        return dominantColor;
    }
    return (
        <Draggable
            handle=".topBar"
        >
            <div className="window" id={movieId}>
                <div className="topBar" id="branco">
                    <div className="botoes">
                        <div onClick={removeWindow} className="vermelho"></div>
                        <div className="amarelo"></div>
                        <div className="verde"></div>
                    </div>
                    <h2>📽  {movie.title || titulo}</h2>
                    <p className="faded">{movieId}</p>
                </div>
                <div className="cardContent">
                    <img className='poster' src={`${imagePath}${movie.poster_path}`} alt={Diego} />
                    <div className="card-text">
                        <h2>Nota: <span>{movie.vote_average}🌟 </span></h2>
                        <h2>Data de lançamento: <span>{movie.release_date}</span> </h2>
                        <h2>Descrição: <span>{movie.overview}</span></h2>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default detalhesPesquisa





















































//augustolindo