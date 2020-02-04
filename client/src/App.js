import React, { useEffect, useState } from 'react'
import Template from 'templates'
import Theme from 'themes'
import Routes from 'routes'
import auth from './services/authService'
import { pullSectorData } from './services/pullSectors'
import { calcSectorHealth } from './services/calcSectorHealth'

export default function App() {

  const [user, setUser] = useState()
  const [sectorHealthDataPass, setSectorHealthData] = useState()

  useEffect(() => {
    try {
      // Pull current user info, set to state, pass to Routes
        const userData = auth.getCurrentUser()
        setUser(userData)
        console.log("CURRENT USER...")
        console.log(userData)
      
      // cron job that updates the sectorData in the database weekly
        // updateSectorData()

      // pull sectorData from DB, calc trendhealths, pass to Routes
        pullSectorData().then((sectorData) => {
          const sectorHealthCalc = calcSectorHealth(sectorData);
          setSectorHealthData(sectorHealthCalc)
        })
    } catch (ex) {}
  }, [])

  // wait until sector healths finish calcing to pass to Routes
    if(!sectorHealthDataPass){
      return(null)
    }

  return (
    <Theme>
      <Template>
        <Routes user={user} sectorHealthDataPass={sectorHealthDataPass}/>
      </Template>
    </Theme>
  )
}
