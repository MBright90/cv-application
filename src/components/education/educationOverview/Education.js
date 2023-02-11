import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EducationForm from '../educationForm/EducationForm'
import EducationList from '../educationList/EducationList'
import { DeleteInfoModal } from '../../utilities/modals/deleteInfoModal/DeleteInfoModal'
import { EditInfoModal } from '../../utilities/modals/editInfoModal/EditInfoModal'

export default class EducationOverview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalActive: false
    }

    this.closeModal = this.props.closeModal.bind(this)
    this.showDeleteModal = this.showDeleteModal.bind(this)
    this.showEducationModal = this.showEducationModal.bind(this)
  }

  showDeleteModal(e) {

    const infoID = e.target.dataset.itemId

    this.setState({
      isModalActive: <DeleteInfoModal
        closeModal={this.closeModal}
        deleteFunc={this.props.deleteFunc}
        itemID={infoID}
        type='education'
      />
    })
  }

  showEducationModal(e) {
    const infoID = e.target.dataset.itemId
    const educationObj = Object.assign({}, this.props.requestInfoByID(infoID, 'education'))

    educationObj.dateFrom = this.props.revertToDateObject(educationObj.dateFrom)
    educationObj.dateTo = this.props.revertToDateObject(educationObj.dateTo)

    this.setState({
      isModalActive: <EditInfoModal 
        closeModal={this.closeModal}
        editForm={<EducationForm
          closeModal={this.closeModal}
          educationItem={educationObj}
          formType='Edit'
          itemID={infoID}
          uploadEducationInfo={this.props.editEducationInfo}
          validateInput={this.props.validateInput}
          validateInputSubmission={this.props.validateInputSubmission}
        />}
      />
    })
  }

  render() {
    return (
      <main>
        <div className="education-page-overview">
          {this.state.isModalActive}
          <EducationForm 
            uploadEducationInfo={this.props.uploadEducationInfo}
            validateInput={this.props.validateInput}
            validateInputSubmission={this.props.validateInputSubmission}
          />
          <EducationList
            editable={true}
            educationArray={this.props.userEducationArray}
            editFunc={this.showEducationModal}
            showDeleteFunc={this.showDeleteModal}
          />
        </div>
      </main>
    )
  }
}

EducationOverview.propTypes = {
  closeModal: PropTypes.func,
  deleteFunc: PropTypes.func,
  editEducationInfo: PropTypes.func,
  requestInfoByID: PropTypes.func,
  revertToDateObject: PropTypes.func,
  uploadEducationInfo: PropTypes.func,
  userEducationArray: PropTypes.array,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func,
}
