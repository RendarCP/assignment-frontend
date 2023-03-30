import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/design'
import { useAuth } from '@/shared/hooks/useAuth'

const Home = () => {
  const navigate = useNavigate()
  const { isLogin, user, onLogin } = useAuth()

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="font-bold text-lg underline underline-offset-2">KONKRIT</h1>
      <div>
        {isLogin ? (
          <div className="flex flex-col justify-center items-center">
            <span>환영합니다, </span>
            <div className="flex flex-col justify-center items-center overflow-auto">
              <span className="w-52">{user.token}</span>
            </div>
            <Button text="MY ACCOIUNT" onClick={() => navigate('/account')} />
          </div>
        ) : (
          <Button text="Connect MetaMask" className="my-3 px-3" onClick={onLogin} />
        )}
      </div>
    </div>
  )
}

export default Home
