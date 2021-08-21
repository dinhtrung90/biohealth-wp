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
  CCardHeader,
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import { FaPlus, FaMinusCircle } from 'react-icons/fa'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { quarterActions } from '../quarter.actions'
import SortableTree, {
  addNodeUnderParent,
  getFlatDataFromTree,
  toggleExpandedForAll,
  removeNodeAtPath,
} from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app
import uuid from 'react-uuid'

const Quarter = ({ props }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const animatedComponents = makeAnimated()
  const isFetchedQuarter = useSelector((state) => state.quarter.isFetchedQuarter)
  const provinces = useSelector((state) => state.quarter.provinces)
  const districts = useSelector((state) => state.quarter.districts)
  const wards = useSelector((state) => state.quarter.wards)
  const quarterTree = useSelector((state) => state.quarter.quarterTree)
  const [quarterInput, setQuarterInput] = useState('')
  const [selectedWard, setSelectedWard] = useState({
    province: null,
    district: null,
    ward: null,
    groupTree: [],
  })

  useEffect(() => {
    dispatch(quarterActions.getAllProvinces())
  }, [dispatch])

  const onProvinceChange = (option) => {
    setSelectedWard({ ...selectedWard, province: option.id })
    dispatch(quarterActions.getAllDistrictsByProvince(option))
  }

  const onDistrictChange = (option) => {
    setSelectedWard({ ...selectedWard, district: option.id })
    dispatch(quarterActions.getAllWardsByDistrict(option))
  }

  const onWardChange = (option) => {
    setSelectedWard({ ...selectedWard, ward: option.id })
  }

  const _updateQuarterTree = (tree) => {
    dispatch(
      quarterActions.updateQuarterTree(toggleExpandedForAll({ treeData: tree, expanded: true })),
    )
  }

  const onQuarterKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.length > 0) {
      quarterTree.push({ title: e.target.value, uuid: uuid() })
      _updateQuarterTree(quarterTree)
      e.target.value = ''
      setQuarterInput('')
    }
  }

  const onAddQuarterClicked = () => {
    if (!quarterInput || quarterInput.length === 0) return
    quarterTree.push({ title: quarterInput, uuid: uuid() })
    _updateQuarterTree(quarterTree)
    setQuarterInput('')
  }

  const onQuarterTreeChange = (treeData) => {
    dispatch(quarterActions.updateQuarterTree(treeData))
    setSelectedWard({ ...selectedWard, groupTree: treeData })
  }

  const handleSubmit = (e) => {
    console.log('handleSubmit selectedWard=', selectedWard)
    const payload = {
      children: selectedWard.groupTree,
      name: 'k1',
      ward: {
        district: {
          id: selectedWard.district,
          province: {
            id: selectedWard.province,
          },
        },
        id: selectedWard.ward,
      },
    }
    dispatch(quarterActions.createGroupTree(payload))
  }

  const removeNode = (rowInfo) => {
    let { node, treeIndex, path } = rowInfo
    const _newTreeData = removeNodeAtPath({
      treeData: quarterTree,
      path: path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      ignoreCollapsed: false,
    })
    console.log('removeNode _newTreeData=', _newTreeData)
    _updateQuarterTree(_newTreeData)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center mt-4">
          <CCol sm={12}>
            <CCard className="mx-4">
              <CCardHeader>Tạo mới dữ liệu</CCardHeader>
              <CCardBody className="p-4">
                <CRow>
                  <CCol sm="12" className="mb-1">
                    <CFormLabel htmlFor="province" className="col-form-label">
                      Tỉnh
                    </CFormLabel>
                    <Select
                      placeholder={<div>Chọn Tỉnh</div>}
                      options={provinces}
                      name="province-select"
                      classNamePrefix="select"
                      components={animatedComponents}
                      onChange={onProvinceChange}
                    />
                  </CCol>
                  <CCol sm="12" className="mb-1">
                    <CFormLabel htmlFor="province" className="col-form-label">
                      Quận
                    </CFormLabel>
                    <Select
                      placeholder={<div>Chọn Quận</div>}
                      options={districts}
                      name="district-select"
                      classNamePrefix="select"
                      components={animatedComponents}
                      onChange={onDistrictChange}
                    />
                  </CCol>
                  <CCol sm="12" className="mb-1">
                    <CFormLabel htmlFor="province" className="col-form-label">
                      Phường
                    </CFormLabel>
                    <Select
                      placeholder={<div>Chọn Phường</div>}
                      options={wards}
                      name="ward-select"
                      classNamePrefix="select"
                      components={animatedComponents}
                      onChange={onWardChange}
                    />
                  </CCol>
                  <CCol sm="12" className="mb-1">
                    <CFormLabel htmlFor="province" className="col-form-label">
                      Khu phố (Tổ)
                    </CFormLabel>
                    <CInputGroup>
                      <CFormControl
                        id="quarterInput"
                        name="quarterInput"
                        placeholder="Khu phố (Tổ)"
                        value={quarterInput}
                        onChange={(e) => setQuarterInput(e.target.value)}
                        onKeyDown={onQuarterKeyDown}
                      />
                      <CInputGroupText>
                        <FaPlus className="icon-plus" onClick={onAddQuarterClicked} />
                      </CInputGroupText>
                    </CInputGroup>
                  </CCol>
                  <CCol sm={12}>
                    quarterTree={JSON.stringify(quarterTree)}
                    {isFetchedQuarter > 0 ? (
                      <div style={{ height: '100%' }}>
                        <SortableTree
                          treeData={quarterTree}
                          maxDepth={2}
                          isVirtualized={false}
                          onChange={(treeData) => onQuarterTreeChange(treeData)}
                          generateNodeProps={(extendedNode, index) => ({
                            buttons: [
                              <FaMinusCircle
                                className="icon-delete"
                                key={index}
                                onClick={() => removeNode(extendedNode)}
                              />,
                            ],
                          })}
                        />
                      </div>
                    ) : null}
                  </CCol>
                  <CCol sm="12" className="mb-1">
                    <hr />
                  </CCol>
                  <CCol sm="12" className="flex-center">
                    <CButton onClick={handleSubmit}>{t('common.Save')}</CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Quarter
