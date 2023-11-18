import { useContext } from 'react'
import './Form.css'
import Preloader from '../Preloader/Preloader'
import ErrorContext from '../../contexts/ErrorContext'
import SendContext from '../../contexts/SendContext'
import { useEffect } from 'react'
import ActualUserContext from '../../contexts/ActualUserContext'
import { useLocation } from 'react-router-dom'

function Form({ name, children, isValid, onSubmit, setError, values, isSuccess, setSuccess, setIsEdit, isEdit }) {
  const location = useLocation()
  const error = useContext(ErrorContext)
  const isSend = useContext(SendContext)
  const actualUser = useContext(ActualUserContext)

  useEffect(() => {
    setError(false)
  }, [setError, values])

  useEffect(() => {
    if (location.pathname === '/profile') {
      setSuccess(false)
      setIsEdit(false)
    }
  }, [setSuccess, setIsEdit, location.pathname])

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === 'signin' ?
        <>
          <span className={`login__error-request ${error && 'login__error-request_active'}`}>{'При входе произошла ошибка.'}</span>
          <button
            type="submit"
            className={`login__submit ${isValid && !error ? '' : 'login__submit_disabled'}`}
            disabled={!isValid || isSend || error}
          >{isSend ? <Preloader name='button' /> : 'Войти'}</button>
        </>
        :
        name === 'signup' ?
          <>
            <span className={`login__error-request login__error-request_type_reg ${error && 'login__error-request_active'}`}>{'При регистрации произошла ошибка.'}</span>
            <button
              type="submit"
              className={`login__submit ${isValid && !error ? '' : 'login__submit_disabled'}`}
              disabled={!isValid || isSend || error}
            >{isSend ? <Preloader name='button' /> : 'Зарегистрироваться'}</button>
          </>
          : !isEdit ?
            <>
              <span className={`profile__error-request ${error ? 'profile__error-request_type_error' : isSuccess && 'profile__error-request_type_success'}`}>{error ? 'При обновлении профиля произошла ошибка.' : 'Данные изменены успешно!'}</span>
              <button
                type="button"
                className={`profile__submit `}
                onClick={() => {
                  setIsEdit(true)
                  setSuccess(false)
                }}
              >{'Редактировать'}</button>
            </> :
            <>
              <span className={`profile__error-request ${error ? 'profile__error-request_type_error' : isSuccess && 'profile__error-request_type_success'}`}>{error ? 'При обновлении профиля произошла ошибка.' : 'Данные изменены успешно!'}</span>
              <button
                type="submit"
                className={`login__submit ${(values.username === actualUser.name && values.email === actualUser.email) || !isValid || error ? 'login__submit_disabled' : ''}`}
                disabled={!isValid || isSend || error}
              >{isSend ? <Preloader name='button' /> : 'Сохранить'}</button>
              <button
                type="button"
                className={`profile__submit `}
                onClick={() => {
                  setIsEdit(false)
                  setSuccess(false)
                  setError(false)
                }}
              >{'Отменить редактирование'}</button>
            </>
      }
    </form>
  )
}
export default Form
