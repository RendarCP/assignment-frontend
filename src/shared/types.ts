interface IAuthType {
  publicAddress: string
  token: string
}

interface IAItemProps {
  name: string
  dateTime: string
  address: string
  tokenId: string
}

export type { IAItemProps, IAuthType }
