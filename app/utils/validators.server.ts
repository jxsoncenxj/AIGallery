export const validateEmail = (email: string): string | undefined => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.length || !validRegex.test(email)) {
      return "Please enter a valid email address including @ symbol"
    }
  }
  
  export const validatePassword = (password: string): string | undefined => {
    if (password.length < 6) {
      return "Please enter a password that is at least 6 characters long"
    }
  }
  
  export const validateName = (name: string): string | undefined => {
    if (!name.length) return `Please enter a characters from the alphabet`
  }
  export const validatePhoneNumber = (phoneNumber: string): string | undefined => {
    if (!phoneNumber.length) return `Please enter a number`
  }
  export const validateUsername = (username: string): string | undefined => {
    if (!username.length) return `Please enter a valid username`
  }