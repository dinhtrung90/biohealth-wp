import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useTranslation } from 'react-i18next'
import { APP_TOKEN, APP_USER } from 'src/constants/constants'
import { useHistory } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const AppHeaderDropdown = () => {
  const { t } = useTranslation()
  const history = useHistory()
  let account = {}
  const accountStorage = localStorage.getItem(APP_USER)
  if (accountStorage && accountStorage.length > 0) {
    account = JSON.parse(accountStorage)
  }

  const handleLogout = () => {
    localStorage.removeItem(APP_TOKEN)
    localStorage.removeItem(APP_USER)
    history.push('/login')
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
    </CDropdown>
  )
}

export default AppHeaderDropdown
