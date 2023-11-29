import { Link } from 'react-router-dom'
import Form from '../Form/Form'
import './Profile.css'
import Input from '../Input/Input'
import useFormValidation from '../../useFormValidation/useFormValidation'
import { useEffect } from 'react'
import { useContext } from 'react'
import ActualUserContext from '../../contexts/ActualUserContext'
import { Email_Reg, ProfileName_Reg } from "../../utils/constants";

function Profile({ name, handleLogout, editUserData, setError, isSuccess, setSuccess, setIsEdit, isEdit}) {
  const actualUser = useContext(ActualUserContext)
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation()
  
  useEffect(() => {
    reset({ username: actualUser.name, email: actualUser.email })
  }, [reset, actualUser, isEdit])

  function onSubmit(evt) {
    evt.preventDefault()
    editUserData(values.username, values.email)
  }

  return (
    <section className="profile page__profile">
      <h2 className='profile__title'>{`Привет, ${actualUser.name}!`}</h2>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={onSubmit}
        setError={setError}
        values={values}
        isSuccess={isSuccess}
        setSuccess={setSuccess}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
      >
        <Input
          selectname={name}
          name='username'
          type='text'
          title='Имя'
          minLength='3'
          value={values.username}
          isInputValid={isInputValid.username}
          error={errors.username}
          onChange={handleChange}
          pattern={ProfileName_Reg}
          isEdit={isEdit}
        />
        <Input
          selectname={name}
          name='email'
          type='email'
          title='E-mail'
          value={values.email}
          isInputValid={isInputValid.email}
          error={errors.email}
          onChange={handleChange}
          pattern={Email_Reg}
          isEdit={isEdit}
        />
      </Form>
      <Link to='/' onClick={handleLogout} className='profile__link-exit'>Выйти из аккаунта</Link>
    </section>
  )
}
export default Profile
