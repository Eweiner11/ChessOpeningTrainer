import React,{useState} from 'react'
import './openingList.css'

function OpeningList(props) {

    function selectRandom(){
        if(props.play){
            props.changeOpeningSelected([])
            return
        }
        let randomIdx = Math.floor(Math.random()* props.openingLi.length)
        let randomOpening = props.openingLi[randomIdx]
        props.changeOpeningSelected(randomOpening)
        
    }
    function handlePlay(){
        if(props.openingLi.length===0){
            alert('please select an opening!')
            return
        }
        selectRandom()
        props.togglePlay(!props.play)
    }
    return (
        <>
        <div>
            {props.openingLi.map((item,i) =>{
                return <div className ={props.openingSelectedName === item.text ? "selected": 'not-selected'} key = {i} onClick = {()=>{props.removeE(i)}}>{item.text} x</div>
            })}
            
        </div>
        <div className = "play-button">
        <button className = {props.play ? "red":"green"}onClick ={handlePlay}>{props.play?'stop':'start'}</button>
        </div>
        </>
    )
}

export default OpeningList
