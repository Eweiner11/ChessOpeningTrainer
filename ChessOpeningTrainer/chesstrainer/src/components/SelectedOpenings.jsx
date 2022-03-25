import React, { useState,useEffect} from 'react'
import './selectedOpenings.css'

function SelectedOpenings(props) {

    const [list, setList] = useState({ current: props.data, previous: null })
  


    function selectOpening(opening) {
        props.setCurrentMove(1)
        props.setOpeningLi([opening])
  
    }

function renderBackButton(){
    return list.previous !== null ?  <div className = 'back-button' onClick={() => { handleBack(list.previous) }}>back</div>:null

}
////////////////////////////////////
    function changeList(currentList, idx) {
        let listCopy = list.current[idx].items;

        setList(listCopy)
        if (listCopy === null) return;
        setList({ current: listCopy, previous: currentList })
   
        
    }
///////////////////////////////////
    function handleBack(previous) {
        if(previous===null)return
        setList(previous)
    }

////////////////////////////////////



    return (
        <div className="selected-openings" 
        >

           {renderBackButton()}

            {list.current.map((item, i) => {

                return (<div
                    className="opening-list-item"
                   
                > <span className = 'opening-title'onClick={() => {
                    selectOpening(item)
           
                    props.update(item)

                }}>{item.text}</span>
                <span className="arrow" onClick ={()=>changeList(list,i)}>▼</span></div>
                )
            })}
           
        </div>
    )
}

export default SelectedOpenings


