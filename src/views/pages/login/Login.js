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
  CModal,
  CModalBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from './action'
import { userActions } from '../../pages/users/user.actions'
import { accountActions } from '../../../actions/account.actions'
import { useFormik } from 'formik'
import { FaMobileAlt, FaLock, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Login = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated)
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [forgetPasswordText, setForgetPasswordText] = useState('')

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
    dispatch(loginActions.login(values)).then((result) => handleGetAccount(result))
  }

  const getCurrentUserAddress = (addresses) => {
    if (!addresses || addresses.length === 0) return
    if (addresses?.length === 1) {
      return addresses[0]
    }
    return addresses.filter((address) => address.isPermanent || address.isCurrent)[0]
  }

  const handleGetAccount = (result) => {
    if (!result) return
    dispatch(userActions.getAccount()).then((result) => {
      if (!result || !result.account) return
      if (result.account.authorities.includes('ROLE_ADMIN')) {
        dispatch(userActions.getProfile({ userId: result.account.id })).then((profileResult) => {
          console.log('profileResult=', profileResult)
          const addresses = profileResult ? profileResult.user.addresses : []
          const currentAddress = getCurrentUserAddress(addresses)
          if (currentAddress) {
            const ward = {
              id: currentAddress.wardEntity.id,
              districtId: currentAddress.district.id,
              provinceId: currentAddress.provinceEntity.id,
            }
            localStorage.setItem('WARD', JSON.stringify(ward))
          }
        })
        history.push('/dashboard')
      } else {
        history.push(`/profile/${result.account.id}`)
      }
    })
  }

  const gotoRegister = () => {
    history.push('/register')
  }

  const handleToResetPassword = () => {
    setIsForgotPassword(false)
    dispatch(accountActions.resetPasswordInit(forgetPasswordText))
  }

  const modalForgetPassword = () => {
    return (
      <CModal visible={isForgotPassword} onDismiss={() => setIsForgotPassword(false)}>
        <CModalBody>
          <CRow>
            <CCol sm={12} className="flex-center mb-3">
              <img src="/images/logo_inactive.png" height="60px" />
            </CCol>
            <CCol sm={12} className="flex-center mb-4">
              <h4>Thiết lập lại mật khẩu</h4>
            </CCol>
            <CCol sm={12} className="mb-4">
              <CFormControl
                id="forgotPassword"
                name="forgotPassword"
                placeholder="Tên đăng nhập hoặc email"
                value={forgetPasswordText}
                onChange={(e) => setForgetPasswordText(e.target.value)}
              />
            </CCol>
            <CCol sm={12} className="flex-center">
              <CButton
                onClick={handleToResetPassword}
                disabled={!forgetPasswordText || forgetPasswordText.length === 0}
              >
                Thiết lập lại mật khẩu
              </CButton>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    )
  }

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8" className="flex-center mb-4">
              <img src="/images/logo_inactive.png" height="120px" />
            </CCol>
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
                          <CCol xs="6" className="text-right flex-right">
                            <CButton onClick={gotoRegister} color="success" className="px-4">
                              {t('common.Register')}
                            </CButton>
                          </CCol>
                          <CCol xs="12" className="text-right flex-center">
                            <CButton
                              color="link"
                              className="px-0"
                              onClick={() => setIsForgotPassword(true)}
                            >
                              {t('common.ForgotPassword')}?
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
        {modalForgetPassword()}
      </div>
    </>
  )
}

export default Login
