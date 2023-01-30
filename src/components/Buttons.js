import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SaveInfoButton extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      currentMessage: '',
    }
  
    this.notifySave = this.notifySave.bind(this)
  }
  
  #clearNotification = () => {
    // Clear the success notification after three seconds
    this.timerID = setTimeout(() => {
      this.setState({
        currentMessage: ''
      })
    }, 3000)
  }
  
  notifySave = (message) => {
    this.setState({
      currentMessage: message
    })
    this.#clearNotification()
  }
  
  handleFormData = (e) => {
    const clearValues = (inputElements) => {
      inputElements.forEach((el) => el.value = null)
    }
    // Retrieve all inputs in the data container and return an object of values to
    // the App component
    e.preventDefault()

    // Search for all inputs/textAreas within the form and map into an array of values
    console.log(e.target.parentNode.parentNode)
    const inputArr = [
      ...e.target.parentNode.parentNode.querySelectorAll('input'),
      ...e.target.parentNode.parentNode.querySelectorAll('textarea')
    ]
    const inputValues = inputArr.map((inputField) => inputField.value)

    // If the inputs are set to clear, empty them after storing 
    // the values and submit to the server
    if (this.props.setToClear === true) clearValues(inputArr)
    this.props.uploadData(inputValues, e.target.dataset.itemId, e.target.dataset.infoType)

    // If editing via an open modal, close model after submitting
    if (this.props.closeModal) this.props.closeModal()
  }
  
  render() {
    return (
      <div className="save-button-container span-two">
        <button 
          className="save-button hover-button"
          type="submit"
          data-item-id={this.props.itemID}
          data-info-type={this.props.infoType}
          onClick={(e) => {
            this.handleFormData(e)
            this.notifySave('Update Successful')
          }}
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
  itemID: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
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
  itemID: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  showDeleteFunc: PropTypes.func,
}

export { SaveInfoButton, EditButton, DeleteButton }