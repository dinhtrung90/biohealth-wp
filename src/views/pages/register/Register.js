import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
  CFormLabel,
  CLink,
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import CIcon from '@coreui/icons-react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { accountActions } from '../../../actions/account.actions'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  const schema = Yup.object({
    username: Yup.string().required('Nhập tên đăng nhập'),
    firstName: Yup.string().required('Nhập tên'),
    lastName: Yup.string().required('Nhập họ'),
    email: Yup.string().required('Nhập email').email('Email không hợp lệ'),
    password: Yup.string().required('Nhập mật khẩu'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu không đúng')
      .required('Nhập lại mật khẩu'),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => handleToSubmitAccount(values),
  })

  const handleToSubmitAccount = (values) => {
    const payload = {
      email: values.email,
      login: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      langKey: 'vn',
    }
    dispatch(accountActions.registerAccount(payload)).then(() => {
      history.push('/login')
    })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={formik.handleSubmit}>
                  <h1>Đăng ký</h1>
                  <p className="text-medium-emphasis">Tạo tài khoản mới</p>
                  <CRow>
                    <CCol sm={6} className="mb-4">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl
                          autoComplete="off"
                          placeholder="Họ"
                          value={formik.values.lastName}
                          {...formik.getFieldProps('lastName')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.lastName && formik.touched.lastName ? 'block' : 'none',
                        }}
                      >
                        {formik.errors.lastName}
                      </CFormFeedback>
                    </CCol>
                    <CCol sm={6} className="mb-4">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl
                          autoComplete="off"
                          placeholder="Tên"
                          value={formik.values.firstName}
                          {...formik.getFieldProps('firstName')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.firstName && formik.touched.firstName ? 'block' : 'none',
                        }}
                      >
                        {formik.errors.firstName}
                      </CFormFeedback>
                    </CCol>
                    {/*<CCol sm={12}>*/}
                    {/*  <CInputGroup className="mb-3">*/}
                    {/*    <CInputGroupText>*/}
                    {/*      <CIcon name="cil-user" />*/}
                    {/*    </CInputGroupText>*/}
                    {/*    <CFormControl*/}
                    {/*      placeholder="Tên đăng nhập"*/}
                    {/*      value={formik.values.username}*/}
                    {/*      {...formik.getFieldProps('username')}*/}
                    {/*    />*/}
                    {/*  </CInputGroup>*/}
                    {/*  <CFormFeedback*/}
                    {/*    invalid*/}
                    {/*    style={{*/}
                    {/*      display:*/}
                    {/*        formik.errors.username && formik.touched.username ? 'block' : 'none',*/}
                    {/*    }}*/}
                    {/*  >*/}
                    {/*    {formik.errors.username}*/}
                    {/*  </CFormFeedback>*/}
                    {/*</CCol>*/}
                    <CCol sm={12} className="mb-4">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl
                          autoComplete="off"
                          placeholder="Tên đăng nhập hoặc số điện thoại"
                          value={formik.values.username}
                          {...formik.getFieldProps('username')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.username && formik.touched.username ? 'block' : 'none',
                        }}
                      >
                        {formik.errors.username}
                      </CFormFeedback>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CInputGroup>
                        <CInputGroupText>@</CInputGroupText>
                        <CFormControl
                          autoComplete="off"
                          placeholder="Email"
                          value={formik.values.email}
                          {...formik.getFieldProps('email')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display: formik.errors.email && formik.touched.email ? 'block' : 'none',
                        }}
                      >
                        {formik.errors.email}
                      </CFormFeedback>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                        <CFormControl
                          type="password"
                          placeholder="Nhập mật khẩu"
                          autoComplete="new-password"
                          value={formik.values.password}
                          {...formik.getFieldProps('password')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.password && formik.touched.password ? 'block' : 'none',
                        }}
                      >
                        {formik.errors.password}
                      </CFormFeedback>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                        <CFormControl
                          autoComplete="off"
                          type="password"
                          placeholder="Nhập lại mật khẩu"
                          value={formik.values.confirmPassword}
                          {...formik.getFieldProps('confirmPassword')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.confirmPassword && formik.touched.confirmPassword
                              ? 'block'
                              : 'none',
                        }}
                      >
                        {formik.errors.confirmPassword}
                      </CFormFeedback>
                    </CCol>
                    <CCol sm={12} className="flex-center">
                      <CButton type="submit" color="success">
                        Tạo tài khoản
                      </CButton>
                    </CCol>
                    <CCol sm={12}>
                      <hr />
                    </CCol>
                    <CCol sm={12} className="flex-center">
                      <CFormLabel>Bạn đã có tài khoản?</CFormLabel>
                    </CCol>
                    <CCol sm={12} className="flex-center">
                      <CLink href="#/login">Đăng nhập tại đây</CLink>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
