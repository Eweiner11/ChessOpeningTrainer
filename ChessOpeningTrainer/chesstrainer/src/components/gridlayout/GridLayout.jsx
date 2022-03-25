import React,{useState,useEffect} from 'react'
import StyledBoard from '../StyledBoard'
import SelectedOpenings from '../SelectedOpenings'
import {data} from '../../data/openingData'
import OpeningList from '../OpeningList'
import './gridLayout.css'


function GridLayout() {
const [openingSelected, changeOpeningSelected] = useState([{}])
const [currentMove,setCurrentMove] = useState(1);
const [openingLi,setOpeningLi]=useState([])
const [play,togglePlay]=useState(false)
const [width,setWidth] = useState()
const [hint,setHint] = useState(false)
let selectedOpeningRef = HTMLDivElement|null

function randomSelect(){
  let randomIdx = Math.floor(Math.random()* openingLi.length)
  changeOpeningSelected(openingLi[randomIdx])
  console.log(openingSelected)
}

function update(entryAdded){
  let copy = openingLi;
  setOpeningLi([...copy,entryAdded])


      
}
function removeE(entryRemovedIdx){
  let copy = openingLi.slice()
  copy.splice(entryRemovedIdx,1)
  setOpeningLi(copy)
  togglePlay(false)

}

useEffect(()=>{
    selectedOpeningRef.scrollTo({
        top: 0,
        behavior: 'smooth' // for smoothly scrolling
   });

},[openingLi,selectedOpeningRef])

useEffect(()=>{
  function handleResize(){

    let width = window.innerWidth 

    if(width >768){
     width *= .4
    }else{
      width *=.85
    }

    setWidth(width)
  }
  handleResize()
  window.addEventListener('resize',handleResize)

  return () => window.removeEventListener('resize', handleResize);
},[])
    return (
     <div class="main-grid-container">
       
       <div className = "header">CHESS OPENING TRAINER</div>
       <div className = "main-chessboard-container"><StyledBoard boardWidth = {width} play ={play} currentMove = {currentMove} openingSelected = {openingSelected} changeOpeningSelected = {changeOpeningSelected} setCurrentMove = {setCurrentMove} randomSelect ={randomSelect}/></div>
       <div className = "main-menu">  <div className = "bottom-menu" ref = {node => selectedOpeningRef = node}> <h1 >{openingSelected.text}</h1>{ <h3 className ="hint" onClick = {()=>setHint(!hint)}>{hint? JSON.stringify(openingSelected.moves):"hint"}</h3>}<SelectedOpenings  update = {update} setOpeningLi={setOpeningLi} setCurrentMove = {setCurrentMove} data = {data}/></div> <div className = "top-menu"><OpeningList changeOpeningSelected={  changeOpeningSelected} play ={play} togglePlay ={togglePlay} openingLi = {openingLi} removeE = {removeE} openingSelectedName ={openingSelected.text}/></div></div>
       <div className =  "footer"></div>
    
      </div>
    )
}

export default GridLayout

