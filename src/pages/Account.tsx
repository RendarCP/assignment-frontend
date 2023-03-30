import { useQuery } from '@tanstack/react-query'

import AccountItem from '@/components/design/AcccountItem'
import Loader from '@/components/design/Loader'
import { useAuth } from '@/shared/hooks/useAuth'
import { getOwnedNFT } from '@/shared/services/api'

const Account = () => {
  const { user } = useAuth()
  const { isLoading, data } = useQuery({
    queryKey: ['ownAccount'],
    retry: 2,
    queryFn: () => getOwnedNFT(user.token),
    enabled: user.token !== '',
  })

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>MY ACCOUNT</div>
      {isLoading ? (
        <Loader />
      ) : (
        data?.data?.ownedNfts.map((nft: any) => {
          return (
            <AccountItem
              name={nft.contractMetadata.name}
              dateTime={nft.contractMetadata.openSea.lastIngestedAt}
              address={nft.contract.address}
              tokenId={nft.id.tokenId}
            />
          )
        })
      )}
    </div>
  )
}

export default Account
