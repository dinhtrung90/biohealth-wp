import React, { useEffect, useState } from 'react'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
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
  const hotlinesByWard = useSelector((state) => state.quarter.hotlinesByWard)

  const [hotlineItem, setHotlineItem] = useState({
    phoneQuarter: null,
    phoneWard: null,
    phoneWardPolice: null,
    phoneWardHealth: null,
    phoneDistrictPolice: null,
  })

  const [mProvince, setProvince] = useState(null)
  const [mDistrict, setDistrict] = useState(null)
  const [mWard, setWard] = useState(null)

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
    setProvince(null)
    setDistrict(null)
    setWard(null)
    onHidden(false)
  }

  return (
    <CModal visible={showModal} size="xl">
      <CForm>
        <CModalHeader>
          <CModalTitle>Số điện thoại đường dây nóng</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol sm="4" className="mb-4">
              <CFormLabel htmlFor="districtInput">Tỉnh / Thành phố</CFormLabel>
              <Select
                placeholder={<div>Chọn Tỉnh</div>}
                value={mProvince}
                options={provinces}
                name="province-select"
                classNamePrefix="select"
                onChange={onProvinceChange}
              />
            </CCol>
            <CCol sm="4" className="mb-4">
              <CFormLabel htmlFor="districtInput">Quận</CFormLabel>
              <Select
                placeholder={<div>Chọn Quận</div>}
                value={mDistrict}
                options={districts}
                name="district-select"
                classNamePrefix="select"
                onChange={onDistrictChange}
              />
            </CCol>
            <CCol sm="4" className="mb-4">
              <CFormLabel htmlFor="wardInput">Phường</CFormLabel>
              <Select
                placeholder={<div>Chọn Phường</div>}
                value={mWard}
                options={wards}
                name="ward-select"
                classNamePrefix="select"
                onChange={onWardChange}
              />
            </CCol>
            <CCol sm={12} className="mb-1">
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
                  value={hotlinesByWard.mobileLeader}
                />
              </CInputGroup>
            </CCol>
            <CCol sm={12} className="mb-1">
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
                  value={hotlinesByWard.wardPhone}
                />
              </CInputGroup>
            </CCol>
            <CCol sm={12} className="mb-1">
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
                  value={hotlinesByWard.wardPolice}
                />
              </CInputGroup>
            </CCol>
            <CCol sm={12} className="mb-1">
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
                  value={hotlinesByWard.wardHealthyPhone}
                />
              </CInputGroup>
            </CCol>
            <CCol sm={12} className="mb-1">
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
                  value={hotlinesByWard.districtHealthPhone}
                />
              </CInputGroup>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton className="me-4" color="secondary" onClick={() => onCloseModal()}>
            {t('common.Cancel')}
          </CButton>
          <CButton type="submit">{t('common.Save')}</CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default React.memo(ModalHotlineInputs)
