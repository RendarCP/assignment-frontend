import { atom } from 'recoil'

const userState = atom({
  key: 'userState',
  default: {
    publicAddress: '',
    token: '',
  },
})

const isLogined = atom({
  key: 'isLogined',
  default: false,
})

export { isLogined, userState }
