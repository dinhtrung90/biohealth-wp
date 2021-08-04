import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from './action'
import { userActions } from '../../pages/users/user.actions'
import { useFormik } from 'formik'
import { FaMobileAlt, FaLock, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Login = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated)
  const [isRevealPwd, setIsRevealPwd] = useState(false)

  const schema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => handleLoginSubmit(values),
  })

  const handleLoginSubmit = (values) => {
    dispatch(loginActions.login(values)).then(handleGetAccount)
  }

  const handleGetAccount = () => {
    dispatch(userActions.getAccount()).then((result) => {
      if (result && result.account && result.account.authorities.includes('ROLE_ADMIN')) {
        history.push('/dashboard')
      } else {
        history.push(`/profile/${result.account.id}`)
      }
    })
  }

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CRow>
                      <CForm onSubmit={formik.handleSubmit}>
                        <h1>{t('common.Login')}</h1>
                        {/*<p className="text-medium-emphasis">Sign In to your account</p>*/}
                        <CCol className="mb-3">
                          <CInputGroup>
                            <CInputGroupText>
                              <FaMobileAlt />
                            </CInputGroupText>
                            <CFormControl
                              id="username"
                              name="username"
                              placeholder={t('common.MobilePhone')}
                              invalid={formik.errors.username && formik.touched.username}
                              value={formik.values.username}
                              {...formik.getFieldProps('username')}
                            />
                          </CInputGroup>
                          <CFormFeedback
                            invalid
                            style={{
                              display:
                                formik.errors.username && formik.touched.username
                                  ? 'block'
                                  : 'none',
                            }}
                          >
                            {formik.errors.username}
                          </CFormFeedback>
                        </CCol>
                        <CCol className="mb-4">
                          <CInputGroup>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                            <CFormControl
                              id="password"
                              invalid={formik.errors.password && formik.touched.password}
                              type={isRevealPwd ? 'text' : 'password'}
                              name="password"
                              value={formik.values.password}
                              placeholder={t('view.User.Password')}
                              {...formik.getFieldProps('password')}
                            />
                            <CInputGroupText
                              onClick={() => setIsRevealPwd((isRevealPwd) => !isRevealPwd)}
                            >
                              {isRevealPwd ? <FaRegEye /> : <FaRegEyeSlash />}
                            </CInputGroupText>
                          </CInputGroup>
                          <CFormFeedback
                            invalid
                            style={{
                              display:
                                formik.errors.password && formik.touched.password
                                  ? 'block'
                                  : 'none',
                            }}
                          >
                            {formik.errors.password}
                          </CFormFeedback>
                        </CCol>

                        <CRow>
                          <CCol xs="6">
                            <CButton type="submit" color="primary" className="px-4">
                              {t('common.Login')}
                            </CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <CButton color="link" className="px-0">
                              {t('common.ForgotPassword')}?
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CRow>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login
