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
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import QRCode from 'qrcode.react'
import CIcon from '@coreui/icons-react'
import { useFormik } from 'formik'
import { FaMobileAlt, FaMapMarkerAlt, FaPlus } from 'react-icons/fa'
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date-forked'
import { userActions } from '../user.actions'
import { quarterActions } from '../../quarter/quarter.actions'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import vi from 'date-fns/locale/vi'
import Select from 'react-select'

registerLocale('vi', vi)

const User = ({ match }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.user)
  const provinces = useSelector((state) => state.quarter.provinces)
  const districts = useSelector((state) => state.quarter.districts)
  const wards = useSelector((state) => state.quarter.wards)
  const today = new Date()
  const [vaccinatedDate, setVaccinatedDate] = useState()
  const [testDate, setTestDate] = useState()
  const [isEditAddress, setEditAddress] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [isPermanentAddress, setIsPermanentAddress] = useState(false)
  const [isCurrentAddress, setIsCurrentAddress] = useState(false)

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

  const isAdmin = (obj) => {
    const role = obj && obj.basicInfo ? obj.basicInfo.login.toUpperCase() : 'USER'
    return role === loginRoles.ADMIN
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
      isAdmin: isAdmin(user),
      addressList: user && user.addresses ? user.addresses : [],
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      zipCode: '',
    },
    enableReinitialize: true,
  })

  const handleRadioVaccinatedChange = (e) => {
    if (e.target.id === 'radioVaccinatedYes') {
      console.log('handleRadioVaccinatedChange Yes=', e)
    } else {
      console.log('handleRadioVaccinatedChange No=', e)
    }
  }

  const handleRadioTestChange = (e) => {
    if (e.target.id === 'radioTestYes') {
      console.log('handleRadioTestChange Yes=', e)
    } else {
      console.log('handleRadioTestChange No=', e)
    }
  }

  useEffect(() => {
    dispatch(userActions.getProfile({ userId: match.params.id }))
  }, [dispatch])

  const getAddressName = (item) => {
    if (item.isPermanent) {
      return 'Địa chỉ thường trú: '
    } else if (item.isCurrent) {
      return 'Địa chỉ hiện tại: '
    }
    return 'Địa chỉ liên lạc:'
  }

  const renderAddressList = (item, index) => {
    return (
      <div key={index} className="address-item">
        <div className="address-info">
          <div>{getAddressName(item)}</div>
          <div>
            <span>{item.quarter && item.quarter.length > 0 ? `${item.quarter}, ` : ''}</span>
            <span>
              {item.fullAddress && item.fullAddress.length > 0 ? `${item.fullAddress}, ` : ''}
            </span>
            <span>{item.wardEntity ? `${item.wardEntity.name}, ` : ''}</span>
            <span>{item.district ? `${item.district.name}, ` : ''}</span>
            <span>{item.provinceEntity ? `${item.provinceEntity.name}` : ''}</span>
          </div>
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
            Edit
          </CButton>
        </div>
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
    e.preventDefault()
    setEditAddress(!isEditAddress)
    selectedAddress.isCurrent = isCurrentAddress
    selectedAddress.isPermanent = isPermanentAddress
    dispatch(userActions.addOrUpdateUserAddress(selectedAddress))
  }

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
      <CModal visible={isEditAddress} onClose={() => setEditAddress(!isEditAddress)}>
        <CModalHeader>
          <CModalTitle>Chỉnh sửa địa chỉ</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol sm="12" className="mb-4 pe-4">
              <CFormLabel htmlFor="QuarterGroup">{t('common.Quarter_Group')}</CFormLabel>
              <CFormControl
                id="QuarterGroup"
                placeholder={t('common.Quarter_Group')}
                value={selectedAddress ? selectedAddress.quarter : ''}
                disabled={!formik.values.isAdmin}
              />
            </CCol>
            <CCol sm="12" className="mb-4 pe-4">
              <CFormLabel htmlFor="fullAddressInput">Địa chỉ nhà</CFormLabel>
              <CFormControl
                id="fullAddressInput"
                placeholder="Nhập địa chỉ nhà"
                value={selectedAddress ? selectedAddress.fullAddress : ''}
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
                  <img src="https://via.placeholder.com/150" />
                </div>
              </div>
              <p className="text-center mt-4">{formik.values.fullName}</p>
              {/*<div className="flex-center mt-4">*/}
              {/*  <CButton>{t('common.UploadNewAvatar')}</CButton>*/}
              {/*</div>*/}
              <div className="flex-center qr-container mt-4">
                <div className="qr-content">
                  <QRCode value="http://facebook.github.io/react/" size={180} />
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
              <CCol sm="12" className="flex-center mt-3">
                <CButton>{t('common.Save')}</CButton>
              </CCol>
            </CRow>
          </CCol>
          <CCol sm="4" className="pt-4">
            <CCol sm="12">
              <h4 className="col-title gray-1">{t('common.OtherInformation')}</h4>
              <hr />
            </CCol>
            <CCol sm="12 mb-4">
              <div>Bạn chích ngừa covid chưa?</div>
              <div className="flex-left">
                <CFormCheck
                  type="radio"
                  name="radioVaccinated"
                  id="radioVaccinatedYes"
                  label={t('common.Yes')}
                  defaultChecked
                  onClick={(e) => handleRadioVaccinatedChange(e)}
                />
                <CFormCheck
                  type="radio"
                  name="radioVaccinated"
                  id="radioVaccinatedNo"
                  label={t('common.No')}
                  className="ms-4"
                  onClick={(e) => handleRadioVaccinatedChange(e)}
                />
              </div>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon name="cil-calendar" />
                </CInputGroupText>
                <DatePicker
                  selected={vaccinatedDate}
                  onChange={(date) => setVaccinatedDate(date)}
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
              <div>Lần test nhanh/PCR gần nhất</div>
              <div className="flex-left">
                <CFormCheck
                  type="radio"
                  name="radioTest"
                  id="radioTestYes"
                  label={t('common.Yes')}
                  defaultChecked
                  onClick={(e) => handleRadioTestChange(e)}
                />
                <CFormCheck
                  type="radio"
                  name="radioTest"
                  id="radioTestdNo"
                  label={t('common.No')}
                  className="ms-4"
                  onClick={(e) => handleRadioTestChange(e)}
                />
              </div>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon name="cil-calendar" />
                </CInputGroupText>
                <DatePicker
                  selected={testDate}
                  onChange={(date) => setTestDate(date)}
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
            {formik.values.isAdmin ? (
              <CCol sm="12" style={{ paddingRight: '38px' }}>
                <CFormLabel>
                  <strong>{t('common.UserPermission')}</strong>
                </CFormLabel>
                <CFormSelect name="userRoles" id="userRoles">
                  <option value={roles.ADMIN}>Quản trị viên</option>
                  <option value={roles.SUPPORT_USER}>Hỗ trợ người dùng</option>
                  <option value={roles.USER}>Người dùng</option>
                </CFormSelect>
              </CCol>
            ) : null}
            <CCol sm="12">
              <hr />
            </CCol>
            <CCol sm="12">
              <CFormLabel>
                <strong>{t('common.Hotlines')}</strong>
              </CFormLabel>
              <CRow>
                <CCol sm={12} className="mb-1 pe-5">
                  <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                    SĐT Tổ trường:
                  </CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon name="cil-phone" />
                    </CInputGroupText>
                    <CFormControl
                      type="tel"
                      id="MobileNumberQuarter"
                      name="MobileNumberQuarter"
                      placeholder="SĐT tổ trường"
                      disabled={!formik.values.isAdmin}
                    />
                  </CInputGroup>
                </CCol>
                <CCol sm={12} className="mb-1 pe-5">
                  <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                    SĐT Phường:
                  </CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon name="cil-phone" />
                    </CInputGroupText>
                    <CFormControl
                      type="tel"
                      id="MobileNumberWard"
                      name="MobileNumberWard"
                      placeholder="SĐT Phường"
                      disabled={!formik.values.isAdmin}
                    />
                  </CInputGroup>
                </CCol>
                <CCol sm={12} className="mb-1 pe-5">
                  <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                    SĐT Công An Phường:
                  </CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon name="cil-phone" />
                    </CInputGroupText>
                    <CFormControl
                      type="tel"
                      id="MobileNumberWardPolice"
                      name="MobileNumberWardPolice"
                      placeholder="SĐT công an Phường"
                      disabled={!formik.values.isAdmin}
                    />
                  </CInputGroup>
                </CCol>
                <CCol sm={12} className="mb-1 pe-5">
                  <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                    SĐT Y tế Phường:
                  </CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon name="cil-phone" />
                    </CInputGroupText>
                    <CFormControl
                      type="tel"
                      id="MobileNumberWardHealth"
                      name="MobileNumberWardHealth"
                      placeholder="SĐT Y tế Phường"
                      disabled={!formik.values.isAdmin}
                    />
                  </CInputGroup>
                </CCol>
                <CCol sm={12} className="mb-1 pe-5">
                  <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                    SĐT Lực lượng phòng dịch Phường (Quận):
                  </CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon name="cil-phone" />
                    </CInputGroupText>
                    <CFormControl
                      type="tel"
                      id="MobileNumberWardHealth"
                      name="MobileNumberWardHealth"
                      placeholder="SĐT Lực lượng phòng dịch"
                      disabled={!formik.values.isAdmin}
                    />
                  </CInputGroup>
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
