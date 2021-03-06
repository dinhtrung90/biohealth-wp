import React, { useEffect, useState } from 'react'
import {
  CFormControl,
  CButton,
  CForm,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CRow,
  CCol,
  CInputGroup,
  CInputGroupText,
  CModalFooter,
  CModal,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { quarterActions } from '../views/pages/quarter/quarter.actions'

const ModalHotlineInputs = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { paramId, isNew, showModal, onHidden, ...attributes } = props
  const provinces = useSelector((state) => state.quarter.provinces)
  const districts = useSelector((state) => state.quarter.districts)
  const wards = useSelector((state) => state.quarter.wards)
  const hotlinesByWard = useSelector((state) => state.quarter.hotlinesByWard) || {
    districtHealthPhone: '',
    mobileLeader: '',
    wardHealthyPhone: '',
    wardPhone: '',
    wardPolice: '',
  }
  const [mProvince, setProvince] = useState(null)
  const [mDistrict, setDistrict] = useState(null)
  const [mWard, setWard] = useState(null)
  const [mDistrictHealthPhone, setDistrictHealthPhone] = useState('')
  const [mMobileLeader, setMobileLeader] = useState('')
  const [mWardHealthyPhone, setWardHealthyPhone] = useState('')
  const [mWardPhone, setWardPhone] = useState('')
  const [mWardPolice, setWardPolice] = useState('')

  const onProvinceChange = (option) => {
    setProvince(option)
    dispatch(quarterActions.getAllDistrictsByProvince(option))
  }

  const onDistrictChange = (option) => {
    setDistrict(option)
    dispatch(quarterActions.getAllWardsByDistrict(option))
  }

  const onWardChange = (option) => {
    setWard(option)
    dispatch(quarterActions.getHotLinesByWard(option.id))
  }

  const onCloseModal = () => {
    hotlinesByWard.districtHealthPhone = ''
    hotlinesByWard.mobileLeader = ''
    hotlinesByWard.wardHealthyPhone = ''
    hotlinesByWard.wardPhone = ''
    hotlinesByWard.wardPolice = ''
    setProvince(null)
    setDistrict(null)
    setWard(null)
    setMobileLeader('')
    setWardPhone('')
    setWardPolice('')
    setWardHealthyPhone('')
    setDistrictHealthPhone('')
    onHidden(false)
  }

  const handleSaveHotline = () => {
    const payload = {
      districtHealthPhone: mDistrictHealthPhone,
      mobileLeader: mMobileLeader,
      ward: {
        district: {
          id: mDistrict.id,
          name: mDistrict.name,
          province: {
            id: mProvince.id,
            name: mProvince.name,
            type: mProvince.type,
          },
          type: mDistrict.type,
        },
        id: mWard.id,
        name: mWard.name,
        type: mWard.type,
      },
      wardHealthyPhone: mWardHealthyPhone,
      wardPhone: mWardPhone,
      wardPolice: mWardPolice,
    }
    if (hotlinesByWard.id) {
      payload.id = hotlinesByWard.id
    }
    dispatch(quarterActions.addUpdateHotLines(payload))
    onCloseModal()
  }

  useEffect(() => {
    const mobileLeaderNumber =
      !mMobileLeader || mMobileLeader.length === 0 ? hotlinesByWard?.mobileLeader : mMobileLeader
    setMobileLeader(mobileLeaderNumber)

    const districtHealthPhoneNumber =
      !mDistrictHealthPhone || mDistrictHealthPhone.length === 0
        ? hotlinesByWard?.districtHealthPhone
        : mDistrictHealthPhone
    setDistrictHealthPhone(districtHealthPhoneNumber)

    const wardHealthyPhoneNumber =
      !mWardHealthyPhone || mWardHealthyPhone.length === 0
        ? hotlinesByWard?.wardHealthyPhone
        : mWardHealthyPhone
    setWardHealthyPhone(wardHealthyPhoneNumber)

    const wardPhoneNumber =
      !mWardPhone || mWardPhone.length === 0 ? hotlinesByWard?.wardPhone : mWardPhone
    setWardPhone(wardPhoneNumber)

    const wardPoliceNumber =
      !mWardPolice || mWardPolice.length === 0 ? hotlinesByWard?.wardPolice : mWardPolice
    setWardPolice(wardPoliceNumber)
  })

  return (
    <CModal visible={showModal} size="xl">
      <CForm>
        <CModalHeader>
          <CModalTitle>S??? ??i???n tho???i ???????ng d??y n??ng</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol sm="4" className="mb-4">
              <CFormLabel htmlFor="districtInput">T???nh / Th??nh ph???</CFormLabel>
              <Select
                placeholder={<div>Ch???n T???nh</div>}
                value={mProvince}
                options={provinces}
                name="province-select"
                classNamePrefix="select"
                onChange={onProvinceChange}
              />
            </CCol>
            <CCol sm="4" className="mb-4">
              <CFormLabel htmlFor="districtInput">Qu???n</CFormLabel>
              <Select
                placeholder={<div>Ch???n Qu???n</div>}
                value={mDistrict}
                options={districts}
                name="district-select"
                classNamePrefix="select"
                onChange={onDistrictChange}
              />
            </CCol>
            <CCol sm="4" className="mb-4">
              <CFormLabel htmlFor="wardInput">Ph?????ng</CFormLabel>
              <Select
                placeholder={<div>Ch???n Ph?????ng</div>}
                value={mWard}
                options={wards}
                name="ward-select"
                classNamePrefix="select"
                onChange={onWardChange}
              />
            </CCol>
            <CCol sm={12} className="mb-1">
              <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                S??T T??? tr?????ng:
              </CFormLabel>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon name="cil-phone" />
                </CInputGroupText>
                <CFormControl
                  type="tel"
                  id="MobileNumberQuarter"
                  name="MobileNumberQuarter"
                  placeholder="S??T t??? tr?????ng"
                  value={mMobileLeader}
                  onChange={(e) => {
                    setMobileLeader(e.target.value)
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol sm={12} className="mb-1">
              <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                S??T Ph?????ng:
              </CFormLabel>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon name="cil-phone" />
                </CInputGroupText>
                <CFormControl
                  type="tel"
                  id="MobileNumberWard"
                  name="MobileNumberWard"
                  placeholder="S??T Ph?????ng"
                  value={mWardPhone}
                  onChange={(e) => {
                    setWardPhone(e.target.value)
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol sm={12} className="mb-1">
              <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                S??T C??ng An Ph?????ng:
              </CFormLabel>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon name="cil-phone" />
                </CInputGroupText>
                <CFormControl
                  type="tel"
                  id="MobileNumberWardPolice"
                  name="MobileNumberWardPolice"
                  placeholder="S??T c??ng an Ph?????ng"
                  value={mWardPolice}
                  onChange={(e) => {
                    setWardPolice(e.target.value)
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol sm={12} className="mb-1">
              <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                S??T Y t??? Ph?????ng:
              </CFormLabel>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon name="cil-phone" />
                </CInputGroupText>
                <CFormControl
                  type="tel"
                  id="MobileNumberWardHealth"
                  name="MobileNumberWardHealth"
                  placeholder="S??T Y t??? Ph?????ng"
                  value={mWardHealthyPhone}
                  onChange={(e) => {
                    setWardHealthyPhone(e.target.value)
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol sm={12} className="mb-1">
              <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                S??T L???c l?????ng ph??ng d???ch Ph?????ng (Qu???n):
              </CFormLabel>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon name="cil-phone" />
                </CInputGroupText>
                <CFormControl
                  type="tel"
                  id="MobileNumberWardHealth"
                  name="MobileNumberWardHealth"
                  placeholder="S??T L???c l?????ng ph??ng d???ch"
                  value={mDistrictHealthPhone}
                  onChange={(e) => {
                    setDistrictHealthPhone(e.target.value)
                  }}
                />
              </CInputGroup>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton className="me-4" color="secondary" onClick={() => onCloseModal()}>
            {t('common.Cancel')}
          </CButton>
          <CButton onClick={handleSaveHotline}>{t('common.Save')}</CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default React.memo(ModalHotlineInputs)
