import { useEffect, useState } from "react";

import BlankCandy from "./images/blank.png"
import BlueCandy from "./images/blue-candy.png"
import GreenCandy from "./images/green-candy.png"
import OrangeCandy from "./images/orange-candy.png"
import PurpleCandy from "./images/purple-candy.png"
import RedCandy from "./images/red-candy.png"
import YellowCandy from "./images/red-candy.png"

const width = 8;
const candyColors = [
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy
]


function App() {

  const [totalColorMix, settotalColorMix] = useState([]);
  const [startTarget, setStartTarget] = useState(null);
  const [replaceTarget, setReplaceTarget] = useState(null);


  // COLUMN 

  const checkColumnOfFour = () => {

    for (let i = 0; i <= 39; i++) {

      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const colorDecided = totalColorMix[i];

      if (columnOfFour.every(square => totalColorMix[square] === colorDecided)) {
        console.log(colorDecided);
        columnOfFour.forEach(square => totalColorMix[square] = BlankCandy)
        return true
      }
    }
  }
  const checkColumnOfThree = () => {

    for (let i = 0; i <= 47; i++) {

      const columnOfThree = [i, i + width, i + width * 2];
      const colorDecided = totalColorMix[i];

      if (columnOfThree.every(square => totalColorMix[square] === colorDecided)) {
        // console.log(colorDecided);
        columnOfThree.forEach(square => totalColorMix[square] = BlankCandy)
        return true
      }
    }
  }

  // roooww 



  const checkRowOfFour = () => {

    for (let i = 0; i < 64; i++) {

      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const colorDecided = totalColorMix[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]


      if (notValid.includes(i)) continue

      if (rowOfFour.every(square => totalColorMix[square] === colorDecided)) {
        // console.log(colorDecided);
        rowOfFour.forEach(square => totalColorMix[square] = BlankCandy)
        return true
      }
    }
  }

  const checkRowOfThree = () => {

    for (let i = 0; i < 64; i++) {

      const rowOfThree = [i, i + 1, i + 2];
      const colorDecided = totalColorMix[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

      if (notValid.includes(i)) continue

      if (rowOfThree.every(square => totalColorMix[square] === colorDecided)) {
        // console.log(colorDecided);
        rowOfThree.forEach(square => totalColorMix[square] = BlankCandy)
        return true
      }
    }
  }

  ///////////////////////////////////////////

  const mixColors = () => {

    let lista = []

    for (let i = 0; i < width * width; i++) {

      lista.push(candyColors[Math.floor(Math.random() * candyColors.length)])
    }

    settotalColorMix(lista)
  }


  ////////////////////////

  const moveInToSquareBelow = () => {


    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && totalColorMix[i] === BlankCandy) {

        let randomNumber = Math.floor(Math.random() * candyColors.length)
        totalColorMix[i] = candyColors[randomNumber]
      }

      if (totalColorMix[i + width] === BlankCandy) {
        totalColorMix[i + width] = totalColorMix[i]
        totalColorMix[i] = BlankCandy
      }
    }

  }


  useEffect(() => {

    const timer = setInterval(() => {
      checkColumnOfFour()
      checkRowOfFour()
      checkColumnOfThree()
      checkRowOfThree()
      moveInToSquareBelow()
      settotalColorMix([...totalColorMix])

    }, 100);
    return () => clearInterval(timer)
  }, [checkColumnOfFour, checkRowOfFour, checkColumnOfThree, checkRowOfThree, moveInToSquareBelow, totalColorMix]);


  useEffect(() => {
    mixColors()
  }, []);

  const dragStart = (e) => {
    console.log(e.target);
    setStartTarget(e.target)
  }
  const dragDrop = (e) => {

    setReplaceTarget(e.target)
  }
  const dragEnd = () => {
    // console.log(replaceTarget.getAttribute("data-id"));
    const setStartId = parseInt(startTarget.getAttribute("data-id"))
    const setReplaceId = parseInt(replaceTarget.getAttribute("data-id"))
    console.log(startTarget.getAttribute("data-id"));
    console.log(replaceTarget.getAttribute("data-id"));


    totalColorMix[setReplaceId] = startTarget.getAttribute("src")
    totalColorMix[setStartId] = replaceTarget.getAttribute("src")

    console.log("setStartId", setStartId);
    console.log("setReplaceId", setReplaceId);
    console.log(startTarget.getAttribute("src"));
    console.log(replaceTarget.getAttribute("src"));

    const validMoves = [

      setStartId + 1,
      setStartId -1,
      setStartId - width,
      setStartId + width,
    ]

    const validMove = validMoves.includes(setReplaceId)


    const isAColumnAFour = checkColumnOfFour()
    const isAColumnAThree = checkColumnOfThree()
    const isARowAFour = checkRowOfFour()
    const isARowAThree = checkRowOfThree()


    if ( setReplaceId && validMove && (isAColumnAFour || isAColumnAThree || isARowAFour || isARowAThree)) {
        setStartTarget(null)
        setReplaceTarget(null)
    } else {

      totalColorMix[setReplaceId] = replaceTarget.getAttribute("src")
      totalColorMix[setStartId] = startTarget.getAttribute("src")
      settotalColorMix([...totalColorMix])
    }



  }


  return (
    <div className="container">
      <div className="game"  >
        {totalColorMix.map((bloque, index) => (

          <img
            key={index}
            src={bloque}
            alt={bloque}
            draggable={true}
            data-id={index}
            onDragStart={dragStart}
           onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={dragEnd}
            onDrop={dragDrop}
          />))}

      </div>
    </div>
  );
}

export default App;
