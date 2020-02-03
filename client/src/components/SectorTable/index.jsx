import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

import { createSectors } from '../../services/createSectors'
import { updateSectorData } from '../../services/pullSectors'

export function SectorTable({ sectorHealthData }) {

  const sectorHealthTableData = sectorHealthData

  const [state, setState] = useState({
    columns: [
      { title: 'Ticker', field: 'symbol' },
      { title: 'Sector', field: 'sectorName' },
      { title: 'Price', field: 'priceTZero' },
      { title: 'Top Holdings Names TEMP', field: 'topHoldingsNames'},
      { title: 'Top Holdings Pct TEMP', field: 'topHoldingsPcts'},

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

        // editable={{
        //   onRowAdd: newData =>
        //     new Promise(resolve => {
        //       setTimeout(() => {
        //         resolve()
        //         setState(prevState => {
        //           const data = [...prevState.data]
        //           data.push(newData)
        //           return { ...prevState, data }
        //         })
        //       }, 600)
        //     }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise(resolve => {
        //       setTimeout(() => {
        //         resolve()
        //         if (oldData) {
        //           setState(prevState => {
        //             const data = [...prevState.data]
        //             data[data.indexOf(oldData)] = newData
        //             return { ...prevState, data }
        //           })
        //         }
        //       }, 600)
        //     }),
        //   onRowDelete: oldData =>
        //     new Promise(resolve => {
        //       setTimeout(() => {
        //         resolve()
        //         deleteWatchListItem(user.email, oldData.indexName, state.data)
        //       }, 600)
        //     })
        // }}
      />
    </React.Fragment>
  )
}
