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
  }

  getCurrentInfo() {
    return this.user
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
    }
    finally {
      if (savedUser) this.user = savedUser
    }
    console.log(this.user)
  }

  updateAvatarChange(newAvatarImage) {
    this.user.avatarImg = newAvatarImage

    this.saveToStorage()
  }

  updateAccountInfo(infoArray) {
    this.user.name = infoArray.name !== '' 
      ? infoArray.name 
      : this.user.name
    this.user.email = infoArray.email !== ''
      ? infoArray.email
      : this.user.email
    this.user.contactNumber = infoArray.number !== ''
      ? infoArray.contactNumber
      : this.user.contactNumber

    this.saveToStorage()
  }

  // Validation methods
  // ...

  // TODO: Methods to save all data to localStorage
  
  // TODO: take an argument for each attribute and save.

  // TODO: Edit data at particular index in experience/education

  // TODO: Overwrite personal data
}
