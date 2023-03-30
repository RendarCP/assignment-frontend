import { useNavigate } from 'react-router-dom'

import { IAItemProps } from '@/shared/types'

import Button from './Button'

const AccountItem = ({ name, dateTime, address, tokenId }: IAItemProps) => {
  const navigate = useNavigate()
  return (
    <div>
      <div>{name}</div>
      <div>{dateTime}</div>
      <div>
        <Button text="NFT 전송하기" className="my-3 px-3" onClick={() => navigate('/transfer')} />
      </div>
    </div>
  )
}

export default AccountItem
