import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import MaterialTable from 'material-table'
import { createSectors } from '../../services/createSectors'
import { updateSectorData } from '../../services/pullSectors'

export function SectorTable({ sectorHealthData }) {
  const sectorHealthTableData = sectorHealthData
  console.log(sectorHealthTableData)

  const [state, setState] = useState({
    columns: [
      {
        title: 'Ticker',
        field: 'symbol',
      },
      { title: 'Sector', field: 'sectorName' },
      { title: 'Price', field: 'priceTZero' },
      { title: 'Top Holdings', field: 'topHoldings'},
      {
        title: 'Health (%)',
        field: 'score',
        type: 'numeric',
      },
    ],
  })
  return (
    <>
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
        options={{
          // actionsColumnIndex: 3
          toolbar: false,
          draggable: false,
         
        }}
      />

      <Button
        variant='contained'
        color='primary'
        type='submit'
        onClick={createSectors}
      >
        Create
      </Button>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        onClick={updateSectorData}
      >
        Update
      </Button>
    </>
  )
}
