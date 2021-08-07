import React, { useEffect, useState } from 'react'
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
import { AppHeader } from '../../../../components'
import { useTranslation } from 'react-i18next'
import QRCode from 'qrcode.react'
import { FaMobileAlt } from 'react-icons/fa'
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date-forked'
import CDataTable from '../../../components/widgets/table/CDataTable'
import CPagination from '../../../components/widgets/pagination/CPagination'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../user.actions'

const ManageUsers = ({ props }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const isFetching = useSelector((state) => state.users.isFetching)
  const usersData = useSelector((state) => state.users.users)
  const itemsPerPage = useSelector((state) => state.users.itemsPerPage)
  const totalPages = useSelector((state) => state.users.totalPages)
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/dashboard?page=${newPage === 0 ? 1 : newPage}`)
  }

  const onPaginationChange = (numberItemsPerPage) => {
    dispatch(userActions.getAllUsers({ page: 0, size: numberItemsPerPage }))
  }

  const getAllUsers = async () => {
    dispatch(
      userActions.getAllUsers({ page: currentPage > 1 ? currentPage - 1 : 0, size: itemsPerPage }),
    )
    setPage(currentPage)
  }

  useEffect(() => {
    const loadData = async () => {
      await getAllUsers()
    }
    loadData()
  }, [dispatch, currentPage, page])

  const onRowClick = (item) => {
    console.log('onRowClick=', item)
    // dispatch(userActions.getPublicEligibilityDetail(item)).then((r) => {
    //   setRewardPopup(!rewardPopup)
    // })
  }

  return (
    <div>
      <div className="body flex-grow-1 custom-main-container box-shadow-card ps-3">
        <CRow className="justify-content-center">
          <h4 className="mt-4 mb-4">{t('common.UserList')}</h4>
          <CCol sm="12">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CDataTable
                  loading={isFetching}
                  items={usersData}
                  fields={[
                    { key: 'phone', label: 'Số điện thoại' },
                    { key: 'firstName', label: 'Họ và tên' },
                    { key: 'ssn', label: 'CMND/CCCD' },
                    { key: 'fullAddress', label: 'Địa chỉ nhà' },
                  ]}
                  hover
                  tableFilter
                  striped
                  itemsPerPage={itemsPerPage}
                  activePage={currentPage - 1}
                  clickableRows
                  onRowClick={(item) => onRowClick(item)}
                  onPaginationChange={onPaginationChange}
                />
                <CPagination
                  activePage={page}
                  onActivePageChange={pageChange}
                  pages={totalPages}
                  doubleArrows={false}
                  align="center"
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </div>
  )
}

export default ManageUsers
