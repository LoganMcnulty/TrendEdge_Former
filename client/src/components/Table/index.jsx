import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { getWatchList, pullStockData, calcStockHealth, deleteWatchListItem } from '../../services/watchListService'
import { yahooDataPull } from '../../services/yahooFinance'

export function WatchTable({ user }) {
  const [state, setState] = useState({
    columns: [
      { title: 'Ticker', field: 'stockName' },
      { title: 'Price', field: 'livePrice', type: 'currency' },
      { title: '% From Fast SMA', field: 'pxPctFast' },
      { title: '% From Slow SMA', field: 'pxPctSlow' },
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
        console.log(loadWatchList);
        if (loadWatchList.userWatchList.length > 0) {
          loadWatchList.userWatchList.forEach((stockData, index) => {
            console.log(stockData)
            calcStockHealth(user.email, stockData).then((health) => {
              stockData.health = (health * 100).toFixed(1);
              stockData.stockName = stockData.stockName.toUpperCase();
              let fastSMASum = 0;
              for (let i = 0; i < loadWatchList.userSettings.fastSMA; i++) { fastSMASum += stockData.priceData[i] }
              stockData.pxPctFast = (( stockData.priceData[0] - (fastSMASum / loadWatchList.userSettings.fastSMA) ) / (fastSMASum / loadWatchList.userSettings.fastSMA) * 100).toFixed(2) + "%";
              let slowSMASum = 0;
              for (let i = 0; i < loadWatchList.userSettings.slowSMA; i++) { slowSMASum += stockData.priceData[i] }
              stockData.pxPctSlow = (( stockData.priceData[0] - (slowSMASum / loadWatchList.userSettings.slowSMA) ) / (slowSMASum / loadWatchList.userSettings.slowSMA) * 100).toFixed(2) + "%";

              setState({ ...state, data: loadWatchList.userWatchList });
            })
          })
        }
      })
    } catch (ex) { console.log("ERROR: " + ex) }
  }, [user])

  const handleWatchlistAdd = (e) => {
    e.preventDefault();
    try {
      setPullSpinner(true);
      pullStockData(user.email, addWatchList);
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
                deleteWatchListItem(user.email, oldData.stockName, state.data)
              }, 600)
            })
        }}
      />
    </React.Fragment>
  )
}
