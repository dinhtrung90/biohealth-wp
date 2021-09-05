import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react'
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
  const isFetching = useSelector((state) => state.quarter.isFetching)
  const groupsData = useSelector((state) => state.quarter.allGroups)
  const itemsPerPage = useSelector((state) => state.quarter.itemsPerPage)
  const totalPages = useSelector((state) => state.quarter.totalPages)
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/quarters?page=${newPage === 0 ? 1 : newPage}`)
  }

  const onPaginationChange = (numberItemsPerPage) => {
    dispatch(quarterActions.getAllGroups({ page: 0, size: numberItemsPerPage }))
  }

  const getAllGroups = async () => {
    const ward = localStorage.getItem('WARD')
      ? JSON.parse(localStorage.getItem('WARD'))
      : { id: 0, districtId: 0 }
    dispatch(
      quarterActions.getAllGroups({
        ward: ward,
        page: currentPage > 1 ? currentPage - 1 : 0,
        size: itemsPerPage,
      }),
    )
    setPage(currentPage)
  }

  useEffect(() => {
    const loadData = async () => {
      await getAllGroups()
    }
    loadData()
  }, [dispatch, currentPage, page])

  const onRowClick = (item) => {
    console.log('onRowClick=', item)
    history.push(`/quarter/${item.groupId}`)
  }

  const navigateToQuarter = (e) => {
    e.preventDefault()
    history.push('/quarter/create')
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
                  items={groupsData}
                  fields={[
                    { key: 'groupName', label: 'Tổ' },
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
