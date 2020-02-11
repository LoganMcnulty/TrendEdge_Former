import { withFormik } from 'formik'
import auth from 'services/authService'
import BasicForm from '../_common/BasicForm'

export const LoginForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || '',
      password: password || '',
    }
  },
  handleSubmit: async values => {
    try {
      const userResponse = await auth.login(values.email, values.password)

      if (userResponse) {
        alert(userResponse)
      } else {
        window.location = '/'
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors }
        errors.username = ex.response.data
        this.setState({ errors })
      }
    }
    console.log(values)
  },
})(BasicForm)
