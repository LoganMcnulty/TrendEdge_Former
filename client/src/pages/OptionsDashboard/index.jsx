import React from 'react'
import  { OptionsTable } from 'components'

export const ActiveOptions = () => {
  
  const style = {
    jumbotron: {
      background: "#3f51b5",
      backgroundSize: "cover",
      backgroundColor: "#4682B4",
    }
  }

  return (
    <>
      <div className="jumbotron" style={style.jumbotron}>
        <div className="container for-about">
        <h1 style={{textAlign:"center", color:"white"}}>Most Active Options Dashboard</h1>
        </div>
      </div>
      <OptionsTable />
    </>
  )
}