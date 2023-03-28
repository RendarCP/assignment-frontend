import { atom } from 'recoil'

const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

export { userState }
