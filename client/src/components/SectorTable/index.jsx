import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

export function SectorTable({ sectorHealthData }) {

  const sectorHealthTableData = sectorHealthData
  console.log(sectorHealthTableData)

  const [state, setState] = useState({
    columns: [
      { title: 'Ticker', field: 'symbol' },
      { title: 'Sector', field: 'sectorName' },
      { title: 'Price', field: 'priceTZero' },
      { title: 'Top Holdings', field: 'topHoldings'},
      {
        title: 'Trend Health (%)',
        field: 'score',
        type: 'numeric'
      },
    ]
  })

  return (
    <React.Fragment>
      <MaterialTable
        title='Sector Health Dashboard'
        columns={state.columns}
        options={{pageSize:20}}
        data={sectorHealthTableData}
      />
    </React.Fragment>
  )
}