import { useState, useEffect, useRef } from "react";
import diegoImg from "./assets/chars/diego.png";
import mentorImg from "./assets/chars/mentor.png";
import sombraImg from "./assets/chars/sombra.png";

import fuegoImg from "./assets/bg/fuego.png";
import bosqueImg from "./assets/bg/bosque.png";

import derrotaImg from "./assets/bg/derrota.png";
import clickSoundFile from "./assets/sound/click.mp3"; 
import bgMusicFile from "./assets/sound/bgmusic.mp3"; 

const storyNodes = {
  start: {
    texto: `Eres Diego un joveen  siempre ha podido crear un sueño lúcido, un reino llamado Zhasx lleno de magia y fantasía.
Pero hoy tiene un examen importante, tu misión es despertar de este mundo.`,
    character: "narrador",
    background: fuegoImg,
    next: "introduccion"
  },
  introduccion: {
    text: "Comienzas a caminar en el bosque donde apareciste, tus oidos notan se escucha la voz de HaimeNrique, tu mentor.",
    character: "narrador",
    background: fuegoImg,
    next: "introduccion_mentor"
  },
  introduccion_mentor: {
    text: `A lo lejos ves a tu mentor, HaimeNrique al lado de una fogata y una elfa de mil años. Nunca podría olvidar
    el rostro de aque risueño viejo... el siempre ha estado para ti...`,
    character: "narrador",
    background: fuegoImg,
    next: "mentor"
  },
  mentor: {
    text: "Hola Diego, tiempo sin verte, ¿Cómo has estado?",
    character: "mentor",
    background: fuegoImg,
    options: [
      { text: "Bien", next: "mentor_1" },
      { text: "Ignorarlo", next: "mentor_raro" }
    ]
  },
  mentor_1: {
    text: "Me alegro muchacho, pero recuerda que debes despertar lo más pronto posible, tienes un examen importante.",
    character: "mentor",
    background: fuegoImg,
    options: [
      { text: "Lo sé, pero no recuerdo como hacerlo", next: "mentor_final" },
      { text: "Ignorarlo", next: "mentor_raro" }
    ]
  },
  mentor_2: {
    text: "Sé que a veces la pasas mal muchacho, pero recuerda que debes despertar lo más pronto posible, tienes un examen importante.",
    character: "mentor",
    background: fuegoImg,
    options: [
      { text: "Lo sé, pero no recuerdo como hacerlo", next: "mentor_final" },
    ]
  },
  mentor_raro: {
    text: "¿Por qué me ignoras? Soy tu mentor... Aún no soy tan viejo para que me ignores...",
    character: "mentor",
    background: fuegoImg,
    next: "mentor_2"
  },
  mentor_final: {
    text: "Debes buscar la corona de los sueños, al tocarla volverás a la realidad, pero ten cuidado, partes de ti, partes oscuras lucharán para que no lo logres. Ve a la ciudad y pregunta por ella.",
    character: "mentor",
    background: fuegoImg,
    next: "caminar"
  },
  caminar: {
    text: "Comienzas a caminar hacia la ciudad, pero de repente sientes una presencia extraña...",
    character: "narrador",
    background: bosqueImg,
    next: "sombra"
  },

  sombra: {
    text: "Joven Diego, no temas de mí, solo duerme y relajate, este mundo es maravilloso y no debes huir de el.",
    character: "sombra",
    background: bosqueImg,
    options: [
      { text: "Escucharlo", next: "fin_malo" },
      { text: "Luchar contra él", next: "llegar a ciudad" }
    ]
  },
  
  lucha: {
    text: "Diego lucha entre las sombras y la voz del mentor. ¿Qué camino tomará?",
    character: "narrador",
    background: "/bg/battle.jpg",
    options: [
      { text: "Despertar", next: "fin_bueno" },
      { text: "Seguir durmiendo", next: "fin_malo" }
    ]
  },
  fin_bueno: {
    text: "¡Diego despierta a tiempo para el examen! Fin.",
    character: "narrador",
    background: "/bg/school.jpg"
  },
  fin_malo: {
    text: "Diego se queda atrpado por el sueño, será el dueño de Zhasx por siempre, pero vivirá en un mundo de fantasía y soledad.",
    character: "narrador",
    background: derrotaImg,
    options: [
      { text: "Volver a jugar", next: "start" }
    ]
  }
};

const characters = {
  diego: { name: "Diego", img: diegoImg },
  mentor: { name: "HaimeNrique", img: mentorImg },
  sombra: { name: "Hombre Sombra", img: sombraImg },
  narrador: { name: "", img: "" }
};

export default function App() {
  const [node, setNode] = useState("start");
  const { text, options, character, background, next } = storyNodes[node];

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const typingInterval = useRef(null);
  const clickSound = useRef(new Audio(clickSoundFile));
  const bgMusic = useRef(new Audio(bgMusicFile));
  const [musicStarted, setMusicStarted] = useState(false);

  const isEndNode = node === "fin_bueno" || node === "fin_malo";

  // efecto de tipeo
  useEffect(() => {
    if (!text) return;

    let i = -1;
    setDisplayedText("");
    setIsTyping(true);

    typingInterval.current = setInterval(() => {
      setDisplayedText((prev) => prev + (text[i] ?? ""));
      i++;
      if (i >= text.length) {
        clearInterval(typingInterval.current);
        typingInterval.current = null;
        setIsTyping(false);
      }
    }, 35);

    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current);
    };
  }, [text]);

  const handleClickNext = () => {
    if (!musicStarted) {
      // iniciar música al primer click (evita bloqueo autoplay)
      bgMusic.current.loop = true;
      bgMusic.current.volume = 0.2;
      bgMusic.current.play().catch(() => console.log("Música bloqueada"));
      setMusicStarted(true);
    }

    clickSound.current.play();

    if (isTyping) {
      // completar tipeo inmediatamente
      if (typingInterval.current) {
        clearInterval(typingInterval.current);
        typingInterval.current = null;
      }
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    // avanzar automáticamente si no hay opciones
    if ((!options || options.length === 0) && next) {
      setNode(next);
    }
  };

  return (
    <div
      className="h-screen w-screen relative flex justify-center items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Escena con personajes */}
      <div className="absolute inset-0 flex items-end justify-between px-12">
        {!isEndNode && (
          <img
            src={characters.diego.img}
            alt="Diego"
            className={`h-[65vh] transition-opacity duration-500 ${character === "diego" ? "opacity-100" : "opacity-80"}`}
          />
        )}
        {character !== "narrador" && (
          <img
            src={characters[character].img}
            alt={characters[character].name}
            className="h-[65vh] transition-opacity duration-500 opacity-100"
          />
        )}
      </div>

      {/* Cuadro de diálogo */}
      <div
        className="absolute bottom-60 left-1/2 transform -translate-x-1/2 w-2/3 bg-blue-700/80 text-white p-6 rounded-lg cursor-pointer"
        onClick={handleClickNext}
      >
        {character !== "narrador" && <h2 className="font-bold text-lg mb-2">{characters[character].name}</h2>}
        <p className="text-base">{displayedText}</p>

        {(!options || options.length === 0) && !isTyping && (
          <p className="text-right text-sm opacity-60 mt-2">
            Haz click para continuar...
          </p>
        )}
      </div>

      {/* Opciones */}
      {options && options.length > 0 && !isTyping && (
        <div className="absolute bottom-8 left-1/2 text-white transform -translate-x-1/2 w-2/3 space-y-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => {
                clickSound.current.play();
                setNode(opt.next);
              }}
              className="w-full p-3 bg-blue-600/80 hover:bg-blue-700/90 rounded text-left"
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
