import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
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
import { FaUserFriends, FaHome, FaPhone, FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

import { AppHeaderDropdown } from './header/index'
import { APP_USER } from '../constants'
import ModalHotlineInputs from './ModalHotlineInputs'
import { quarterActions } from '../views/pages/quarter/quarter.actions'

const AppHeader = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const [isHotlineModal, setHotlineModal] = useState(false)

  let isAdmin = false
  const accountStorage = localStorage.getItem(APP_USER)
  if (accountStorage && accountStorage.length > 0) {
    const account = JSON.parse(accountStorage)
    isAdmin = account.authorities.includes('ROLE_ADMIN')
  }

  const onModalHidden = () => {
    setHotlineModal(false)
  }

  const handleModalHotlineClick = () => {
    dispatch(quarterActions.getAllProvinces())
    setHotlineModal(true)
  }

  return (
    <CHeader position="sticky">
      <CContainer fluid>
        {/*<CHeaderToggler*/}
        {/*  className="ms-md-3 d-lg-none"*/}
        {/*  onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}*/}
        {/*>*/}
        {/*  <CIcon name="cil-menu" size="lg" />*/}
        {/*</CHeaderToggler>*/}
        {/*<CHeaderBrand to="/">*/}
        {/*  <CIcon name="logo" height="48" alt="Logo" />*/}
        {/*</CHeaderBrand>*/}
        {isAdmin ? (
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <CNavLink href="#" to="/dashboard" className="flex-center-items">
                <img src="/images/logo_active.png" height="30px" className="me-1" />
                {t('common.DashboardPage')}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#/quarters" className="flex-center-items">
                <FaUserFriends className="me-1" size="30px" />
                {t('common.ManageQuarter')}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                className="flex-center-items custom-nav-item"
                onClick={handleModalHotlineClick}
              >
                <FaPhone className="me-1" size="30px" />
                Quản lý Hotline
              </CNavLink>
            </CNavItem>
            {/*<CNavItem>*/}
            {/*  <CNavLink href="#" onClick={(e) => navigateToSearch(e)} className="flex-center-items">*/}
            {/*    <FaSearch />*/}
            {/*    {t('common.ManageUsers')}*/}
            {/*  </CNavLink>*/}
            {/*</CNavItem>*/}
            {/*<CNavItem>*/}
            {/*  <CNavLink href="#">Users</CNavLink>*/}
            {/*</CNavItem>*/}
            {/*<CNavItem>*/}
            {/*  <CNavLink href="#">Settings</CNavLink>*/}
            {/*</CNavItem>*/}
          </CHeaderNav>
        ) : (
          <CHeaderNav className="d-none d-md-flex me-auto"></CHeaderNav>
        )}
        {/*<CHeaderNav>*/}
        {/*  <CNavItem>*/}
        {/*    <CNavLink href="#">*/}
        {/*      <CIcon name="cil-bell" size="lg" />*/}
        {/*    </CNavLink>*/}
        {/*  </CNavItem>*/}
        {/*  <CNavItem>*/}
        {/*    <CNavLink href="#">*/}
        {/*      <CIcon name="cil-list" size="lg" />*/}
        {/*    </CNavLink>*/}
        {/*  </CNavItem>*/}
        {/*  <CNavItem>*/}
        {/*    <CNavLink href="#">*/}
        {/*      <CIcon name="cil-envelope-open" size="lg" />*/}
        {/*    </CNavLink>*/}
        {/*  </CNavItem>*/}
        {/*</CHeaderNav>*/}
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
        <ModalHotlineInputs showModal={isHotlineModal} onHidden={onModalHidden} />
      </CContainer>
      {/*<CHeaderDivider />*/}
      {/*<CContainer fluid>*/}
      {/*  <AppBreadcrumb />*/}
      {/*</CContainer>*/}
    </CHeader>
  )
}

export default AppHeader
