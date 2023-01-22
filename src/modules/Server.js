export default class Server {
  constructor() {
    this.user = {
      name: '',
      email: '',
      contactNumber: '',
      avatarImg: null,
      experience: null,
      education: null,
      coverLetter: null,
    }

    const savedUser = localStorage.getItem('user')
  }

  getCurrentInfo() {
    return this.user
  }

  saveToStorage() {
    localStorage.setItem('user', this.user)
  }

  saveAvatarChange(newAvatarImage) {
    this.user.avatarImg = newAvatarImage
  }

  saveAccountInfo(infoArray) {
    this.user.name = infoArray.name !== '' 
      ? infoArray.name 
      : this.user.name
    this.user.email = infoArray.email !== ''
      ? infoArray.email
      : this.user.email
    this.user.contactNumber = infoArray.number !== ''
      ? infoArray.contactNumber
      : this.user.contactNumber
  }

  // Validation methods
  // ...

  // TODO: Methods to save all data to localStorage
  
  // TODO: take an argument for each attribute and save.

  // TODO: Edit data at particular index in experience/education

  // TODO: Overwrite personal data
}
