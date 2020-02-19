import React, { useState, useEffect, useContext } from 'react';
import UserContext from 'contexts/UserContext';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import { AddSpinner } from 'components';
import TextField from '@material-ui/core/TextField';
import {
  getWatchList,
  pullStockData,
  calcStockHealth,
  deleteWatchListItem,
} from '../../services/watchListService';
import { yahooDataPull } from '../../services/yahooFinance';

export function WatchTable() {
  const [state, setState] = useState({
    columns: [
      { title: 'Ticker', field: 'stockName' },
      { title: 'Price', field: 'livePrice', type: 'currency' },
      { title: '% From Fast SMA', field: 'pxPctFast' },
      { title: '% From Slow SMA', field: 'pxPctSlow' },
      {
        title: 'Trend Health (%)',
        field: 'health',
        type: 'numeric',
      },
    ],
    data: [],
  });
  const [addWatchList, setAddWatchList] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(UserContext);
  const timer = React.useRef();

  useEffect(() => {
    try {
      clearTimeout(timer.current);
      getWatchList(user.email).then(loadWatchList => {
        console.log(loadWatchList);
        if (loadWatchList.userWatchList.length > 0) {
          loadWatchList.userWatchList.forEach((stockData, index) => {
            console.log(stockData);
            calcStockHealth(user.email, stockData).then(health => {
              stockData.health = (health * 100).toFixed(1);
              stockData.stockName = stockData.stockName.toUpperCase();
              let fastSMASum = 0;
              for (let i = 0; i < loadWatchList.userSettings.fastSMA; i++) {
                fastSMASum += stockData.priceData[i];
              }
              stockData.pxPctFast =
                (
                  ((stockData.priceData[0] -
                    fastSMASum / loadWatchList.userSettings.fastSMA) /
                    (fastSMASum / loadWatchList.userSettings.fastSMA)) *
                  100
                ).toFixed(2) + '%';
              let slowSMASum = 0;
              for (let i = 0; i < loadWatchList.userSettings.slowSMA; i++) {
                slowSMASum += stockData.priceData[i];
              }
              stockData.pxPctSlow =
                (
                  ((stockData.priceData[0] -
                    slowSMASum / loadWatchList.userSettings.slowSMA) /
                    (slowSMASum / loadWatchList.userSettings.slowSMA)) *
                  100
                ).toFixed(2) + '%';

              setState({ ...state, data: loadWatchList.userWatchList });
            });
          });
        }
      }, []);
    } catch (ex) {
      console.log('ERROR: ' + ex);
    }
  }, [user]);

  /* FIXME:  
  *   Fix handlewatchlistadd
  *   add error to spinner - reducer?
  *   make into hook
  */
 
  const handleWatchlistAdd = e => {
    e.preventDefault();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        pullStockData(user.email, addWatchList);
        setSuccess(true);
        setLoading(false);
      }, 2000);
    } 
  };

  return (
    <>
      <Grid container item direction='column' spacing={3}>
        <Grid container item direction='row' spacing={2}>
          <Grid item>
            <TextField
              helperText='Add Ticker to Watchlist'
              type='text'
              id='stockTicker'
              placeholder='ex: AAPL'
              onChange={e => setAddWatchList(e.target.value)}
            />
          </Grid>
          <Grid item>
            <AddSpinner
              handleWatchlistAdd={handleWatchlistAdd}
              loading={loading}
              success={success}
            />
          </Grid>
        </Grid>
        <Grid item>
          <MaterialTable
            title='Watch List'
            columns={state.columns}
            data={state.data}
            options={{ draggable: false }}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    setState(prevState => {
                      const data = [...prevState.data];
                      data.push(newData);

                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    deleteWatchListItem(
                      user.email,
                      oldData.stockName,
                      state.data
                    );
                  }, 600);
                }),
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
