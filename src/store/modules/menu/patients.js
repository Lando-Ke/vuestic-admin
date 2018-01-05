import lazyLoading from './lazyLoading.js'

export default {
  name: 'Patients',
  meta: {
    expanded: false,
    title: 'menu.patients',
    iconClass: 'vuestic-icon vuestic-icon-tables'
  },
  children: [
    {
      name: 'All Patients',
      path: '/patients',
      component: lazyLoading('patients/Patients'),
      meta: {
        default: false,
        title: 'menu.allPatients'
      }
    }, {
      name: 'Add Patient',
      path: '/patients/new',
      component: lazyLoading('patients/CreatePatient'),
      meta: {
        title: 'menu.newPatient'
      }
    }
  ]
}
