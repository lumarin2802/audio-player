import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  // Aquí creamos las variables referenciadas a los hooks que permitirán ir cambiando a medida que sea necesario su valor

  let [urlDir, setUrlDir] = useState("");
  const [music, setMusic] = useState([]);
  // let [pedazoUrl, setPedazoUrl] = useState("");
  let [currentSong, setCurrentSong] = useState("")
  let [isPlaying, setIsPlaying] = useState(false)
  // El useRef nos devuelve la posición actual de la canción y nos permite usarla en el reproductor de audio
  let audioRef = useRef()

 // Acá creamos un evento que estará encargado de escuchar al click que se hace sobre cada elemento en la lista y que nos devuelve el título y url de la canción indicada 
  const handleClick = (event, key, title) => {
    console.log(event.target);
    console.log(key);
    setUrlDir("https://assets.breatheco.de/apis/sound/" + key);
    // setPedazoUrl(key)
    setCurrentSong(title);
        if(isPlaying){
      setIsPlaying(false)
      }
        };

        
// El fetch nos que permite obtener un objeto Javascript de tipo Jason desde Api indicada
  useEffect(() => {

    fetch('https://assets.breatheco.de/apis/sound/songs').then((response) => response.json()).then((data) => setMusic(data))
  }, [])


// Este es el código con el loop y los condicionales necesarios para que cambie hacia adelante de canción en la lista y en el caso de que fuere la última canción, que vuelva a iniciar en el primer elemento de la lista



  const playNext = () => {
		for (let i = 0; i < music.length; i++) {
      let a = i
      a = a + 1
      if ("https://assets.breatheco.de/apis/sound/"+music[i].url === urlDir) 
      {
        setUrlDir("https://assets.breatheco.de/apis/sound/"+music[a].url)
        setIsPlaying(false)
        setCurrentSong(music[a].name)
       }
      
    }}
// Esta función está vinculada al botón "previo" y permite cambiar a la canción anterior, a menos que se esté posicionado en el último elemento y entoncs lo que hace es ir al último elemento mediante un if condicional que evita restarle -1 a 0, lo cual devolvería un error
    const playPrevious = () => {
      for (let i = 0; i < music.length; i++) {
        let a = i
        a = a - 1
        if ("https://assets.breatheco.de/apis/sound/"+music[i].url === urlDir) 
        {
          setUrlDir("https://assets.breatheco.de/apis/sound/"+music[a].url)
          setIsPlaying(false)
          setCurrentSong(music[a].name)
        }
        
      }}

      // Aquí generamos una función que mediante condicionales se encarga de controlar que el botón de play pueda transformarse en un pause cuando haya una canción en modo play
  const play = () =>{
    const audio = audioRef.current
    audio.volume = 0.5
    
    if(!isPlaying){
    setIsPlaying(true)
    audio.play()
    }
    
    if(isPlaying){
    setIsPlaying(false)
    audio.pause()
    }
    }
// Aquí creamos la intefaz gráfica con todos los elementos necesarios  
  return (<div className="container">
    <div id="interface" className="interfaceClass">
      <div id="header" className="headerClass text-light text-center m-auto">
        <h5 className="p-2">Audio Player</h5>
      </div>

      {/* Este es el div que recorrerá y mostrará en una "lista" todos los elementos devueltos por la Api, a la vez que devolverá de cada elemento su url y título de canción */}
      <div id="listGroup" className="listClass m-4 pb-1 pt-1">
        <div> {music.map((item, key, title) => < div onClick={event => handleClick(event, item.url, item.name)} className="claseElemento m-1 text-center" key={item.url}>{item.name} </div>)} </div>
      </div>
{/* En este div se guarda el título actual de la canción que esté en el play */}
      <div className="text-light text-center p-1">
        <p>Current Song: {currentSong}</p>
                   </div>
   {/* Este div contiene al elemento "audio" que es al audio player propiamente dicho, además que contiene los controles necesarios para poner play/pause y previous y next */}
      <div id="controlBar" className="p-1 d-flex justify-content-center">
      <audio src={urlDir} ref={audioRef}> </audio>
        <button onClick={playPrevious} className="roundButton m-1"><i className="fa fa-backward"></i></button>
        <button onClick={play} className="roundButton m-1"><i className="fa fa-play"></i></button>
        <button onClick={playNext} className="roundButton m-1"><i className="fa fa-forward"></i></button>
      </div>
    </div>
  </div>
  );;
};

export default Home;