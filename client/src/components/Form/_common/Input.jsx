import React from 'react'
import { ErrorMessage } from 'formik'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'

const Input = ({ isValid, field, ...props }) => (
  <FormControl>
    <TextField variant='outlined' {...field} {...props} style={styles.input}/>
    <FormHelperText style={styles.errMsg}>
      <ErrorMessage name={field.name} />
    </FormHelperText>
  </FormControl>
)

export default Input

const styles = {
  errMsg: {
    color: 'red',
  },
  input:{
    width: 300
  }
}
