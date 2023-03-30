import { useQuery } from '@tanstack/react-query'

import AccountItem from '@/components/design/AcccountItem'
import { useAuth } from '@/shared/hooks/useAuth'
import { getOwnedNFT } from '@/shared/services/api'

const Account = () => {
  // const user = useRecoilValue(userState)
  const { user } = useAuth()
  const { data } = useQuery({
    queryKey: ['ownAccount'],
    retry: 2,
    queryFn: () => getOwnedNFT(user.token),
  })
  console.log('ownAccount', data)
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>MY ACCOUNT</div>
      {data?.data?.ownedNfts.map((nft: any) => {
        return (
          <AccountItem
            name={nft.contractMetadata.name}
            dateTime={nft.contractMetadata.openSea.lastIngestedAt}
          />
        )
      })}
    </div>
  )
}

export default Account
