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
        <WatchTable user={user} />
    </>
)}

