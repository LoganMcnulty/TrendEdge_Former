import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { getWatchList, pullStockData, calcStockHealth, deleteWatchListItem } from '../../services/watchListService'
import { PopoverExampleMulti } from '../../components/popover'

export function WatchTable({ user }) {
  const [state, setState] = useState({
    columns: [
      { title: 'Ticker', field: 'stockName' },
      { title: 'Price', field: 'livePrice', type: 'currency' },
      { title: '% From Fast SMA', field: 'pxPctFast' },
      { title: '% From Slow SMA', field: 'pxPctSlow' },
      { title: 'Fundamentals', field: 'fundamentalsPop'},
      {
        title: 'Trend Health (%)',
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

              stockData.fundamentalsPop = 
              <PopoverExampleMulti 
                key={index} 
                id = {index}
                purpose={"Fundamental Data"}
                popoverBody={
                  stockData.fundamentalData.marketCap != "0" ?
                  <div className="table">
                    <thead>
                      <tr>
                      <th scope="col">Measure</th>
                      <th scope="col">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        <>
                        <tr><td>Market Cap: </td><td>{stockData.fundamentalData.marketCap}</td></tr>
                        <tr><td>Sector: </td><td>{stockData.fundamentalData.sector}</td></tr>
                        <tr><td>Pct. Float Short: </td><td>{(stockData.fundamentalData.sharesShort / stockData.fundamentalData.floatingShares*100).toFixed(2)}%</td></tr>
                        <tr><td>Pct. Float Insider Owned: </td><td>{(stockData.fundamentalData.insidersPctHeld*100).toFixed(2)}%</td></tr>
                        <tr><td>Gross Margins: </td><td>{(stockData.fundamentalData.grossMargins*100).toFixed(2)}%</td></tr>
                        <tr><td>Profit Margins: </td><td>{(stockData.fundamentalData.profitMargins*100).toFixed(2)}%</td></tr>
                        </>
                      }
                    </tbody>
                  </div>
                  : 
                  <div>
                    <p>Fundamental Data is not available for sectors, or data is not available for this stock</p>
                  </div>
                }
              />
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
        options={{pageSize:10}}
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
