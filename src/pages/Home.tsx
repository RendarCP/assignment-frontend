import { ethers } from 'ethers'
import { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { Button } from '@/components/design'
import { getNonce, getToken } from '@/shared/services/api'
import { userState } from '@/shared/store/atom'

const Home = () => {
  const [user, setUser] = useRecoilState(userState)

  const onLogInMetaMask = useCallback(async () => {
    if (!window.ethereum) return false
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const accounts = await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const nonceValue = await getNonce(accounts[0])

    const signature = await signer.signMessage(nonceValue.nonce)
    const token = await getToken(nonceValue.publicAddress, signature)

    setUser({
      publicAddress: nonceValue.publicAddress,
      token: token.data.access_token,
    })
  }, [])
  console.log('test', user)
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="font-bold text-lg underline underline-offset-2">KONKRIT</h1>
      <div>
        <Button text="Connect MetaMask" className="my-3 px-3" onClick={onLogInMetaMask} />
      </div>
    </div>
  )
}

export default Home
