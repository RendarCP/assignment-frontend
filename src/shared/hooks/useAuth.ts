import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { LOGIN_USER } from '../constants'
import { getNonce, getToken } from '../services/api'
import { isLogined, userState } from '../store/atom'
import { IAuthType } from '../types'

type ReturnType = {
  isLogin: boolean | null
  user: IAuthType
  onLogin: () => void
}

const useAuth = (): ReturnType => {
  const [user, setUser] = useRecoilState(userState)
  const [isLogin, setIsLogin] = useRecoilState(isLogined)

  useEffect(() => {
    const data = localStorage.getItem(LOGIN_USER)
    if (!data) {
      setIsLogin(false)
    } else {
      setUser(JSON.parse(data))
      setIsLogin(true)
    }
  }, [])

  const onLogin = useCallback(async () => {
    if (!window.ethereum) return false
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const accounts = await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const nonceValue = await getNonce(accounts[0])

    const signature = await signer.signMessage(nonceValue.nonce)
    const token = await getToken(nonceValue.publicAddress, signature)

    const userData = {
      publicAddress: nonceValue.publicAddress,
      token: token.data.access_token,
    }
    setUser(userData)
    localStorage.setItem(LOGIN_USER, JSON.stringify(userData))
  }, [])

  return { isLogin, user, onLogin }
}

export { useAuth }
