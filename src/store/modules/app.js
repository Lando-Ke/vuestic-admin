import * as types from '../mutation-types'
import * as firebase from 'firebase'

const state = {
  sidebar: {
    opened: false,
    withoutAnimation: false
  },
  config: {
    googleMaps: {
      apiKey: 'AIzaSyBNAqPrTQoz9P4NBlDDyfxrnKiafkaL8iQ'
    },
    windowMatchSizeLg: '(min-width: 992px)',
    palette: {
      primary: '#4ae387',
      danger: '#e34a4a',
      info: '#4ab2e3',
      success: '#db76df',
      warning: '#f7cc36',
      white: '#fff',
      black: '#000',
      fontColor: '#34495e',
      transparent: 'transparent',
      lighterGray: '#ddd'
    }
  },
  isLoading: true,
  user: null,
  patients: []
}

const mutations = {
  [types.CLOSE_MENU] (state) {
    if (document.documentElement.clientWidth < 992) {
      state.sidebar.opened = false
    }
  },
  [types.TOGGLE_SIDEBAR] (state, opened) {
    state.sidebar.opened = opened
  },
  [types.TOGGLE_WITHOUT_ANIMATION] (state, value) {
    state.sidebar.withoutAnimation = value
  },
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setUser (state, payload) {
    state.user = payload
  },
  createPatient (state, payload) {
    state.patients.push(payload)
  }
}

const actions = {
  closeMenu ({commit}) {
    commit(types.CLOSE_MENU)
  },
  toggleSidebar ({commit}, opened) {
    commit(types.TOGGLE_SIDEBAR, opened)
  },
  isToggleWithoutAnimation ({commit}, value) {
    commit(types.TOGGLE_WITHOUT_ANIMATION, value)
  },
  signUserUp ({commit}, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          console.log(user)
          const newUser = {
            id: user.uid,
            name: user.email
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
  },
  signUserIn ({commit}, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid,
            name: user.email
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
  },
  createPatient ({commit}, payload) {
    console.log(payload)
    const patient = {
      name: payload.name,
      email: payload.email,
      mobile: payload.mobile,
      altMobile: payload.altMobile,
      county: payload.county,
      subCounty: payload.subCounty,
      ward: payload.ward,
      village: payload.village
    }
    firebase.database().ref('patients').push(patient)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
