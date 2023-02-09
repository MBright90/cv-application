import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style'

export default class SaveInfoButton extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      currentMessage: '',
    }
    
    this.notifyMessage = this.notifyMessage.bind(this)
  }
  
  #removeInvalidHighlight = (inputElement) => {
    // Clear the success notification after three seconds
    this.highlightTimerID = setTimeout(() => {
      inputElement.classList.remove('invalid-highlight')
    }, 3000)
  }
    
  highlightInvalidField = (inputElement) => {
    inputElement.classList.add('invalid-highlight')
    this.#removeInvalidHighlight(inputElement)
  }
    
  #clearNotification = () => {
    // Clear the success notification after three seconds
    this.notificationTimerID = setTimeout(() => {
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
  
    // Retrieve an array, with index 0 being the validation message and
    // index 1 being the first invalid field
    const validatedInfo = this.props.validateInputSubmission(inputArr)
  
    if (!validatedInfo[1]) {
      // map into an array of values for parsing and pass to relevant server function
      const inputValues = inputArr.map((inputField) => inputField.value)
      this.props.uploadData(inputValues, e.target.dataset.itemId, e.target.dataset.infoType)
      this.notifyMessage('Update successful')
      if (this.props.setToClear === true) clearValues(inputArr)
  
      // If editing via an open modal, close model after submitting
      if (this.props.closeModal) this.props.closeModal()
  
    } else {
      // If there is a validation message to display, notify the user and
      // highlight all invalid fields
      this.notifyMessage(validatedInfo[0])
      this.highlightInvalidField(validatedInfo[1])
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
