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
import { useTranslation } from 'react-i18next'
import { FaPlus } from 'react-icons/fa'
import CDataTable from '../../../components/widgets/table/CDataTable'
import CPagination from '../../../components/widgets/pagination/CPagination'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { quarterActions } from '../quarter.actions'

const ManageQuarters = ({ props }) => {
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
    currentPage !== newPage && history.push(`/quarters?page=${newPage === 0 ? 1 : newPage}`)
  }

  const onPaginationChange = (numberItemsPerPage) => {
    // dispatch(quarterActions.getAllUsers({ page: 0, size: numberItemsPerPage }))
  }

  const getAllUsers = async () => {
    // dispatch(
    //   quarterActions.getAllUsers({ page: currentPage > 1 ? currentPage - 1 : 0, size: itemsPerPage }),
    // )
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

  const navigateToQuarter = (e) => {
    e.preventDefault()
    history.push('/quarter')
  }

  return (
    <div>
      <div className="body flex-grow-1 custom-main-container box-shadow-card ps-3">
        <CRow className="justify-content-center">
          <div className="flex-space-between pe-5">
            <h4 className="mt-4 mb-4">{t('common.QuarterList')}</h4>
            <CButton style={{ height: '33px' }} onClick={(e) => navigateToQuarter(e)}>
              <FaPlus /> Tạo mới
            </CButton>
          </div>
          <CCol sm="12">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CDataTable
                  loading={isFetching}
                  items={usersData}
                  fields={[
                    { key: 'quarter', label: 'Tổ' },
                    { key: 'group', label: 'Khu phố' },
                    { key: 'ward', label: 'Phường' },
                    { key: 'district', label: 'Quận' },
                    { key: 'province', label: 'Tỉnh' },
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

export default ManageQuarters
