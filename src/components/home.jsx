import "../style/main.sass";
import React, { useState, useEffect } from "react";
// import Diego from "../img/easter.png";
import Detalhes from "./detalhes.jsx";
import Nostalgia from "../img/lullaby.mp3";
import Pesquisa from "./pesquisa.jsx";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [passado, setPassado] = useState([]);

  const imagePath = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const KEY = import.meta.env.VITE_KEY;

  useEffect(() => {
    document.querySelector(".wrapper").style.backgroundSize = "200%";
    document.querySelector(".wrapper").style.transition =
      "background-size 1.5s ease";

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`,
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, [KEY]);

  const copyContato = () => {
    const email = "gutojung12@hotmail.com";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  let novoElemento;
  const handleKeyDown = (event) => {
    //comandos
    if (event.key === "Enter") {
      event.preventDefault();
      let separado = inputValue.split(" ");

      switch (separado[0].toLowerCase()) {
        case "clear":
          document.querySelector(".registro").innerHTML = "";
          setTimeout(function () {
            document.querySelector(".registro").innerHTML = "";
          }, 1);
          break;
          break;
        case "ls":
          novoElemento = (
            <div key={passado.length}>
              {DfName({ inputValue })}
              <p>
                📽 <span>|</span> Listando filmes e séries...
              </p>
              <p>======================================</p>
              {movies.map((movie) => {
                return (
                  <button
                    key={movie.id}
                    className="color"
                    onClick={() => CriarCard(movie.id)}
                  >
                    🎞 <span>| </span>
                    {movie.title}{" "}
                  </button>
                );
              })}
              <p>======================================</p>
            </div>
          );
          break;
        case "qualquermerda":
          novoElemento = (
            <div key={passado.length}>
              {DfName({ inputValue })}
              <p>
                💩 <span>|</span> Vai aparecer qualquer <span>merda</span> na
                tela
              </p>
            </div>
          );
          break;
        case "burro":
          novoElemento = (
            <div key={passado.length}>
              {DfName({ inputValue })}
              <p>
                🤡 <span>|</span>{" "}
                <span className="vermei">{separado[1] || "O usuário"}</span> é
                burro
              </p>
            </div>
          );
          break;
        case "nostalgia":
          const audioElement = new Audio(Nostalgia);
          audioElement.volume = 0.1;
          audioElement.play();
          novoElemento = (
            <div key={passado.length}>
              {DfName({ inputValue })}
              <p>
                😿 <span>|</span> Isso traz boas lembranças
              </p>
            </div>
          );
          break;
        case "salve":
        case "oi":
          novoElemento = (
            <div key={passado.length}>
              {DfName({ inputValue })}
              <p>
                👋 <span>|</span> Salve
              </p>
            </div>
          );
          break;
        case "kill":
          document.getElementById(separado[1]).style.animation = "goOut .5s";
          setTimeout(() => {
            document.getElementById(separado[1]).outerHTML = "";
          }, 450);
          break;
        case "find":
          if (document.getElementById("TAPESQUISANDO")) {
            novoElemento = (
              <div className="pesquisar" key={passado.length}>
                {DfName({ inputValue })}
                <p>
                  ⚠ <span>|</span> Feche a aba de pesquisa primeiro!
                </p>
              </div>
            );
          } else {
            // console.log("Pesquisando: " + separado[1]);
            novoElemento = (
              <div className="pesquisar" key={passado.length}>
                {DfName({ inputValue })}
                <Pesquisa pesquisaTitle={separado[1]} />
                <p>Exibindo Pesquisa...</p>
              </div>
            );
          }

          break;
        case "help":
          novoElemento = (
            <div key={passado.length}>
              {DfName({ inputValue })}
              <p>📚 <span>|</span> <span className="color">Comandos Disponíveis:</span></p>
              <p>======================================</p>
              <p>  🎬 <span>ls</span> - Listar filmes e séries</p>
              <p>  🔍 <span>find [termo]</span> - Pesquisar filmes</p>
              <p>  🗑️ <span>clear</span> - Limpar o histórico</p>
              <p>  👋 <span>oi / salve</span> - Saudação</p>
              <p>  😿 <span>nostalgia</span> - Toca uma música nostálgica</p>
              <p>  🤡 <span>burro [nome]</span> - Insultar alguém</p>
              <p>  💩 <span>qualquermerda</span> - Mensagem aleatória</p>
              <p>  ❌ <span>kill [id]</span> - Remover elemento</p>
              <p>  📧 <span>contato</span> - Exibir informações de contato</p>
              <p>  📚 <span>help</span> - Mostrar esta mensagem</p>
              <p>======================================</p>
            </div>
          );
          break;
        case "contato":
          novoElemento = (
            <div className="contato" key={passado.length}>
              {DfName({ inputValue })}
              <p>
                📧 <span>|</span> Email: <span className="pointer" onClick={copyContato}>
                  gutojung12@hotmail.com
                </span>
              </p>
            </div>
          );
          break;
        default:
          novoElemento = (
            <div key={passado.length}>
              {DfName({ inputValue })}
              <p>Comando Inválido!</p>
            </div>
          );
      }
      setPassado((prev) => [...prev, novoElemento]);

      setInputValue("");
    }
  };

  const CriarCard = (id) => {
    //função de detalhes
    // console.log(id);

    novoElemento = (
      <div className="card" key={passado.length}>
        <Detalhes movieId={id} />
      </div>
    );
    setPassado((prev) => [...prev, novoElemento]);
  };

  const removeWindowTerminal = () => {
    //remover telinha de prompt
    document.querySelector(".container").style.animation = "goOut .5s";
    setTimeout(function () {
      document.querySelector(".wrapper").innerHTML = "";
      location.reload();
    }, 450);
  };

  return (
    <div className="container" id="all">
      <div className="topBar">
        <div className="botoes">
          <div onClick={removeWindowTerminal} className="vermelho"></div>
          <div className="amarelo"></div>
          <div className="verde"></div>
        </div>
        <h2>gutojj</h2>
      </div>

      <div className="content">
        <p className="header-text">
          Last login: <span> Mon Sep 19 10:30:45</span> on <span>ttys000</span>
        </p>
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
  );
}

function nome() {
  return (
    <p>
      [<span>gutojj</span>]:- [<span>User</span>]$
    </p>
  );
}

// Função recebe um objeto
function DfName({ inputValue }) {
  return (
    <p>
      [<span>gutojj</span>]:- [<span>User</span>]${" "}
      <span className="color">{inputValue}</span> <br />
    </p>
  );
}

// Usar no JSX
// {DfName({ inputValue })}

export default Home;
