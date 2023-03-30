import { IAItemProps } from '@/shared/types'

const AccountItem = ({ name, dateTime }: IAItemProps) => {
  return (
    <div>
      <div>{name}</div>
      <div>{dateTime}</div>
    </div>
  )
}

export default AccountItem
