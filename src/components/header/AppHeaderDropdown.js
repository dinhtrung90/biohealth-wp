import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  CAvatar,
  CButton,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormControl,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CInputGroup,
  CInputGroupText,
  CForm,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useTranslation } from 'react-i18next'
import { APP_TOKEN, APP_USER } from 'src/constants/constants'
import { useHistory } from 'react-router-dom'
import { FaRegUser, FaLock, FaRegEyeSlash, FaRegEye } from 'react-icons/fa'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { accountActions } from '../../actions'

const AppHeaderDropdown = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [isRevealPwdConfirm, setIsRevealPwdConfirm] = useState(false)

  let account = {}
  const accountStorage = localStorage.getItem(APP_USER)
  if (accountStorage && accountStorage.length > 0) {
    account = JSON.parse(accountStorage)
  }

  const strongPasswordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  let schema = Yup.object({
    currentPassword: Yup.string().required(t('messages.validations.passwordRequired')),
    newPassword: Yup.string()
      .matches(strongPasswordReg, t('messages.validations.passwordStrongRequired'))
      .required(t('messages.validations.passwordRequired')),
    newPasswordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng')
      .required(t('messages.validations.confirmPasswordRequired')),
  })

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      showCurrentPassword: false,
      newPassword: '',
      showNewPassword: false,
      newPasswordConfirm: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => handleChangePasswordSubmit(values),
  })

  const handleChangePasswordSubmit = (values) => {
    dispatch(accountActions.updateChangePassword(values)).then(() => {
      formik.resetForm()
      setIsChangePassword(false)
    })
  }

  const handleLogout = () => {
    localStorage.removeItem(APP_TOKEN)
    localStorage.removeItem(APP_USER)
    history.push('/login')
  }

  const modalChangePassword = () => {
    return (
      <CModal visible={isChangePassword} onClose={() => setIsChangePassword(!isChangePassword)}>
        <CForm onSubmit={formik.handleSubmit}>
          <CModalHeader>
            <CModalTitle>Đổi mật khẩu</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow className="mb-3">
              <CCol>Mật khẩu hiện tại</CCol>
              <CCol>
                <CInputGroup>
                  <CFormControl
                    id="currentPassword"
                    name="currentPassword"
                    type={isRevealPwd ? 'text' : 'password'}
                    value={formik.values.currentPassword}
                    {...formik.getFieldProps('currentPassword')}
                  />
                  <CInputGroupText onClick={() => setIsRevealPwd((isRevealPwd) => !isRevealPwd)}>
                    {isRevealPwd ? <FaRegEyeSlash /> : <FaRegEye />}
                  </CInputGroupText>
                </CInputGroup>
                <CFormFeedback
                  invalid
                  style={{
                    display:
                      formik.errors.currentPassword && formik.touched.currentPassword
                        ? 'block'
                        : 'none',
                  }}
                >
                  {formik.errors.currentPassword}
                </CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>Mật khẩu mới</CCol>
              <CCol>
                <CInputGroup>
                  <CFormControl
                    id="newPassword"
                    name="newPassword"
                    type={isRevealPwdConfirm ? 'text' : 'password'}
                    value={formik.values.newPassword}
                    {...formik.getFieldProps('newPassword')}
                  />
                  <CInputGroupText
                    onClick={() =>
                      setIsRevealPwdConfirm((isRevealPwdConfirm) => !isRevealPwdConfirm)
                    }
                  >
                    {isRevealPwdConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
                  </CInputGroupText>
                </CInputGroup>
                <CFormFeedback
                  invalid
                  style={{
                    display:
                      formik.errors.newPassword && formik.touched.newPassword ? 'block' : 'none',
                  }}
                >
                  {formik.errors.newPassword}
                </CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol>Nhập lại mật khẩu mới</CCol>
              <CCol>
                <CFormControl
                  id="newPasswordConfirm"
                  name="newPasswordConfirm"
                  type="password"
                  value={formik.values.newPasswordConfirm}
                  {...formik.getFieldProps('newPasswordConfirm')}
                />
                <CFormFeedback
                  invalid
                  style={{
                    display:
                      formik.errors.newPasswordConfirm && formik.touched.newPasswordConfirm
                        ? 'block'
                        : 'none',
                  }}
                >
                  {formik.errors.newPasswordConfirm}
                </CFormFeedback>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              className="me-4"
              color="secondary"
              onClick={() => {
                formik.resetForm()
                setIsChangePassword(!isChangePassword)
              }}
            >
              {t('common.Cancel')}
            </CButton>
            <CButton type="submit">{t('common.Save')}</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    )
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src="/avatars/8.jpg" size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href={`#/profile/${account.userId}`}>
          <FaRegUser /> {t('common.Profile')}
        </CDropdownItem>
        <CDropdownItem onClick={() => setIsChangePassword(true)}>
          <FaLock /> Đổi mật khẩu
        </CDropdownItem>
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon name="cil-envelope-open" className="me-2" />*/}
        {/*  Messages*/}
        {/*  <CBadge color="success" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon name="cil-task" className="me-2" />*/}
        {/*  Tasks*/}
        {/*  <CBadge color="danger" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon name="cil-comment-square" className="me-2" />*/}
        {/*  Comments*/}
        {/*  <CBadge color="warning" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon name="cil-user" className="me-2" />*/}
        {/*  Profile*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon name="cil-settings" className="me-2" />*/}
        {/*  Settings*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon name="cil-credit-card" className="me-2" />*/}
        {/*  Payments*/}
        {/*  <CBadge color="secondary" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon name="cil-file" className="me-2" />*/}
        {/*  Projects*/}
        {/*  <CBadge color="primary" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon name="cil-lock-locked" className="me-2" />
          {t('common.Logout')}
        </CDropdownItem>
      </CDropdownMenu>
      {modalChangePassword()}
    </CDropdown>
  )
}

export default AppHeaderDropdown
