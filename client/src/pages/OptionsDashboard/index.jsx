import React, { useState, useEffect } from 'react'
import  { OptionsTable } from 'components'
import { activeOptionsPull } from '../../services/activeOptionsPull'
import Paper from '@material-ui/core/Paper'

export const ActiveOptions = () => {
  const style = {
    jumbotron: {
      background: "#3f51b5",
      backgroundSize: "cover",
      backgroundColor: "#4682B4",
      marginBottom: "0"
    }
  }

  const [optionsData, setOptionsData] = useState()

  useEffect(() => {
    try {
      console.log("RENDER!")
      // handleOptionsPull = (ticker) => {}

        activeOptionsPull("SPOT").then((data) => {
          setOptionsData(data)
        })

    } catch (ex) {}
  }, [])

{/* <button onClick="handleOptionsPull">  */}

  return (
    <>
        <div className="jumbotron" style={style.jumbotron}>
          <div className="container for-about">
          <h1 style={{textAlign:"center", color:"white"}}>Active Options Dashboard</h1>
          </div>
        </div>

        <div className="container">
          <div className="d-flex justify-content-center h-100" style={{padding:"2%"}}>
            <div className="searchbar">
              <input className="search_input" type="text" name="" placeholder="Search..." />
              <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
            </div>
          </div>
        </div>

        <div className="container">
          <Paper elevation={6} style={{ marginBottom: '2%', padding:"2%" }}>
            <div className="row justify-content-around">
              <div className="col-lg-10">
                { optionsData && (<OptionsTable optionsData={optionsData}/>) } 
              </div>
            </div>
          </Paper>
        </div>
    </>
    )
  }




  