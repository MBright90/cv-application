import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.css'
import ExperienceForm from '../experienceForm/ExperienceForm'
import ExperienceList from '../experienceList/ExperienceList'
import { DeleteInfoModal, EditInfoModal } from '../utilities/Modals' 

ExperienceForm.propTypes = {
  closeModal: PropTypes.func,
  experienceItem: PropTypes.object,
  itemID: PropTypes.string,
  formType: PropTypes.string,
  uploadExperienceInfo: PropTypes.func,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func,
}

class ExperienceOverview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalActive: false
    }

    this.closeModal = this.props.closeModal.bind(this)
    this.showDeleteModal = this.showDeleteModal.bind(this)
    this.showExperienceModal = this.showExperienceModal.bind(this)
  }

  showDeleteModal(e) {

    const infoID = e.target.dataset.itemId

    this.setState({
      isModalActive: <DeleteInfoModal
        closeModal={this.closeModal}
        deleteFunc={this.props.deleteFunc}
        itemID={infoID}
        type='experience'
      />
    })
  }

  showExperienceModal(e) {
    const infoID = e.target.dataset.itemId
    const experienceObj = Object.assign({}, this.props.requestInfoByID(infoID, 'experience'))

    experienceObj.dateFrom = this.props.revertToDateObject(experienceObj.dateFrom)
    experienceObj.dateTo = this.props.revertToDateObject(experienceObj.dateTo)

    this.setState({
      isModalActive: <EditInfoModal 
        closeModal={this.closeModal}
        editForm={<ExperienceForm
          closeModal={this.closeModal}
          experienceItem={experienceObj}
          formType='Edit'
          itemID={infoID}
          uploadExperienceInfo={this.props.editExperienceInfo}
          validateInput={this.props.validateInput}
          validateInputSubmission={this.props.validateInputSubmission}
        />}
      />
    })
  }

  render() {
    return (
      <main>
        {this.state.isModalActive}
        <div className="experience-page-overview">
          {this.state.isModalActive}
          <ExperienceForm 
            uploadExperienceInfo={this.props.uploadExperienceInfo}
            validateInput={this.props.validateInput}
            validateInputSubmission={this.props.validateInputSubmission}
          />
          <ExperienceList 
            editable={true}
            experienceArray={this.props.userExperienceArray}
            editFunc={this.showExperienceModal}
            showDeleteFunc={this.showDeleteModal}
          />
        </div>
      </main>
    )
  }
}

ExperienceOverview.propTypes = {
  closeModal: PropTypes.func,
  deleteFunc: PropTypes.func,
  editExperienceInfo: PropTypes.func,
  requestInfoByID: PropTypes.func,
  revertToDateObject: PropTypes.func,
  uploadExperienceInfo: PropTypes.func,
  userExperienceArray: PropTypes.array,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func
}

export default ExperienceOverview