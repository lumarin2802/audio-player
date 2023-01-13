import React, { useState, useEffect, useRef } from "react";

const App = () => {

  let [urlDir, setUrlDir] = useState("");
  const [music, setMusic] = useState([]);
  // let [pedazoUrl, setPedazoUrl] = useState("");
  let [currentSong, setCurrentSong] = useState("")
  let [isPlaying, setIsPlaying] = useState(false)
  let audioRef = useRef()

 
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

        

  useEffect(() => {

    fetch('https://assets.breatheco.de/apis/sound/songs').then((response) => response.json()).then((data) => setMusic(data))
  }, [])






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

  return (<div className="container">
    <div id="interface" className="interfaceClass">
      <div id="header" className="headerClass text-light text-center m-auto">
        <h5 className="p-2">Audio Player</h5>
      </div>


      <div id="listGroup" className="listClass m-4 pb-1 pt-1">
        <div> {music.map((item, key, title) => < div onClick={event => handleClick(event, item.url, item.name)} className="claseElemento m-1 text-center" key={item.url}>{item.name} </div>)} </div>
      </div>

      <div className="text-light text-center p-1">
        <p>Current Song: {currentSong}</p>
                   </div>
   
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

export default App;