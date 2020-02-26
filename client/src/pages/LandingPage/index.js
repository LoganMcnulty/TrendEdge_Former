import React, { useEffect, useState } from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import logo from './img/logo.png'
import amzn from './img/amzn.PNG'
import Paper from '@material-ui/core/Paper'
import auth from '../../services/authService'
import { DialogForm } from '../../components/Form/DialogForm';

export function LandingPage() {

  const [userLogged, setUserLogged] = useState();

  useEffect(() => {
    try {
    const userData = auth.getCurrentUser()
    setUserLogged(userData)
  } catch (ex) {}
  }, [])

    return (
      <>
        {userLogged ? 
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
              <Paper elevation={6} style={{ marginTop: '2%', textAlign:"center", padding:"2%" }}>
                <h1>{`Welcome Back ${userLogged.email}`}</h1>
                <div className="row justify-content-center" style={{marginTop:"2%"}}>
                  <div className="col-lg-8">

                    <div className="col-lg-12">
                        <div className="row justify-conent-around" style={{}}>
                          <div className="col-lg-6">
                            <div>
                            <a href="/watchlist"> <button type="button" className="btn btn-primary btn-lg btn-block">Visit Your Watchlist</button></a>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div>
                              <a href="/activeoptions"><button type="button" className="btn btn-primary btn-lg btn-block">Search Active Options</button></a>
                            </div>
                          </div>
                        </div>
                    </div>

                  </div>
                </div>

                <div  className="row justify-content-around">
                    <div className="col-lg-12">
                      <div className="row justify-conent-around" style={{marginTop:"2%"}}>
                        <div className="card text-center">

                          <div className="card-header">
                            <div className="row justify-content-center">
                              <div className="col-lg-2">
                                <CardMedia src={logo} component='img' title='logo' style={{width:"150%", margin:"auto"}}/>
                              </div>
                              <div className="col-lg-2">  
                                <h1 style={{marginTop:"9%"}}>Trend Edge<sup style={{verticalAlign:"super", fontSize:"30%"}}>™</sup></h1>
                              </div>
                            </div>
                          </div>

                          <div className="row justify-content-around">
                              <div className="col-lg-7">
                                <CardMedia src={amzn} component='img' title='amazon' style={{width:"100%", margin:"2%"}}/>
                              </div>

                              <div className="col-lg-5">
                                  <div className="card-body">
                                    <div style={{marginTop:"22%"}}>
                                      <h2 className="card-title">Data Driven</h2>
                                      <h2 className="card-title">Trend Ridden</h2>
                                      <br></br>
                                      <a href="#" class="btn btn-primary">About Trend Health<sup style={{verticalAlign:"super", fontSize:"70%"}}>™</sup> Scoring</a>
                                    </div>
                                  </div>
                              </div>
                          </div>
                        
                        </div>
                      </div>
                    </div> 
                </div>
                </Paper>
              </div>
            </div>
          </div>


        :
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                  <Paper elevation={6} style={{ marginTop: '2%', textAlign:"center", padding:"2%" }}>
                        <div  className="row justify-content-around">
                          <div className="col-lg-12">
                            <div className="row justify-conent-around" style={{marginTop:"2%"}}>
                              <div className="card text-center">

                                <div className="card-header">
                                  <div className="row justify-content-center">
                                    <div className="col-lg-2">
                                      <CardMedia src={logo} component='img' title='logo' style={{width:"150%", margin:"auto"}}/>
                                    </div>
                                    <div className="col-lg-2">  
                                      <h1 style={{marginTop:"9%"}}>Trend Edge<sup style={{verticalAlign:"super", fontSize:"30%"}}>™</sup></h1>
                                    </div>
                                  </div>
                                </div>

                                <div className="row justify-content-around">
                                    <div className="col-lg-7">
                                      <CardMedia src={amzn} component='img' title='amazon' style={{width:"100%", margin:"2%"}}/>
                                    </div>

                                    <div className="col-lg-5">
                                        <div className="card-body">
                                          <div style={{marginTop:"22%"}}>
                                            <h2 className="card-title">Data Driven</h2>
                                            <h2 className="card-title">Trend Ridden</h2>
                                            <br></br>
                                            <a href="#" class="btn btn-primary">About Trend Health<sup style={{verticalAlign:"super", fontSize:"70%"}}>™</sup> Scoring</a>
                                          </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer text-muted">
                                  <h3><DialogForm />, modify your user settings, and start adding to your watchlist.</h3>
                                </div>
                              
                              </div>
                            </div>
                          </div> 
                      </div>
                    </Paper>
                </div>
          </div>
        </div>
      }
      </>
    )
  }

