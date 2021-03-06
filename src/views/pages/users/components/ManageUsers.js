import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { useTranslation } from 'react-i18next'
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
    dispatch(userActions.getAllProfileUsers({ page: 0, size: numberItemsPerPage }))
  }

  const getAllUsers = async () => {
    dispatch(
      userActions.getAllProfileUsers({
        page: currentPage > 1 ? currentPage - 1 : 0,
        size: itemsPerPage,
      }),
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
    history.push(`/profile/${item.user.id}`)
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
                    { key: 'mobilePhone', label: 'S??? ??i???n tho???i' },
                    { key: 'fullName', label: 'H??? v?? t??n' },
                    { key: 'ssn', label: 'CMND/CCCD' },
                    { key: 'fullAddress', label: '?????a ch??? nh??' },
                  ]}
                  hover
                  tableFilter
                  striped
                  itemsPerPage={itemsPerPage}
                  activePage={currentPage - 1}
                  clickableRows
                  onRowClick={(item) => onRowClick(item)}
                  onPaginationChange={onPaginationChange}
                  scopedSlots={{
                    fullAddress: (item) => <td>{item.fullAddress}</td>,
                  }}
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
