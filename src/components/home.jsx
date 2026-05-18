import "../style/main.sass";
import React, { useState, useEffect } from "react";
import Detalhes from "./detalhes.jsx";
import Nostalgia from "../img/lullaby.mp3";
import Pesquisa from "./pesquisa.jsx";
import Apple from "../img/apple.png";

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
              <p>
                📚 <span>|</span>{" "}
                <span className="color">Comandos Disponíveis:</span>
              </p>
              <p>======================================</p>
              <p>
                {" "}
                🎬 <span>ls</span> - Listar filmes e séries
              </p>
              <p>
                {" "}
                🔍 <span>find [termo]</span> - Pesquisar filmes
              </p>
              <p>
                {" "}
                🗑️ <span>clear</span> - Limpar o histórico
              </p>
              <p>
                {" "}
                👋 <span>oi / salve</span> - Saudação
              </p>
              {/* <p>
                {" "}
                😿 <span>nostalgia</span> - Toca uma música nostálgica
              </p> */}
              <p>
                {" "}
                ❌ <span>kill [id]</span> - Remover elemento
              </p>
              <p>
                {" "}
                📨 <span>contato</span> - Exibir informações de contato
              </p>
              <p>
                {" "}
                👨‍💻 <span>curriculo / cv</span> - Exibir currículo completo | 🚧 WIP
              </p>
              <p>
                {" "}
                📚 <span>help</span> - Mostrar esta mensagem
              </p>
              <p>======================================</p>
            </div>
          );
          break;
        case "curriculo":
        case "cv":
          novoElemento = (
            <div className="curriculo" key={passado.length}>
              {DfName({ inputValue })}
              <p className="cv-header">
                ╭────────────────────────────────────────────────╮
              </p>
              <p className="cv-header">
                │ <span className="color">AUGUSTO JUNG</span> │
              </p>
              <p className="cv-header">
                ╰────────────────────────────────────────────────╯
              </p>
              <p></p>
              <p>📍 21 anos | Taquara, RS, Brasil</p>
              <p>📞 (51) 99275-3047</p>
              <p>
                📧{" "}
                <span className="pointer" onClick={copyContato}>
                  gutojung12@hotmail.com
                </span>
              </p>
              <p>💼 LinkedIn: @gutojj</p>
              <p></p>
              <p>
                <span className="color">═══ RESUMO DE QUALIFICAÇÕES ═══</span>
              </p>
              <p></p>
              <p>
                Desenvolvedor Back-end com experiência na construção de APIs
              </p>
              <p>
                escaláveis e integrações entre sistemas, atuando principalmente
              </p>
              <p>
                com Node.js e serviços em nuvem AWS. Vivência no desenvolvimento
              </p>
              <p>
                de soluções voltadas ao setor de turismo e integração de
                sistemas
              </p>
              <p>
                corporativos, com foco em performance, escalabilidade e
                automação
              </p>
              <p>de processos.</p>
              <p></p>
              <p>
                <span className="color">
                  ═══ EXPERIÊNCIAS PROFISSIONAIS ═══
                </span>
              </p>
              <p></p>
              <p>
                <span className="color">2024 a 2025 Allinsys</span>
              </p>
              <p>Desenvolvedor Back-end</p>
              <p>
                • Desenvolvimento e manutenção de APIs com Node.js para turismo
              </p>
              <p>• Chat com tradução em tempo real usando Google Translate</p>
              <p>• Integração com IA (Gemini) para recomendação de destinos</p>
              <p></p>
              <p>
                <span className="color">2025 a 2026 KXC Tecnologia</span>
              </p>
              <p>Desenvolvedor Back-end / Cloud</p>
              <p>
                • Integrações TypeScript entre sistemas de CRM e AWS Partner
                Central
              </p>
              <p>• Soluções em cloud computing com AWS (ECS, EC2, RDS, S3)</p>
              <p></p>
              <p>
                <span className="color">═══ FORMAÇÃO ACADÊMICA ═══</span>
              </p>
              <p></p>
              <p>Curso Técnico em Informática - concluído em 2024</p>
              <p>CIMOL</p>
              <p></p>
              <p>
                <span className="color">═══ CERTIFICAÇÕES ═══</span>
              </p>
              <p></p>
              <p>• AWS Cloud Practitioner (CLF-C02) - 2025</p>
              <p>• Dev the Devs - 2023 - PUCRS</p>
              <p> ◦ Curso de lógica e programação</p>
              <p></p>
              <p>
                <span className="color">═══ IDIOMAS ═══</span>
              </p>
              <p></p>
              <p>Inglês - Avançado</p>
            </div>
          );
          break;
        case "contato":
          novoElemento = (
            <div className="contato" key={passado.length}>
              {DfName({ inputValue })}
              <p>
                📨 <span>|</span> Email:{" "}
                <span className="pointer" onClick={copyContato}>
                  gutojung12@hotmail.com
                </span>
              </p>
              <p>
                📸 <span>|</span> Instagram:{" "}
                <span className="pointer" onClick={copyContato}>
                  @guto.jung
                </span>
              </p>
              <p>
                💼 <span>|</span> Linkedin:{" "}
                <span className="pointer" onClick={copyContato}>
                  @gutojj
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
    novoElemento = (
      <div className="card" key={passado.length}>
        <Detalhes movieId={id} />
      </div>
    );
    setPassado((prev) => [...prev, novoElemento]);
  };

  const removeWindowTerminal = () => {
    //remover telinha de prompt
    document.querySelector(".mcOS").style.animation = "goOut .5s";
    setTimeout(function () {
      document.querySelector(".wrapper").innerHTML = "";
      location.reload();
    }, 450);
  };

  return (
    <div className="container">
      <div className="bdTarefas">
        <div className="left">
          {/* <img src={Apple} alt="Logo da Apple" /> */}
          <p className="open">GutoJJ</p>
          <p> | 🚧 </p>
        </div>
      </div>

      <div className="mcOS" id="all">
        <div className="topBar">
          <div className="botoes">
            <div
              onClick={removeWindowTerminal}
              className="vermelho botao"
            ></div>
            <div className="amarelo botao"></div>
            <div className="verde botao"></div>
          </div>
          <h2>GutoJJ</h2>
        </div>

        <div className="content">
          <p className="header-text">
            Last login: <span> Mon Sep 19 10:30:45</span> on{" "}
            <span>ttys000</span>
          </p>
          <div className="welcome-message">
            <p>╭───────────────────────────────╮</p>
            <p> &nbsp; Bem-vindo ao meu Portfólio&nbsp; </p>
            <p>╰───────────────────────────────╯</p>
            <p></p>
            <p>🎬 Explore filmes e séries através do terminal</p>
            <p></p>
            <p>
              Digite <span className="color">help</span> para ver os comandos
              disponíveis.
            </p>
            <p></p>
          </div>
          <div className="registro">
            {passado.map((elemento, index) => (
              <div key={index}>{elemento}</div>
            ))}
          </div>

          <div className="terminal">
            <p>
              [<span>gutojj</span>]:- [<span>User</span>]$
            </p>
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
    </div>
  );
}

function DfName({ inputValue }) {
  return (
    <p>
      [<span>gutojj</span>]:- [<span>User</span>]${" "}
      <span className="color">{inputValue}</span> <br />
    </p>
  );
}

export default Home;
