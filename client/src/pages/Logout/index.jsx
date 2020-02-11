import React, { Component } from 'react'
import auth from '../../services/authService'
import Paper from '@material-ui/core/Paper'
import CardMedia from '@material-ui/core/CardMedia'
import logoImg from '../../components/Logo/img/logo.svg'

export class Logout extends Component {
  componentDidMount() {
    auth.logout()
  }

  render() {
    return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Paper elevation={6} style={{ marginTop: '2%', textAlign:"center", padding:"2%" }}>
              <h1>Come Back Soon!</h1>
                <div className="row justify-content-center" style={{marginTop:"2%"}}>
                <div className="col-lg-12" >
                  <CardMedia src={logoImg} component='img' style={{width:"20%", margin:"auto"}}/>
                </div>
                <div className="col-lg-6 ml-auto">
                </div> 
              </div>
            </Paper>
        </div>
      </div>
    </div>)
  }
}

export default Logout
