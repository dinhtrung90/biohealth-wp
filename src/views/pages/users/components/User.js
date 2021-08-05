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
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import QRCode from 'qrcode.react'
import CIcon from '@coreui/icons-react'
import { FaMobileAlt } from 'react-icons/fa'
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date-forked'
import { userActions } from '../user.actions'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import vi from 'date-fns/locale/vi'
registerLocale('vi', vi)

const User = ({ props }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const account = useSelector((state) => state.users.account)
  const today = new Date()
  const [birthDay, setBirthDay] = useState(today.getDate())
  const [birthMonth, setBirthMonth] = useState(today.getMonth())
  const [birthYear, setBirthYear] = useState(today.getFullYear())
  const [vaccinatedDate, setVaccinatedDate] = useState()
  const [testDate, setTestDate] = useState()

  console.log('account=', account)

  const constGenders = {
    NONE: 'NONE',
    MALE: 'Male',
    FEMALE: 'Female',
    UNKNOWN: 'Unknown',
  }

  const roles = {
    ADMIN: 'ROLE_ADMIN',
    SUPPORT_USER: 'ROLE_SUPPORT_USER',
    USER: 'ROLE_USER',
  }

  const questions = [
    { title: 'Bạn chích ngừa covid chưa?', response: '' },
    { title: 'Lần test nhanh/PCR gần nhất', response: '' },
  ]

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
    dispatch(userActions.getAccount())
  }, [dispatch])

  return (
    <div>
      <div className="body flex-grow-1 custom-user-container box-shadow-card ps-3">
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
              <p className="text-center mt-4">{t('common.FullName')}</p>
              <div className="flex-center mt-4">
                <CButton>{t('common.UploadNewAvatar')}</CButton>
              </div>
              <div className="flex-center qr-container mt-4">
                <div className="qr-content">
                  <QRCode value="http://facebook.github.io/react/" size={180} />
                  <div className="qr-text flex-center-items mt-2">
                    <FaMobileAlt size="2em" />
                    <div>Scan Me</div>
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
                <CFormControl id="fullName" placeholder={t('common.FullName')} />
              </CCol>
              <CCol sm="12" className="mb-4 pe-4">
                <CFormLabel htmlFor="mobilePhone">{t('common.MobilePhone')}</CFormLabel>
                <CFormControl id="mobilePhone" placeholder={t('common.MobilePhone')} />
              </CCol>
              <CCol sm="12" className="mb-4 pe-4">
                <CFormLabel htmlFor="ssn">{t('common.SSN')}</CFormLabel>
                <CFormControl id="ssn" placeholder={t('common.SSN')} />
              </CCol>
              <CCol sm="12" className="mb-4 pe-4">
                <CFormLabel htmlFor="gender">{t('common.Gender')}</CFormLabel>
                <CFormSelect name="Gender" id="Gender">
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
                        year={birthYear} // mandatory
                        month={birthMonth} // mandatory
                        endYearGiven // mandatory if end={} is given in YearPicker
                        value={birthDay} // mandatory
                        onChange={(day) => {
                          // mandatory
                          setBirthDay(day)
                          console.log('=== day===')
                          console.log(day)
                          console.log(birthMonth)
                          console.log(birthYear)
                          console.log('=== end day===')
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
                        year={birthYear} // mandatory
                        value={birthMonth} // mandatory
                        onChange={(month) => {
                          // mandatory
                          setBirthMonth(month)
                          setBirthDay(1)
                          console.log(month)
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
                        value={birthYear}
                        onChange={(year) => {
                          // mandatory
                          setBirthYear(year)
                          console.log(year)
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
                <CFormLabel htmlFor="QuarterGroup">{t('common.Quarter_Group')}</CFormLabel>
                <CFormControl id="QuarterGroup" placeholder={t('common.Quarter_Group')} />
              </CCol>
              <CCol sm="12" className="mb-4 pe-4">
                <CFormLabel htmlFor="fullAddress">{t('common.FullAddress')}</CFormLabel>
                <CFormControl id="fullAddress" placeholder={t('common.FullAddress')} />
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
            <CCol sm="12">
              <CFormLabel>
                <strong>{t('common.UserPermission')}</strong>
              </CFormLabel>
              <CFormSelect name="userRoles" id="userRoles">
                <option value={roles.ADMIN}>Quản trị viên</option>
                <option value={roles.SUPPORT_USER}>Hỗ trợ người dùng</option>
                <option value={roles.USER}>Người dùng</option>
              </CFormSelect>
            </CCol>
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
