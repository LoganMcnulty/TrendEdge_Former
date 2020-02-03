import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { createSectors } from '../../services/createSectors'
import { updateSectorData } from '../../services/pullSectors'

export function SectorTable({ sectorHealthData }) {

  const sectorHealthTableData = sectorHealthData
  console.log(sectorHealthTableData)

  const [state, setState] = useState({
    columns: [
      { title: 'Ticker', field: 'symbol' },
      { title: 'Sector', field: 'sectorName' },
      { title: 'Price', field: 'priceTZero' },
      { title: 'Top Holdings', field: 'topHoldings'},
      // { title: 'Top Holdings Names TEMP', field: 'topHoldingsNames'},
      // { title: 'Top Holdings Pct TEMP', field: 'topHoldingsPcts'},
      {
        title: 'Health (%)',
        field: 'score',
        type: 'numeric'
      },
    ]
  })

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div>
            <button class="btn btn-primary" type="submit" onClick={createSectors}>Create Sectors</button>
            <button class="btn btn-primary" type="submit" onClick={updateSectorData}>update Sector data</button>
          </div>
        </div>
      </div>
      <MaterialTable
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
      />
    </React.Fragment>
  )
}
