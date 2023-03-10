import * as imageConversion from 'image-conversion'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export default class Server {
  constructor() {
    this.user = {
      firstName: '',
      surname: '',
      email: '',
      contactNumber: '',
      profession: '',
      avatarImg: null,
      experience: [],
      education: [],
      coverLetter: '',
      reference: {
        name: '',
        position: '',
        email: ''
      }
    }
  }

  clearStorage() {
    localStorage.clear()
  }

  saveToStorage() {
    localStorage.setItem('user', JSON.stringify(this.user))
  }

  async loadFromStorage() {
    let savedUser
    try {
      savedUser = await JSON.parse(localStorage.getItem('user'))
    } finally {
      if (savedUser) this.user = savedUser
    }
  }

  //*****************//
  // Utility methods //
  //*****************//

  generateID = (array) => {
    let newID
    let IDChecking = true
    while (IDChecking) {
      // Suggest a new ID based on ms since 01/01/1970
      // Set ID checking to false so if no matches are found, it no longer checks
      newID = Date.now().toString()
      IDChecking = false

      // Go through the array to check that current suggested ID does not match any other
      // IDs within array
      array.forEach((arrayItem) => {
        if (arrayItem.ID == newID) IDChecking = true
      })
    }
    return newID
  }

  // Formats date to (MMM YYYY) where MMM is a three letter abbreviation
  formatDate = (dateString) => {
    const dateSplitArray = dateString.split('-')

    let monthIndex = dateSplitArray[1] - 1 >= 0 ? dateSplitArray[1] - 1 : 12

    return `${months[monthIndex]} ${dateSplitArray[0]}`
  }

  removeEmptyFields = (array) => {
    return array.filter((item) => {
      if (item != '') return item
    })
  }

  // Takes formatted date (MMM YYYY) where MMM is a three letter abbreviation and
  // returns an ISO string to pass as default value to inputs
  revertDate = (dateString) => {
    const dateSplitArray = dateString.split(' ')
    const monthIndex = months.indexOf(dateSplitArray[0])
    return new Date(dateSplitArray[1], monthIndex).toISOString().substring(0, 10)
  }

  // Takes the formatted date (MMM - yyyy) where MMM is a three letter abbreviation
  // and returns the array sorted by most recent first
  sortByDate = (array) => {
    if (array.length <= 1) return array
    const sortedArray = array.sort((a, b) => {
      // Split the end dates for comparison
      const aDateSplit = a.dateTo.split(' ')
      const bDateSplit = b.dateTo.split(' ')

      // Compare year ending)
      const aYearEnd = parseInt(aDateSplit[1], 10)
      const bYearEnd = parseInt(bDateSplit[1], 10)

      if (aYearEnd > bYearEnd) return -1
      if (aYearEnd < bYearEnd) return 1

      // Compare month ending if year is equal
      const aMonthEnd = months.indexOf(aDateSplit[0])
      const bMonthEnd = months.indexOf(bDateSplit[0])
      if (aMonthEnd > bMonthEnd) return -1
      if (aMonthEnd < bMonthEnd) return 1

      // If certificates completed on the same month and year
      // compare beginning dates
      const aStartDateSplit = a.dateFrom.split(' ')
      const bStartDateSplit = b.dateFrom.split(' ')

      // Compare year beginning
      const aYearStart = parseInt(aStartDateSplit[1], 10)
      const bYearStart = parseInt(bStartDateSplit[1], 10)
      if (aYearStart > bYearStart) return -1
      if (aYearStart < bYearStart) return 1

      // Compare month beginning if month starting is equal
      // If remains equal return -1
      const aMonthStart = months.indexOf(aDateSplit[0])
      const bMonthStart = months.indexOf(bDateSplit[0])
      if (aMonthStart >= bMonthStart) return -1
      else return 1
    })

    return sortedArray
  }

  //******************//
  // Creating methods //
  //******************//
  // If an infoID is supplied, alters the current information object with that ID.
  // Otherwise it creates a new information object and generates a random ID

  /**
   * Creates or updates an education object in the user's education array.
   * @param {Object} educationObj - The education object to be created or updated.
   * This object should have the following properties:
   * - institution: string
   * - dateFrom: string (formatted as YYYY-MM)
   * - dateTo: string (formatted as YYYY-MM)
   * - certificates: array
   * @param {string} [infoID] - (Optional) The ID of the education object to be updated. If
   * not provided, a new education object will be created.
   */
  createEducationInfo(educationObj, infoID) {
    const educationItem = educationObj

    educationItem.dateFrom = this.formatDate(educationObj.dateFrom)
    educationItem.dateTo = this.formatDate(educationObj.dateTo)

    if (infoID) {
      educationItem.ID = infoID
      const infoIndex = this.user.education.map((item) => item.ID).indexOf(infoID)
      this.user.education[infoIndex] = educationItem
    } else {
      educationItem.ID = this.generateID(this.user.education)
      this.user.education[this.user.education.length] = educationItem
    }

    // Sort experience array by date prior to saving
    const sortedArray = this.sortByDate(this.user.education)
    this.user.education = sortedArray
    this.saveToStorage()
  }

  /**
   * Creates or updates an experience object in the user's experience array.
   *  @param {Object} experienceObj: A JavaScript object representing an experience, with the following properties:
   * title (string): The title of the experience.
   * company (string): The name of the company where the experience took place.
   * location (string): The location of the company.
   * dateFrom (string): The starting date of the experience, in the format "YYYY-MM-DD".
   * dateTo (string): The ending date of the experience, in the format "YYYY-MM-DD".
   * description (string): A description of the experience.
   * @param {String} infoID - (Optional): A string representing the ID of an existing experience. If
   * not provided, a new experience object will be created.
   */
  createExperienceInfo(experienceObj, infoID) {
    const experienceItem = experienceObj

    experienceItem.dateFrom = this.formatDate(experienceObj.dateFrom)
    experienceItem.dateTo = this.formatDate(experienceObj.dateTo)

    if (infoID) {
      experienceItem.ID = infoID
      const infoIndex = this.user.experience.map((item) => item.ID).indexOf(infoID)
      this.user.experience[infoIndex] = experienceItem
    } else {
      experienceItem.ID = this.generateID(this.user.experience)
      this.user.experience[this.user.experience.length] = experienceItem
    }

    // Sort experience array by date prior to saving
    const sortedArray = this.sortByDate(this.user.experience)
    this.user.experience = sortedArray
    this.saveToStorage()
  }

  //*****************//
  // Reading methods //
  //*****************//

  getCurrentInfo() {
    return this.user
  }

  getInfoByID(ID, type) {
    let foundObject = -1
    this.user[type]?.forEach((arrayItem) => {
      if (arrayItem.ID == ID) {
        foundObject = arrayItem
      }
    })
    return foundObject
  }

  //**************************//
  // Updating/editing methods //
  //**************************//

  async updateAvatarChange(avatarImageFile) {
    const saveAvatarToStorage = (avatarBaseImg) => {
      this.user.avatarImg = avatarBaseImg
      this.saveToStorage()
    }

    // Compress image
    const blobResult = await imageConversion.compressAccurately(avatarImageFile, 200)

    // Initiate fileReader and set to save result when loaded
    const fileReader = new FileReader()
    fileReader.onload = async function (readerResult) {
      saveAvatarToStorage(readerResult.target.result)
    }

    // Pass compressed image to fileReader
    fileReader.readAsDataURL(blobResult)
  }

  updateAccountInfo(infoObj) {
    this.user.firstName = infoObj.firstName
    this.user.surname = infoObj.surname
    this.user.email = infoObj.email
    this.user.contactNumber = infoObj.contactNumber
    this.user.profession = infoObj.profession
    this.saveToStorage()
  }

  updateReferenceInfo(infoObj) {
    this.user.reference.name = infoObj.name
    this.user.reference.position = infoObj.position
    this.user.reference.email = infoObj.email
    this.saveToStorage()
  }

  //******************//
  // Deleting methods //
  //******************//

  deleteInfo(infoID, type) {
    const infoIndex = this.user[type].map((item) => item.ID).indexOf(infoID)
    this.user[type].splice(infoIndex, 1)
    this.saveToStorage()
  }

  //********************//
  // Validation methods
  // *******************//

  validateMinLength(inputElement) {
    if (inputElement.value.length < inputElement.minLength)
      return `Please include at least ${inputElement.minLength} characters`
    return ''
  }

  validateDateComparison(dateInputArr) {
    const dateFrom = dateInputArr.find((input) => input.dataset.date === 'from')
    const dateTo = dateInputArr.find((input) => input.dataset.date === 'to')

    return dateFrom.value < dateTo.value
  }

  validateEmailSubmission(emailInput) {
    const value = emailInput.value
    if (!value.match(/^\w+([.-]?w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/))
      return 'Please enter a valid email address'
    return ''
  }

  /**
   * Validates input submission by checking various criteria for each input element in the inputElementArr parameter.
   * @param {Array} inputElementArr - An array of HTML input elements to be validated
   * @returns {String} - An error message if any validation criteria fail, or an empty string if all inputs are valid.
   * If an error message is returned, the input element which failed validation is also assigned to the variable invalidInput.
   */
  validateInputSubmission(inputElementArr) {
    let validCheck = ''
    let invalidInput = false

    // Check through all inputs and any that are text based/textAreas, check their
    // minLength attribute via function call
    for (let i = 0; i < inputElementArr.length; i++) {
      const inputElement = inputElementArr[i]
      if (inputElement.type === 'text' || inputElement.nodeName === 'TEXTAREA') {
        validCheck = this.validateMinLength(inputElement)
        if (validCheck !== '') {
          invalidInput = inputElement
          break
        }
      }
    }

    if (validCheck === '') {
      const dateInputArr = inputElementArr.filter((input) => input.type === 'date')

      // If there are multiple "date from" and "date to" inputs:
      if (dateInputArr.length > 1 && !this.validateDateComparison(dateInputArr)) {
        validCheck = 'Ensure "Date From" comes before "Date To"'
        invalidInput = dateInputArr[0]
      }
    }

    // If any input expects an email
    if (validCheck === '') {
      const emailInputArr = inputElementArr.filter((input) => input.id.includes('email'))
      if (emailInputArr.length > 0) {
        for (let i = 0; i < emailInputArr.length; i += 1) {
          validCheck = this.validateEmailSubmission(emailInputArr[i])
          if (validCheck !== '') {
            invalidInput = emailInputArr[i]
            break
          }
        }
      }
    }

    return [validCheck, invalidInput]
  }
}
