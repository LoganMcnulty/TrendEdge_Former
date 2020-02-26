import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

export function OptionsTable( {optionsData} ) {
  console.log("OPTIONS DATA REACHES TABLE")
  console.log(optionsData)
  let rowSize 
  const rowSizeFunc = () => {
    if (optionsData.length < 10){
      rowSize = 10
    }
    else {
      rowSize = 20
    }
  }
  rowSizeFunc()
  const [state, setState] = useState({
    columns: [
      { title: 'Call/Put', field: 'callPut' },
      { title: 'Exp. Date', field: 'expDate' },
      { title: 'Strike', field: 'strike', type: 'numeric' },
      { title: 'Ask', field: 'ask'},
      { title: "Today's Chg.", field: 'todayChg', type: 'numeric'},
      { title: 'Volume', field: 'volume', type: 'numeric'},
      { title: 'Open Int.', field: 'oI', type: 'numeric'},
      { title: 'Vol/OI %', field: 'volOi', type: 'numeric'},
    ]
  })
  return (
    <React.Fragment>
      <MaterialTable
        title='Active Options Dashboard'
        columns={state.columns}
        options={{pageSize:rowSize}}
        data={optionsData}
      />
    </React.Fragment>
  )
}