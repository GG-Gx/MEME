import React, { useState, useEffect } from "react";

const MemeComponent = () => {
  const [memes, setMemes] = useState([]);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [currentMeme, setCurrentMeme] = useState(null);
  
  const [memeIndex, setMemeIndex] = useState(0);


  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        setMemes(data.data.memes);
        setCurrentMeme(data.data.memes[0]); 
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    fetchMemes();
  }, []);

 const topImput = (e) => {
    setTopText(e.target.value);
  };

  const bottomImput = (e) => {
    setBottomText(e.target.value);
  };

  const handleUpdateMeme = () => {
    setCurrentMeme({
      ...currentMeme,
      topText,
      bottomText,
    });
  };



  return (
    <div className="mainContainer">
      {currentMeme && (
        
        <div >
          
        <div className="container">
          <h1 className="topText">{topText}</h1>
          <img className="img"src={currentMeme.url} alt={currentMeme.name} />
          <h1 className="bottomText">{bottomText}</h1>
          
        </div>
        
        <div>
          <input
            type="text"
            value={topText}
            onChange= {topImput}
            placeholder="Top text"
          />
          <br />
          <input
            type="text"
            value={bottomText}
            onChange={bottomImput}
            placeholder="Bottom text"
          />
        </div>
        
          <button onClick={handleUpdateMeme}>Generate</button>
          <br />
          <button onClick={() => setMemeIndex(memeIndex + 1)}>Next</button>
          <button onClick={() => setMemeIndex(memeIndex - 1)}>Prev</button>
          
        </div>
        )}

      </div>

  );
};

export default MemeComponent;