import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const register = newUser => {
  return axios
    .post('http://localhost:8080/users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('http://localhost:8080/users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('http://localhost:8080/users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const sendData = data => {
  return axios
   .post('http://localhost:8080/users/data', {
    email: jwt_decode(localStorage.getItem('usertoken')).identity.email,
    score: data.score,
    numberOfQuestions: data.numberOfQuestions,
    numberOfAnsweredQuestions: data.numberOfAnsweredQuestions,
    correctAnswers: data.correctAnswers,
    wrongAnswers: data.wrongAnswers,
    hintsUsed: data.hintsUsed,
    fiftyFiftyUsed: data.fiftyFiftyUsed
    
   })
   .then(response => {
    
    return response.data
  })
  .catch(err => {
    console.log(err)
  })
}
