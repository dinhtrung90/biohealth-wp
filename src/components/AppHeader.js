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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useTranslation } from 'react-i18next'
import { FaUserFriends, FaHome } from 'react-icons/fa'

import { AppHeaderDropdown } from './header/index'
import { APP_USER } from '../constants'

const AppHeader = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  let isAdmin = false
  const accountStorage = localStorage.getItem(APP_USER)
  if (accountStorage && accountStorage.length > 0) {
    const account = JSON.parse(accountStorage)
    isAdmin = account.authorities.includes('ROLE_ADMIN')
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
                <FaHome className="me-1" />
                {t('common.DashboardPage')}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#/quarters" className="flex-center-items">
                <FaUserFriends className="me-1" />
                {t('common.ManageQuarter')}
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
        ) : null}
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
      </CContainer>
      {/*<CHeaderDivider />*/}
      {/*<CContainer fluid>*/}
      {/*  <AppBreadcrumb />*/}
      {/*</CContainer>*/}
    </CHeader>
  )
}

export default AppHeader
