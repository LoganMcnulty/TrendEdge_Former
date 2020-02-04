import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { getWatchList, pullStockData, calcStockHealth, deleteWatchListItem } from '../../services/watchListService'
import { yahooDataPull } from '../../services/yahooFinance'

export function WatchTable({ user }) {
  const [state, setState] = useState({
    columns: [
      { title: 'Ticker', field: 'indexName' },
      { title: 'Sector', field: 'sector' },
      { title: 'Price', field: 'price' },
      {
        title: 'Health (%)',
        field: 'health',
        type: 'numeric'
      }
    ],
    data: []
  })
  const [addWatchList, setAddWatchList] = useState();
  const [pullSpinner, setPullSpinner] = useState();

  useEffect(() => {
    try {
      setPullSpinner(false);
      getWatchList(user.email).then((loadWatchList) => {
        if (loadWatchList.data.length > 0) {
          loadWatchList.data.forEach((stockData, index) => {
            console.log(stockData)

            calcStockHealth(user.email, stockData).then((health) => {
              // console.log(health)
              loadWatchList.data[index].health = (health * 100).toFixed(1);
              loadWatchList.data[index].indexName = loadWatchList.data[index].indexName.toUpperCase();
              setState({ ...state, data: loadWatchList.data });
            })
              .then(() => {
                console.log("Yahoo data...")
                yahooDataPull(stockData.indexName).then((yahooData) => {
                  console.log(yahooData);
                  console.log(yahooData.data.summaryProfile.sector)
                  console.log(yahooData.data.price.marketCap.fmt)
                  console.log(yahooData.data.price.regularMarketOpen.raw)

                  loadWatchList.data[index].sector = yahooData.data.summaryProfile.sector
                  loadWatchList.data[index].marketCap = `$${yahooData.data.price.marketCap.fmt}`
                  loadWatchList.data[index].price = `$${yahooData.data.price.regularMarketOpen.raw}`
                  setState({ ...state, data: loadWatchList.data }
                  )
                })
              })
          });
        }
      })
    } catch (ex) { console.log("ERROR: " + ex) }
  }, [user])

  const handleWatchlistAdd = (e) => {
    e.preventDefault();
    try {
      setPullSpinner(true);
      pullStockData(user.email, addWatchList, "Test Sector", state.data);
    } catch (err) {
      alert('stock ticker not found - ' + err)
    }
  }

  return (
    <React.Fragment>
      <form class="form-inline">
        <div class="form-group mb-2">
          <label for="stockTicker">Add Ticker to Watchlist: </label>
          <input type="text" class="form-control" id="stockTicker" placeholder="ex: AAPL" onChange={e => setAddWatchList(e.target.value)} />
        </div>
        <button type="submit" class="btn btn-primary mb-2 ml-2 mr-2" onClick={handleWatchlistAdd}>Add Stock</button>
        {pullSpinner && <div class="spinner-border text-primary mb-1"></div>}
      </form>
      <MaterialTable
        title='Watch List'
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve()
                setState(prevState => {
                  const data = [...prevState.data]
                  data.push(newData)
                  return { ...prevState, data }
                })
              }, 600)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve()
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data]
                    data[data.indexOf(oldData)] = newData
                    return { ...prevState, data }
                  })
                }
              }, 600)
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve()
                deleteWatchListItem(user.email, oldData.indexName, state.data)
              }, 600)
            })
        }}
      />
    </React.Fragment>
  )
}
