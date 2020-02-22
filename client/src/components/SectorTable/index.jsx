import React, { useState, useContext } from 'react';
import UserContext from 'contexts/UserContext';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import columns from 'model/SectorColumns';
import { createSectors } from 'services/createSectors';
import { updateSectorData } from 'services/pullSectors';

export function SectorTable() {
  const { sectorHealthDataPass } = useContext(UserContext);

  const [state, setState] = useState({
    columns,
  });
  return (
    <>
      <MaterialTable
        title='Sector Health Dashboard'
        columns={state.columns}
        data={sectorHealthDataPass}
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
          pageSize: 20,
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
  );
}
