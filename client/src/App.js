import React, { useEffect, useState } from 'react'
import Template from 'templates'
import Theme from 'themes'
import Routes from 'routes'
import auth from './services/authService'
import { pullSectorData, calcSectorHealth } from './services/pullSectors'
import { updateAllStocks, updateSectorData } from './services/weeklyCronTasks'

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
