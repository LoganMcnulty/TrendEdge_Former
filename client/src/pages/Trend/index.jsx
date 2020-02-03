import React from 'react'
import { SectorTable } from 'components'

export const Trend = ({ sectorHealthDataPass, user }) => {

  const sectorHealthData=sectorHealthDataPass
  
  const style = {
    jumbotron: {
      background: "#3f51b5",
      backgroundSize: "cover"
    }
  }

  if(!sectorHealthDataPass){
    return(null)
  }
  
  return (
    <>
      <div className="jumbotron" style={style.jumbotron}>
        <div className="container for-about">
        <h1 style={{textAlign:"center", color:"white"}}>Sector Health Dashboard</h1>
        </div>
      </div>
      <SectorTable user={user} sectorHealthData={sectorHealthData} />
    </>
  )
}