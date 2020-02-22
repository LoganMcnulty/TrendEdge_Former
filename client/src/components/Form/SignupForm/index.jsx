import { withFormik } from 'formik'
import { register } from 'services/userService'
import auth from 'services/authService'
import SignupSchema from './SignupSchema'
import BasicForm from '../_common/BasicForm'

export const SignupForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || '',
      password: password || '',
    }
  },
  validationSchema: SignupSchema,
  handleSubmit: async values => {
    try {
      const { data: jwt } = await register(values)
      auth.loginWithJwt(jwt)
      window.location = '/'
    } catch (ex) {
      alert(ex.response.data)
    }
    console.log(values)
  },
})(BasicForm)
