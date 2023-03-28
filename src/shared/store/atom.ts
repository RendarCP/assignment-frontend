import { atom } from 'recoil'

const userState = atom({
  key: 'userState',
  default: {
    publicAddress: '',
    token: '',
  },
})

export { userState }
