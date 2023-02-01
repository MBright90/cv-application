import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SaveInfoButton extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      currentMessage: '',
    }
  
    this.notifyMessage = this.notifyMessage.bind(this)
  }
  
  #clearNotification = () => {
    // Clear the success notification after three seconds
    this.timerID = setTimeout(() => {
      this.setState({
        currentMessage: ''
      })
    }, 3000)
  }
  
  notifyMessage = (message) => {
    this.setState({
      currentMessage: message
    })
    this.#clearNotification()
  }
  
  handleFormData = (e) => {
    const clearValues = (inputElements) => {
      inputElements.forEach((el) => el.value = null)
    }

    e.preventDefault()

    // Search for all inputs/textAreas within the form and 
    // submit to the server for validation before committing
    const inputArr = [
      ...e.target.parentNode.parentNode.querySelectorAll('input'),
      ...e.target.parentNode.parentNode.querySelectorAll('textarea')
    ]
    const validatedInfo = this.props.validateInputSubmission(inputArr)
    console.log(validatedInfo)

    if (validatedInfo === '') {
      // map into an array of values for parsing and pass to 
      const inputValues = inputArr.map((inputField) => inputField.value)
      this.props.uploadData(inputValues, e.target.dataset.itemId, e.target.dataset.infoType)
      this.notifyMessage('Update successful')
      if (this.props.setToClear === true) clearValues(inputArr)

      // If editing via an open modal, close model after submitting
      if (this.props.closeModal) this.props.closeModal()

    } else {
      // If there is a validation message to display, notify the user
      this.notifyMessage(validatedInfo)
    }

  }
  
  render() {
    return (
      <div className="save-button-container span-two">
        <button 
          className="save-button hover-button"
          type="submit"
          data-item-id={this.props.itemID}
          data-info-type={this.props.infoType}
          onClick={this.handleFormData}
        >Update</button>
        <p>{this.state.currentMessage}</p>
      </div>
    )
  }
}

SaveInfoButton.defaultProps = {
  infoType: '',
  itemID: '',
  setToClear: true
}

SaveInfoButton.propTypes = {
  closeModal: PropTypes.func,
  infoType: PropTypes.string,
  itemID: PropTypes.string,
  setToClear: PropTypes.bool,
  uploadData: PropTypes.func,
  validateInputSubmission: PropTypes.func,
}

const EditButton = (props) => {
  return (
    <button
      className="edit-button hover-button"
      type="button"
      data-item-id={props.itemID}
      onClick={props.editFunc}>
      <i className="fa-solid fa-pen-to-square"></i>
    </button>
  )
}

EditButton.propTypes = {
  editFunc: PropTypes.func,
  itemID: PropTypes.string,
}

const DeleteButton = (props) => {
  return (
    <button
      className="delete-button hover-button"
      type="button"
      data-item-id={props.itemID}
      onClick={props.showDeleteFunc}>
      <i className="fa-solid fa-trash-can"></i>
    </button>
  )
}

DeleteButton.propTypes = {
  itemID: PropTypes.string,
  showDeleteFunc: PropTypes.func,
}

export { SaveInfoButton, EditButton, DeleteButton }