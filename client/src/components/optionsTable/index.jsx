import React, { useState } from 'react'
import MaterialTable from 'material-table'
import { activeOptionsPull } from '../../services/optionsDashboard'

export const OptionsTable = () => {

  const [state, setState] = useState({
    columns: [
      { title: 'Exp. Date', field: 'dates' },
      { title: 'Sector', field: 'sectorName' },
      { title: 'Price', field: 'priceTZero' },
      { title: 'Top Holdings', field: 'topHoldings'},
      {
        title: 'Health (%)',
        field: 'score',
        type: 'numeric'
      },
    ]
  })

  activeOptionsPull("spot")

  return (
    <React.Fragment>
      <h1>hello there</h1> 
      {/* <MaterialTable
        title='Sector Health Dashboard'
        columns={state.columns}
        data={sectorHealthTableData}
        // actions={[
        //   {
        //     icon: 'save',
        //     tooltip: 'View Top Holdings',
        //     onClick: (event, rowData) => {
        //       console.log("Holdings Data for" + rowData.symbol)
        //       console.log(rowData.topHoldingsNames)
        //       console.log(rowData.topHoldingsPcts)
        //     }
        //   }
        // ]}
        // options={{
        //   actionsColumnIndex: 3
        // }}
      /> */}
    </React.Fragment>
  )
}
