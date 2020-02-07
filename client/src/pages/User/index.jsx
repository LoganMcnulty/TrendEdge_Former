import React from 'react'
import { UserSettings } from 'components'
import Paper from '@material-ui/core/Paper'

export const User = ({user}) => {

  return (
    
      <div className="container">
        <Paper elevation={6} style={{ marginBottom: '2%', padding:"2%" }}> 
        <div className="row justify-content-center">
            <div className="col-lg-12">
              <UserSettings user={user} />
            </div>
          </div>
          </Paper>
        </div>
    
  )
}
