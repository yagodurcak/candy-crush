import { useEffect, useState } from "react";

const width = 8;
const candyColors =[
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "yellow"
]


function App() {

  const [totalColorMix, settotalColorMix] = useState([]);

  const mixColors = () => {

    let lista = []

    for (let i = 0; i < width * width; i++) {

      lista.push(candyColors[Math.floor(Math.random() * candyColors.length)])
    }

    settotalColorMix(lista)
  }


  useEffect(() => {
    mixColors()   
  }, []);

  console.log(totalColorMix);


  return (
    <div className="container">
      {totalColorMix.map((bloque, index)=>(

        <div className="block" key={index} style={{backgroundColor: bloque}}></div>
      ))}
        
    </div>
  );
}

export default App;
