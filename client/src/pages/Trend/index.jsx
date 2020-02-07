import React from 'react'
import { SectorTable } from 'components'

export const Trend = ({ sectorHealthDataPass, user }) => {

  const sectorHealthData=sectorHealthDataPass
  
  const style = {
    jumbotron: {
      background: "#3f51b5",
      backgroundSize: "cover",
      backgroundColor: "#4682B4",
    }
  }

  if(!sectorHealthDataPass){
    return(null)
  }
  
  return (
    <>
      <div className="jumbotron" style={style.jumbotron}>
        <div className="container for-about">
        <h1 style={{textAlign:"center", color:"white"}}>Sector Dashboard</h1>
        </div>
      </div>
      <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                  <SectorTable user={user} sectorHealthData={sectorHealthData} />
                </div>
            </div>
        </div>
      
    </>
  )
}