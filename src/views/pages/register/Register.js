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
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import CIcon from '@coreui/icons-react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'

const Register = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const genders = ['Male', 'Female', 'Unknown']

  const schema = Yup.object({
    fullName: Yup.string().required(t('common.FullNameRequired')),
    mobilePhone: Yup.string().required(t('common.MobilPhoneRequired')),
    ssn: Yup.string().required(t('common.SSNRequired')),
  })

  const formik = useFormik({
    initialValues: {
      fullName: '',
      ssn: '', // CMND or CCCD,
      gender: '',
      birthDate: '',
      permanentGroupOrQuarter: '', // to dan pho hoac khu pho
      permanentResidentialAddress: '',
      permanentWard: '',
      permanentDistrict: '',
      permanentCity: '',
      permanentProvince: '',
      currentGroupOrQuarter: '', // to dan pho hoac khu pho
      currentAddress: '',
      currentWard: '',
      currentDistrict: '',
      currentCity: '',
      currentProvince: '',
      mobilePhone: '',
      email: '',
      questions: [
        { title: 'Bạn chích ngừa covid chưa?', response: '' },
        { title: 'Lần test nhanh/PCR gần nhất', response: '' },
      ],
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => handleToSubmitAccount(values),
  })

  const handleToSubmitAccount = (values) => {
    console.log('handleToSubmitAccount=', values)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>
                    <CFormControl placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormControl placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormControl
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormControl
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CButton color="success">Create Account</CButton>
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
