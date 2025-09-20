import { useState, useEffect, useRef } from "react";
import diegoImg from "./assets/chars/diego.png";
import mentorImg from "./assets/chars/mentor.png";
import sombraImg from "./assets/chars/sombra.png";
import elfaImg from "./assets/chars/elfa.png";

import ciudadImg from "./assets/bg/ciudad.png";
import palacioEntradaImg from "./assets/bg/palacio_entrada.webp";
import palacioAdentroImg from "./assets/bg/palacio_adentro.png";

import fuegoImg from "./assets/bg/fuego.png";
import bosqueImg from "./assets/bg/bosque.png";


import derrotaImg from "./assets/bg/derrota.png";
import victoriaImg from "./assets/bg/ganar.png";

import clickSoundFile from "./assets/sound/click.mp3"; 
import bgMusicFile from "./assets/sound/bgmusic.mp3"; 

const storyNodes = {
  start: {
    text: `Eres Diego, un joven que siempre ha podido crear un sueño lúcido, un reino llamado Zhasx lleno de magia y fantasía.
Pero hoy tienes un examen importante, tu misión es despertar de este mundo.`,
    character: "narrador",
    background: fuegoImg,
    next: "introduccion"
  },
  introduccion: {
    text: "Comienzas a caminar en el bosque donde apareciste, tus oídos escuchan la voz de tu mentor.",
    character: "narrador",
    background: fuegoImg,
    next: "introduccion_mentor"
  },
  introduccion_mentor: {
    text: `A lo lejos ves a tu mentor, HaimeNrique, al lado de una fogata y una elfa de mil años. Nunca podrías olvidar
    el rostro de aquel risueño viejo... él siempre ha estado para ti...`,
    character: "narrador",
    background: fuegoImg,
    next: "mentor"
  },
  mentor: {
    text: "Hola Diego, tiempo sin verte, ¿cómo has estado?",
    character: "mentor",
    background: fuegoImg,
    options: [
      { text: "Bien", next: "mentor_1" },
      { text: "Ignorarlo", next: "mentor_raro" }
    ]
  },
  mentor_1: {
    text: "Me alegro, muchacho, pero recuerda que debes despertar lo más pronto posible, tienes un examen importante.",
    character: "mentor",
    background: fuegoImg,
    options: [
      { text: "Lo sé, pero no recuerdo cómo abrir mis ojos en el mundo real", next: "mentor_final" },
      { text: "Ignorarlo", next: "mentor_raro" }
    ]
  },
  mentor_2: {
    text: "Sé que a veces la pasas mal, muchacho, pero recuerda que debes despertar lo más pronto posible, tienes un examen importante.",
    character: "mentor",
    background: fuegoImg,
    options: [
      { text: "Lo sé, pero no recuerdo cómo despertar", next: "mentor_final" },
    ]
  },
  mentor_raro: {
    text: "¿Por qué me ignoras?... Aún no soy tan viejo para que me ignores...",
    character: "mentor",
    background: fuegoImg,
    next: "mentor_2"
  },
  mentor_final: {
    text: "Debes buscar la corona de los sueños, al tocarla volverás a la realidad, pero ten cuidado, fragmentos de ti, fragmentos oscuros lucharán para que no lo logres. Ve a la ciudad y pregunta por ella.",
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
    text: "Joven Diego, no temas de mí, solo duerme y relájate, este mundo es maravilloso y no debes huir de él.",
    character: "sombra",
    background: bosqueImg,
    options: [
      { text: "Esto debe ser lo que me advirtió mi mentor, mejor lo ignoro", next: "sombra_1" },
      { text: "Escucharlo", next: "fin_malo" },
    ]
  },
  sombra_1: {
    text: "¿Por qué me ignoras? Soy parte de ti, parte de tu mente, no debes huir de mí... Yo mejor me void que zzz.",
    character: "sombra",
    background: bosqueImg,
    next: "ver_ciudad"
  },

  ver_ciudad: {
    text: "Tu encuentro con el hombre sombra fue breve y extraño, pero lograste llegar a la ciudad.",
    character: "narrador",
    background: ciudadImg,
    next: "explorar_ciudad"
  },
  explorar_ciudad: {
    text: "Comienzas a explorar la ciudad y en ese momento lo recuerdas, la corona está en el palacio del rey.",
    character: "narrador",
    background: ciudadImg,
    next: "entrada_del_palacio"
  },
  entrada_del_palacio: {
    text: "Al llegar al palacio ves otro hombre sombra... ellos no deberían estar aquí... ellos son partes oscuras sin poder en Zhasx.",
    character: "narrador",
    background: palacioEntradaImg,
    options: [
      { text: "Hablar con el hombre sombra.", next: "entrada_del_palacio_2" },
      { text: "Golpear al hombre sombra", next: "entrada_del_palacio_3" }
    ]
  },
  entrada_del_palacio_2: {
    text: "Hola Dieguito, duerme, duerme, qué rico es dormir... no debes despertar, el mundo real es aburrido y triste, solo duerme.",
    character: "sombra",
    background: palacioEntradaImg,
    options: [
      { text: "Nunca, mis ganas de dormir son fuertes, pero no me rendiré.", next: "entrada_del_palacio_3" },
      { text: "Bueno", next: "fin_malo" }
    ]  },
  entrada_del_palacio_3: {
    text: "Golpeas al hombre sombra y este se desvanece, sientes algo más de sueño, qué raro...",
    character: "narrador",
    background: palacioEntradaImg,
    next: "palacio"
  },

  palacio: {     
    text: "Entras al palacio, pero te teletransportas a un puente y ves a aquella elfa de mil años que estaba con tu mentor.",
    character: "narrador",
    background: palacioAdentroImg,
    next: "palacio_elfa"
  },
  palacio_elfa: {
    text: "Así que tú eres la que dio poder a los hombres sombra, ¿por qué tienes puesta la corona? Déjame tocarla para ir a mi examen... ¿Quién o qué eres?",
    character: "narrador",
    background: palacioAdentroImg,
    next: "palacio_elfa_2"
  },
  palacio_elfa_2: {
    text: "Dieguito, soy tú, pero el tú que ha aceptado no despertar, el que desea quedarse en Zhasx y nunca volver a fallar, nunca.",
    character: "elfa",
    background: palacioAdentroImg,
    options: [
      { text: "Entiendo... pero, ¿por qué eres una elfa de anime de mil años?", next: "palacio_elfa_3" },
    ]
  },
  palacio_elfa_3: {
    text: "Eso es porque tienes tan poca imaginación que solo pude tomar la forma de personajes de anime que has visto.",
    character: "elfa",
    background: palacioAdentroImg,
    options: [
      { text: "¿Por qué una elfa?", next: "palacio_elfa_4" },
    ]
  },
  palacio_elfa_4: {
    text: "Porque las elfas de mil años son las más sabias y longevas, además de que son muy bellas, ¿no te parece?",
    character: "elfa",
    background: palacioAdentroImg,
    options: [
      { text: "Supongo...", next: "palacio_elfa_5" },
    ]
  },
  palacio_elfa_5: {
    text: "Dejando eso de lado, Dieguito, ¿quieres quedarte en Zhasx y ser su dueño absoluto, o quieres volver a tu triste vida real?",
    character: "elfa",
    background: palacioAdentroImg,
    options: [
      { text: "Aunque la vida sea difícil y haya decepcionado a otros y a mí mismo, debería seguir luchando...", next: "fin_bueno" },
      { text: "Está bien, me quedaré, viviré una vida feliz :D", next: "fin_malo" }
    ]
  },

  fin_bueno: {
    text: "Lo lograste, lograste despertar a tiempo y superar las tentaciones del zzz, felicidades, tal vez repruebes el examen, pero lograste despertar...",
    character: "narrador",
    background: victoriaImg,
    options: [
      { text: "Volver a jugar", next: "start" }
    ]
  },
  fin_malo: {
    text: "Diego se queda atrapado en su sueño. Será el dueño de Zhasx por siempre, pero vivirá en un mundo de fantasía y soledad.",
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
  elfa: { name: "Elfa de mil años", img:  elfaImg},
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
      className="text-xl h-screen w-screen relative flex justify-center items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Escena con personajes */}
      <div className="text-xl  absolute inset-0 flex items-end justify-between px-12">
        {!isEndNode && (
          <img
            src={characters.diego.img}
            alt="Diego"
            className={`h-[65vh] transition-opacity duration-500 ${character === "diego" ? "opacity-100" : "opacity-99"}`}
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
        {character !== "narrador" && <h2 className="font-bold text-xl mb-2">{characters[character].name}</h2>}
        <p className="text-base text-xl">{displayedText}</p>

        {(!options || options.length === 0) && !isTyping && (
          <p className="text-xl text-right text-sm opacity-60 mt-2">
            Haz click para continuar...
          </p>
        )}
      </div>

      {/* Opciones */}
      {options && options.length > 0 && !isTyping && (
        <div className="absolute bottom-8 left-1/2  text-xl text-white transform -translate-x-1/2 w-2/3 space-y-3">
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
