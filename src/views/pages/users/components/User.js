import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormControl,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLink,
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import QRCode from 'qrcode.react'
import CIcon from '@coreui/icons-react'
import { useFormik } from 'formik'
import { FaMobileAlt, FaMapMarkerAlt, FaPlus } from 'react-icons/fa'
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date-forked'
import { userActions } from '../user.actions'
import { accountActions } from '../../../../actions/account.actions'
import { quarterActions } from '../../quarter/quarter.actions'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import vi from 'date-fns/locale/vi'
import Select from 'react-select'
import { APP_USER } from '../../../../constants'
import data from '@coreui/coreui/js/src/dom/data'

registerLocale('vi', vi)

const User = ({ match }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.user)
  const provinces = useSelector((state) => state.quarter.provinces)
  const districts = useSelector((state) => state.quarter.districts)
  const wards = useSelector((state) => state.quarter.wards)
  const hotlinesByWard = useSelector((state) => state.quarter.hotlinesByWard)
  const today = new Date()
  const [isEditAddress, setEditAddress] = useState(false)
  const [isDeleteAddress, setDeleteAddress] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [fullAddress, setFullAddress] = useState('')
  const [isPermanentAddress, setIsPermanentAddress] = useState(false)
  const [isCurrentAddress, setIsCurrentAddress] = useState(false)
  const [vaccinatedDate, setVaccinatedDate] = useState()
  const [testDate, setTestDate] = useState()
  const [isChangQuestionVaccinated, setChangeQuestionVaccinated] = useState(true)
  const [isChangeQuestionPCR, setChangeQuestionPCR] = useState(true)
  const [isQuestionVaccinated, setQuestionVaccinated] = useState(false)
  const [isQuestionPCR, setQuestionPCR] = useState(false)
  const [userRole, setUserRole] = useState('')
  const appUser = localStorage.getItem(APP_USER) ? JSON.parse(localStorage.getItem(APP_USER)) : null

  const constGenders = {
    NONE: 'NONE',
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    UNKNOWN: 'UNKNOWN',
  }

  const roles = {
    ADMIN: 'ROLE_ADMIN',
    SUPPORT_USER: 'ROLE_SUPPORT_USER',
    USER: 'ROLE_USER',
  }

  const loginRoles = {
    ADMIN: 'ADMIN',
    SUPPORT_USER: 'SUPPORT_USER',
    USER: 'USER',
  }

  const questions = [
    { title: 'Bạn chích ngừa covid chưa?', response: '' },
    { title: 'Lần test nhanh/PCR gần nhất', response: '' },
  ]

  const isAdmin = () => {
    return appUser && appUser.authorities && appUser.authorities.indexOf('ROLE_ADMIN') > -1
  }

  const formik = useFormik({
    initialValues: {
      fullName: user && user.profile ? user.profile.fullName : '',
      mobilePhone: user && user.profile ? user.profile.mobilePhone : '',
      ssn: user && user.profile ? user.profile.ssn : '',
      gender: user && user.profile ? user.profile.gender : '',
      yearBirth:
        user && user.profile ? new Date(user.profile.birthDate).getFullYear() : today.getFullYear(),
      monthBirth:
        user && user.profile ? new Date(user.profile.birthDate).getMonth() : today.getMonth(),
      dayBirth: user && user.profile ? new Date(user.profile.birthDate).getDate() : today.getDate(),
      role: user && user.basicInfo ? user.basicInfo.login.toUpperCase() : 'USER',
      isAdmin: isAdmin(),
      addressList: user && user.addresses ? user.addresses : [],
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      zipCode: '',
      qrCode: user && user.profile ? user.profile.userCode : '',
      questionVaccinated: 'Bạn chích ngừa covid chưa?',
      questionPCR: 'Lần test nhanh/PCR gần nhất?',
    },
    enableReinitialize: true,
  })

  const createQuestion = (data) => {
    const payload = {
      response: data.response,
      title: data.title,
      user: {
        id: data.user.id,
      },
      vaccineDate: !data.isPCR && data.date ? data.date : null,
      testPCRDate: data.isPCR && data.date ? data.date : null,
    }
    dispatch(userActions.createQuestion(payload)).then(() => {
      fetchUserProfile()
    })
  }

  const updateQuestion = (data) => {
    const payload = {
      id: data.id,
      response: data.response,
      title: data.title,
      user: {
        id: data.user.id,
      },
      vaccineDate: !data.isPCR && data.date ? data.date : null,
      testPCRDate: data.isPCR && data.date ? data.date : null,
    }
    dispatch(userActions.updateQuestion(payload))
  }

  const hasQuestions = (title) => {
    return (
      user &&
      user.questionnaires &&
      user.questionnaires.length > 0 &&
      user.questionnaires.findIndex((q) => q.title === title) > -1
    )
  }

  const getQuestionResponse = (title, radioConfirmed, isPCR = false) => {
    if (isPCR) {
      if (!isChangeQuestionPCR) {
        if (radioConfirmed === 'yes') {
          return isQuestionPCR
        } else {
          return !isQuestionPCR && radioConfirmed === 'no'
        }
      }
    } else if (!isChangQuestionVaccinated) {
      if (radioConfirmed === 'yes') {
        return isQuestionVaccinated
      } else {
        return !isQuestionVaccinated && radioConfirmed === 'no'
      }
    }

    // first loading to check question responses
    const hasQuestion = user && user.questionnaires && user.questionnaires.length > 0
    if (!hasQuestion) return false
    const question = user.questionnaires.find((q) => q.title === title)
    if (!question) return false
    if (radioConfirmed === 'yes') {
      return question.response === 'true'
    } else if (question.response === 'false') {
      return true
    }
  }

  const handleRadioVaccinatedChange = (e, title, radioTypeYes, isPCR = false) => {
    if (!appUser) return
    const today = new Date()
    const response = e.target.id === radioTypeYes
    if (isPCR) {
      setChangeQuestionPCR(false)
      setQuestionPCR(response)
    } else {
      setChangeQuestionVaccinated(false)
      setQuestionVaccinated(response)
    }
    if (response) return
    if (hasQuestions(title)) {
      const existQuestion = user.questionnaires.find((q) => q.title === title)
      existQuestion.response = response
      existQuestion.isPCR = isPCR
      updateQuestion(existQuestion)
    } else {
      const payload = {
        response: response,
        title: title,
        user: {
          id: appUser.userId,
        },
        isPCR: isPCR,
        date: response ? today.toISOString() : null,
      }
      createQuestion(payload)
    }
  }

  const onChangeVaccinatedDate = (title, date, response, isPCR = false) => {
    if (!appUser) return
    if (isPCR) {
      setTestDate(date)
    } else {
      setVaccinatedDate(date)
    }
    if (hasQuestions(title)) {
      const existQuestion = user.questionnaires.find((q) => q.title === title)
      existQuestion.response = response
      existQuestion.isPCR = isPCR
      existQuestion.date = date ? date.toISOString() : null
      updateQuestion(existQuestion)
    } else {
      const payload = {
        response: response,
        title: title,
        user: {
          id: appUser.userId,
        },
        isPCR: isPCR,
        date: date ? date.toISOString() : null,
      }
      createQuestion(payload)
    }
  }

  const fetchUserProfile = () => {
    dispatch(userActions.getProfile({ userId: match.params.id }))
  }

  const getCurrentRole = (authorities) => {
    let role = null
    if (!authorities || authorities.length === 0) return role
    if (authorities.length === 1) {
      role = authorities[0]
    } else if (authorities.includes(roles.ADMIN)) {
      role = roles.ADMIN
    } else if (authorities.includes(roles.SUPPORT_USER)) {
      role = roles.SUPPORT_USER
    } else {
      role = roles.USER
    }
    return role
  }

  useEffect(() => {
    dispatch(userActions.getProfile({ userId: match.params.id })).then((result) => {
      if (result && result.user) {
        setUserRole(getCurrentRole(result.user.authorities))
        if (result.user.addresses && result.user.addresses.length > 0) {
          let defaultAddress = result.user.addresses.filter((address) => address.isCurrent)[0]
          if (!defaultAddress) {
            defaultAddress = result.user.addresses[0]
          }
          result.user.questionnaires.forEach((q) => {
            if (q.vaccineDate) {
              setQuestionVaccinated(true)
              setVaccinatedDate(new Date(q.vaccineDate))
            } else if (q.testPCRDate) {
              setQuestionPCR(true)
              setTestDate(new Date(q.testPCRDate))
            }
          })
          dispatch(quarterActions.getHotLinesByWard(defaultAddress.wardEntity.id))
        }
      }
    })
  }, [dispatch])

  const getAddressName = (item) => {
    if (item.isPermanent) {
      return 'Địa chỉ thường trú: '
    } else if (item.isCurrent) {
      return 'Địa chỉ hiện tại: '
    }
    return 'Địa chỉ liên lạc:'
  }

  const generateAddress = () => {
    if (!selectedAddress) return ''
    let address = ''
    if (selectedAddress.quarter) {
      address += selectedAddress.quarter
    }
    if (fullAddress && fullAddress.length > 0) {
      address +=
        selectedAddress.quarter && selectedAddress.quarter.length > 0
          ? ', ' + fullAddress
          : fullAddress
    }
    if (selectedAddress.wardEntity && selectedAddress.wardEntity.name) {
      address +=
        fullAddress && fullAddress.length > 0
          ? ', ' + selectedAddress.wardEntity.name
          : selectedAddress.wardEntity.name
    }
    if (selectedAddress.district && selectedAddress.district.name) {
      address += ', ' + selectedAddress.district.name
    }
    if (selectedAddress.provinceEntity && selectedAddress.provinceEntity.name) {
      address += ', ' + selectedAddress.provinceEntity.name
    }
    return address
  }

  const handleDeleteAddress = (item) => {
    setDeleteAddress(false)
    dispatch(userActions.deleteUserAddress(item.id)).then(() => {
      fetchUserProfile()
    })
  }

  const renderAddressList = (item, index) => {
    return (
      <div key={index} className="address-item">
        <div className="address-info">
          <div>{getAddressName(item)}</div>
          <div>{item.display}</div>
        </div>
        <div className="address-action">
          <CButton
            onClick={() => {
              setSelectedAddress(item)
              setEditAddress(true)
              setIsPermanentAddress(item.isPermanent)
              setIsCurrentAddress(item.isCurrent)
            }}
          >
            Sửa
          </CButton>
          <CButton color="danger" className="ms-2" onClick={() => setDeleteAddress(true)}>
            Xoá
          </CButton>
        </div>
        <CModal visible={isDeleteAddress} onDismiss={() => setDeleteAddress(false)}>
          <CModalBody>Bạn có thật sự muốn xóa?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setDeleteAddress(false)}>
              Huỷ
            </CButton>
            <CButton color="danger" onClick={() => handleDeleteAddress(item)}>
              Xoá
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    )
  }

  const handleAddNewAddress = () => {
    setSelectedAddress(null)
    setEditAddress(true)
  }

  const onProvinceChange = (option) => {
    const updateAddress = Object.assign({}, selectedAddress)
    updateAddress.provinceEntity = option
    updateAddress.district = {}
    updateAddress.wardEntity = {}
    setSelectedAddress(updateAddress)
    dispatch(quarterActions.getAllDistrictsByProvince(option))
  }

  const onDistrictChange = (option) => {
    const updateAddress = Object.assign({}, selectedAddress)
    updateAddress.district = option
    updateAddress.wardEntity = {}
    setSelectedAddress(updateAddress)
    dispatch(quarterActions.getAllWardsByDistrict(option))
  }

  const onWardChange = (option) => {
    const updateAddress = Object.assign({}, selectedAddress)
    updateAddress.wardEntity = option
    setSelectedAddress(updateAddress)
  }

  const handleUserAddressSubmit = (e) => {
    if (!selectedAddress || !appUser) return
    e.preventDefault()
    setEditAddress(!isEditAddress)
    selectedAddress.display = generateAddress()
    selectedAddress.isCurrent = isCurrentAddress
    selectedAddress.isPermanent = isPermanentAddress
    selectedAddress.user = {
      id: appUser.userId,
    }
    selectedAddress.fullAddress = fullAddress
    dispatch(userActions.addOrUpdateUserAddress(selectedAddress))
    fetchUserProfile()
  }

  const handleSaveProfile = () => {
    if (!appUser) return
    const payload = {
      birthDate: `${formik.values.yearBirth}-${formik.values.monthBirth}-${formik.values.dayBirth}`, // 'yyyy-MM-dd',
      fullName: formik.values.fullName,
      gender: formik.values.gender.toUpperCase(),
      mobilePhone: formik.values.mobilePhone,
      ssn: formik.values.ssn,
      user: {
        id: appUser.userId,
      },
    }
    if (user && user.profile) {
      payload.id = user.profile.id
    }

    dispatch(userActions.updateUserProfile(payload))
  }

  const handleUpdateUserRole = (e) => {
    const roles = [e.target.value]
    const profile = user.profile
    const payload = {
      authorities: roles,
      id: profile.user.id,
      login: profile.user.login,
    }
    appUser.authorities = roles
    dispatch(userActions.updateUserAdmin(payload))
  }

  /*
   * Modal Address
   */
  const modalUpdateAddress = () => {
    if (!provinces || provinces.length === 0) {
      dispatch(quarterActions.getAllProvinces()).then(() => {
        if (!selectedAddress || !selectedAddress.provinceEntity || !selectedAddress.district) return
        dispatch(quarterActions.getAllDistrictsByProvince(selectedAddress.provinceEntity)).then(
          dispatch(quarterActions.getAllWardsByDistrict(selectedAddress.district)),
        )
      })
    }

    return (
      <CModal visible={isEditAddress} onDismiss={() => setEditAddress(false)}>
        <CModalHeader>
          <CModalTitle>Chỉnh sửa địa chỉ</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol sm="12" className="mb-4 pe-4">
              <CFormLabel htmlFor="districtInput">Tỉnh / Thành phố</CFormLabel>
              <Select
                placeholder={<div>Chọn Tỉnh</div>}
                options={provinces}
                name="province-select"
                classNamePrefix="select"
                value={
                  selectedAddress && selectedAddress.provinceEntity
                    ? {
                        value: selectedAddress.provinceEntity.id,
                        label: selectedAddress.provinceEntity.name,
                      }
                    : null
                }
                onChange={onProvinceChange}
              />
            </CCol>
            <CCol sm="12" className="mb-4 pe-4">
              <CFormLabel htmlFor="districtInput">Quận</CFormLabel>
              <Select
                placeholder={<div>Chọn Quận</div>}
                options={districts}
                name="district-select"
                classNamePrefix="select"
                value={
                  selectedAddress && selectedAddress.district
                    ? {
                        value: selectedAddress.district.id || null,
                        label: selectedAddress.district.name || null,
                      }
                    : null
                }
                onChange={onDistrictChange}
              />
            </CCol>
            <CCol sm="12" className="mb-4 pe-4">
              <CFormLabel htmlFor="wardInput">Phường</CFormLabel>
              <Select
                placeholder={<div>Chọn Phường</div>}
                options={wards}
                name="ward-select"
                classNamePrefix="select"
                value={
                  selectedAddress && selectedAddress.wardEntity
                    ? {
                        value: selectedAddress.wardEntity.id,
                        label: selectedAddress.wardEntity.name,
                      }
                    : null
                }
                onChange={onWardChange}
              />
            </CCol>
            <CCol sm="12" className="mb-4 pe-4">
              <CFormLabel htmlFor="fullAddressInput">Địa chỉ nhà</CFormLabel>
              <CFormControl
                id="fullAddressInput"
                placeholder="Nhập địa chỉ nhà"
                value={fullAddress}
                disabled={selectedAddress === null}
                onChange={(e) => setFullAddress(e.target.value)}
              />
            </CCol>
            <CCol sm="12" className="mb-4 pe-4">
              <CFormLabel htmlFor="QuarterGroup">{t('common.Quarter_Group')}</CFormLabel>
              <CFormControl
                id="QuarterGroup"
                placeholder={t('common.Quarter_Group')}
                value={selectedAddress ? selectedAddress.quarter : ''}
                disabled={!formik.values.isAdmin}
              />
            </CCol>
            <CCol sm="12" className="pe-4">
              <CFormLabel htmlFor="QuarterGroup">Loại địa chỉ:</CFormLabel>
            </CCol>
            <CCol sm="6" className="mb-4 pe-4 flex-left">
              <CFormLabel htmlFor="QuarterGroup">Hộ khẩu</CFormLabel>
              <CFormCheck
                switch
                size="lg"
                className={'mx-1'}
                variant={'3d'}
                color={'success'}
                checked={isPermanentAddress}
                onChange={() => setIsPermanentAddress(!isPermanentAddress)}
              />
            </CCol>
            <CCol sm="6" className="mb-4 pe-4 flex-left">
              <CFormLabel htmlFor="QuarterGroup">Thường trú</CFormLabel>
              <CFormCheck
                switch
                size="lg"
                className={'mx-1'}
                variant={'3d'}
                color={'success'}
                checked={isCurrentAddress}
                onChange={() => setIsCurrentAddress(!isCurrentAddress)}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton
            className="me-4"
            color="secondary"
            onClick={() => setEditAddress(!isEditAddress)}
          >
            {t('common.Cancel')}
          </CButton>
          <CButton onClick={handleUserAddressSubmit}>{t('common.Save')}</CButton>
        </CModalFooter>
      </CModal>
    )
  }

  return (
    <div>
      <div className="body flex-grow-1 custom-main-container box-shadow-card ps-3">
        <CRow className="min-vh-100">
          <CCol sm="3" className="col-border-right pt-4">
            <CRow className="avatar-wrapper">
              <CCol sm="12 mb-1">
                <h4 className="col-title text-center pb-4 gray-1">{t('common.YourProfile')}</h4>
              </CCol>
              <div className="avatar-circle-1">
                <div className="image-cropper">
                  <img src="/avatars/avatar.svg" height="150px" width="150px" />
                </div>
              </div>
              <p className="text-center mt-4">{formik.values.fullName}</p>
              {/*<div className="flex-center mt-4">*/}
              {/*  <CButton>{t('common.UploadNewAvatar')}</CButton>*/}
              {/*</div>*/}
              <div className="flex-center qr-container mt-4">
                <div className="qr-content">
                  <QRCode value={formik.values.qrCode} size={180} />
                  <div className="qr-text flex-center-items mt-2">
                    <FaMobileAlt size="2em" />
                    <div>Quét QR</div>
                  </div>
                </div>
              </div>
            </CRow>
          </CCol>
          <CCol sm="5" className="col-border-right pt-4">
            <CRow className="avatar-wrapper">
              <CCol sm="12 mb-4">
                <h4 className="col-title gray-1">{t('common.EditYourPersonalSettings')}</h4>
                <hr />
              </CCol>
              <CCol sm="12" className="mb-4 pe-4">
                <CFormLabel htmlFor="fullName">{t('common.FullName')}</CFormLabel>
                <CFormControl
                  id="fullName"
                  value={formik.values.fullName}
                  placeholder={t('common.FullName')}
                  {...formik.getFieldProps('fullName')}
                />
              </CCol>
              <CCol sm="12" className="mb-4 pe-4">
                <CFormLabel htmlFor="mobilePhone">{t('common.MobilePhone')}</CFormLabel>
                <CFormControl
                  id="mobilePhone"
                  placeholder={t('common.MobilePhone')}
                  value={formik.values.mobilePhone}
                  {...formik.getFieldProps('mobilePhone')}
                />
              </CCol>
              <CCol sm="12" className="mb-4 pe-4">
                <CFormLabel htmlFor="ssn">{t('common.SSN')}</CFormLabel>
                <CFormControl
                  id="ssn"
                  placeholder={t('common.SSN')}
                  value={formik.values.ssn}
                  {...formik.getFieldProps('ssn')}
                />
              </CCol>
              <CCol sm="12" className="mb-4 pe-4">
                <CFormLabel htmlFor="gender">{t('common.Gender')}</CFormLabel>
                <CFormSelect name="Gender" id="Gender" {...formik.getFieldProps('gender')}>
                  <option value={constGenders.NONE}>Chọn giới tính</option>
                  <option value={constGenders.MALE}>Nam</option>
                  <option value={constGenders.FEMALE}>Nữ</option>
                  <option value={constGenders.UNKNOWN}>Khác</option>
                </CFormSelect>
              </CCol>
              <CCol sm="12">
                <hr />
              </CCol>
              <CCol sm="12" className="mb-4 pe-4">
                <CFormLabel htmlFor="gender">{t('common.BirthDate')}</CFormLabel>
                <div className="flex-center">
                  <div className="text-center">
                    <div className="custom-drop-date-label mb-2">{t('common.Day')}</div>
                    <div className="clr-select-wrapper">
                      <DayPicker
                        year={formik.values.yearBirth} // mandatory
                        month={formik.values.monthBirth} // mandatory
                        endYearGiven // mandatory if end={} is given in YearPicker
                        value={formik.values.dayBirth} // mandatory
                        onChange={(day) => {
                          // mandatory
                          formik.setFieldValue('dayBirth', day)
                        }}
                        id={'day'}
                        name={'day'}
                        classes={'custom-drop-date clr-select'}
                        optionClasses={'option classes'}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="custom-drop-date-label mb-2">{t('common.Month')}</div>
                    <div className="clr-select-wrapper">
                      <MonthPicker
                        numeric // to get months as numbers
                        short // default is full name
                        caps // default is Titlecase
                        endYearGiven // mandatory if end={} is given in YearPicker
                        year={formik.values.yearBirth} // mandatory
                        value={formik.values.monthBirth} // mandatory
                        onChange={(month) => {
                          // mandatory
                          formik.setFieldValue('monthBirth', month)
                          formik.setFieldValue('dayBirth', 1)
                        }}
                        id={'month'}
                        name={'month'}
                        classes={'custom-drop-date clr-select'}
                        optionClasses={'option classes'}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="custom-drop-date-label mb-2">{t('common.Year')}</div>
                    <div className="clr-select-wrapper">
                      <YearPicker
                        reverse // default is ASCENDING
                        value={formik.values.yearBirth}
                        onChange={(year) => {
                          // mandatory
                          formik.setFieldValue('yearBirth', year)
                        }}
                        id={'year'}
                        name={'year'}
                        classes={'custom-drop-date clr-select'}
                        optionClasses={'option classes'}
                      />
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol sm="12">
                <hr />
              </CCol>
              <CCol sm="12" className="mb-4 pe-4">
                <div className="flex-left">
                  <CFormLabel htmlFor="gender">
                    <FaMapMarkerAlt /> Sổ địa chỉ:
                  </CFormLabel>
                  <div className="address-plus-item ms-4" onClick={handleAddNewAddress}>
                    <FaPlus className="me-1" />
                    <span>Thêm địa chỉ mới</span>
                  </div>
                </div>
                {formik.values.addressList.map((item, index) => (
                  <div key={index} className="address-item-wraper">
                    {renderAddressList(item, index)}
                  </div>
                ))}
                {modalUpdateAddress()}
              </CCol>
              <CCol sm="12">
                <hr />
              </CCol>
              <CCol sm="12" className="flex-center mt-3 mb-4">
                <CButton onClick={handleSaveProfile}>{t('common.Save')}</CButton>
              </CCol>
            </CRow>
          </CCol>
          <CCol sm="4" className="pt-4">
            <CCol sm="12">
              <h4 className="col-title gray-1">{t('common.OtherInformation')}</h4>
              <hr />
            </CCol>
            <CCol sm="12 mb-4">
              <div>{formik.values.questionVaccinated}</div>
              <div className="flex-left">
                <CFormCheck
                  type="radio"
                  name="radioVaccinated"
                  id="radioVaccinatedYes"
                  label={t('common.Yes')}
                  onClick={(e) =>
                    handleRadioVaccinatedChange(
                      e,
                      formik.values.questionVaccinated,
                      'radioVaccinatedYes',
                      false,
                    )
                  }
                  checked={getQuestionResponse(formik.values.questionVaccinated, 'yes')}
                />
                <CFormCheck
                  type="radio"
                  name="radioVaccinated"
                  id="radioVaccinatedNo"
                  label={t('common.No')}
                  className="ms-4"
                  onClick={(e) =>
                    handleRadioVaccinatedChange(
                      e,
                      formik.values.questionVaccinated,
                      'radioVaccinatedYes',
                      false,
                    )
                  }
                  checked={getQuestionResponse(formik.values.questionVaccinated, 'no')}
                />
              </div>
              <CInputGroup
                style={{
                  display:
                    isQuestionVaccinated || (vaccinatedDate && vaccinatedDate.length > 0)
                      ? 'flex'
                      : 'none',
                }}
              >
                <CInputGroupText>
                  <CIcon name="cil-calendar" />
                </CInputGroupText>
                <DatePicker
                  selected={vaccinatedDate}
                  onChange={(date) =>
                    onChangeVaccinatedDate(
                      formik.values.questionVaccinated,
                      date,
                      isQuestionVaccinated,
                      false,
                    )
                  }
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  locale="vi"
                  calendarStartDay={1}
                />
              </CInputGroup>
            </CCol>
            <CCol sm="12">
              <div>{formik.values.questionPCR}</div>
              <div className="flex-left">
                <CFormCheck
                  type="radio"
                  name="radioTest"
                  id="radioTestYes"
                  label={t('common.Yes')}
                  onClick={(e) =>
                    handleRadioVaccinatedChange(e, formik.values.questionPCR, 'radioTestYes', true)
                  }
                  checked={getQuestionResponse(formik.values.questionPCR, 'yes', true)}
                />
                <CFormCheck
                  type="radio"
                  name="radioTest"
                  id="radioTestdNo"
                  label={t('common.No')}
                  className="ms-4"
                  onClick={(e) =>
                    handleRadioVaccinatedChange(e, formik.values.questionPCR, 'radioTestYes', true)
                  }
                  checked={getQuestionResponse(formik.values.questionPCR, 'no', true)}
                />
              </div>
              <CInputGroup style={{ display: isQuestionPCR ? 'flex' : 'none' }}>
                <CInputGroupText>
                  <CIcon name="cil-calendar" />
                </CInputGroupText>
                <DatePicker
                  selected={testDate}
                  onChange={(date) =>
                    onChangeVaccinatedDate(formik.values.questionPCR, date, isQuestionPCR, true)
                  }
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  locale="vi"
                  calendarStartDay={1}
                />
              </CInputGroup>
            </CCol>
            <CCol sm="12">
              <hr />
            </CCol>
            <CCol
              sm="12"
              style={{ paddingRight: '38px', display: formik.values.isAdmin ? 'block' : 'none' }}
            >
              <CFormLabel>
                <strong>{t('common.UserPermission')}</strong>
              </CFormLabel>
              <CFormSelect
                name="userRoles"
                id="userRoles"
                onChange={handleUpdateUserRole}
                value={userRole}
              >
                <option value={roles.ADMIN}>Quản trị viên</option>
                {/*<option value={roles.SUPPORT_USER}>Hỗ trợ người dùng</option>*/}
                <option value={roles.USER}>Người dùng</option>
              </CFormSelect>
            </CCol>
            <CCol sm="12" style={{ display: formik.values.isAdmin ? 'block' : 'none' }}>
              <hr />
            </CCol>
            <CCol sm="12">
              <CFormLabel>
                <strong>{t('common.Hotlines')}</strong>
              </CFormLabel>
              <CRow>
                <CCol sm={12} className="mb-1 pe-5">
                  <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                    <span className="pe-2">SĐT Tổ trường:</span>
                    <CLink className="hotline-link" href={`tel:${hotlinesByWard.mobileLeader}`}>
                      {hotlinesByWard.mobileLeader}
                    </CLink>
                  </CFormLabel>
                </CCol>
                <CCol sm={12} className="mb-1 pe-5">
                  <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                    <span className="pe-2">SĐT Phường:</span>
                    <CLink className="hotline-link" href={`tel:${hotlinesByWard.mobileLeader}`}>
                      {hotlinesByWard.mobileLeader}
                    </CLink>
                  </CFormLabel>
                </CCol>
                <CCol sm={12} className="mb-1 pe-5">
                  <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                    <span className="pe-2">SĐT Công An Phường:</span>
                    <CLink className="hotline-link" href={`tel:${hotlinesByWard.mobileLeader}`}>
                      {hotlinesByWard.mobileLeader}
                    </CLink>
                  </CFormLabel>
                </CCol>
                <CCol sm={12} className="mb-1 pe-5">
                  <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                    <span className="pe-2">SĐT Y tế Phường:</span>
                    <CLink className="hotline-link" href={`tel:${hotlinesByWard.mobileLeader}`}>
                      {hotlinesByWard.mobileLeader}
                    </CLink>
                  </CFormLabel>
                </CCol>
                <CCol sm={12} className="mb-1 pe-5">
                  <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                    <span className="pe-2">SĐT Lực lượng phòng dịch Phường (Quận):</span>
                    <CLink className="hotline-link" href={`tel:${hotlinesByWard.mobileLeader}`}>
                      {hotlinesByWard.mobileLeader}
                    </CLink>
                  </CFormLabel>
                </CCol>
              </CRow>
            </CCol>
          </CCol>
        </CRow>
      </div>
    </div>
  )
}

export default User
