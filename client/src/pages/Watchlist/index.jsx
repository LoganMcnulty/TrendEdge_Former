import React from 'react'
import { WatchTable } from 'components'

export const Watchlist = ({user}) => {
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
            <h1 style={{textAlign:"center", color:"white"}}>Your Watchlist</h1>
            </div>
        </div>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <WatchTable user={user} />
                </div>
            </div>
        </div>
        
    </>
)}

