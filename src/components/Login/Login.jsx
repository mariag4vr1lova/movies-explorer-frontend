import Input from "../Input/Input";
import SectionLogin from "../SectionLogin/SectionLogin";
import useFormValidation from '../../useFormValidation/useFormValidation'

function Login({ name, onLogin, setError, errorMessage, setErrorMessage }) {
  const { values, errors, isInputValid, isValid, handleChange, } = useFormValidation()

  function onSubmit(evt) {
    evt.preventDefault()
    onLogin(values.email, values.password)
  }

  return (
    <SectionLogin name={name}
      isValid={isValid} 
      onSubmit={onSubmit} 
      setError={setError} 
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}>
      <Input
        name='email'
        type='email'
        title='E-mail'
        value={values.email}
        isInputValid={isInputValid.email}
        error={errors.email}
        onChange={(evt) => {
          handleChange(evt)
          setError(false)
        }}
        placeholder='Введите вашу электронную почту'
      />
      <Input
        name='password'
        type='password'
        title='Пароль'
        minLength='3'
        value={values.password}
        isInputValid={isInputValid.password}
        error={errors.password}
        onChange={(evt) => {
          handleChange(evt)
          setError(false)
        }}
        placeholder='Введите ваш пароль'
      />
    </SectionLogin>
  )
}
export default Login
