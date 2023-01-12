import React, {useState, useEffect, useRef} from "react";

const Home = () => {
 
    let [urlDir, setUrlDir] = useState("");
    const [music, setMusic] = useState([]);

    const handleClick = (event, key) => {
        console.log(event.target);
        console.log(key);
        setUrlDir("https://assets.breatheco.de/apis/sound" + key);
      };
console.log(urlDir)

    

    useEffect(() => {

        fetch('https://assets.breatheco.de/apis/sound/songs').then((response) => response.json()).then((data) => setMusic(data))
    }, [])

    return (<div className="container">
        <div id="interface" className="interfaceClass">
			<div id="header" className="headerClass text-light text-center m-auto">
				<h5 className="p-2">BreatheCode Orange Marios Bros Player</h5>
			</div>
            
                

<div id="listGroup" className="listClass m-4">
                <ol className="pb-3 pt-3"> {music.map((item, key) =>< li onClick={event => handleClick(event, item.url)} className="bg-warning m-1" key = {item.url}>{item.name} </li>)} </ol>
             </div>



            <div id="playerPrbador" className="">
            <audio controls>
              <source
                src={urlDir}
                type="audio/ogg"
              />
              Your browser does not support the audio tag.
            </audio>
          </div>



            <div id="controlBar" className="m-3 d-flex justify-content-center">
                <button className="roundButton m-1"><i className="fa fa-backward"></i></button>
                <button className="roundButton m-1"><i className="fa fa-play"></i></button>
                <button className="roundButton m-1"><i className="fa fa-forward"></i></button>
            </div>
        </div>
    </div>
);;
};

export default Home;
