import axios from 'axios'

const query = axios.create({
  baseURL: 'https://lrvalrdo8k.execute-api.us-east-1.amazonaws.com/Prod',
})

const getNonce = async (publicAddress: string) => {
  const response = await query.get('/users/nonce', { params: { publicAddress } })

  return response.data
}

const getToken = async (publicAddress: string, signature: string) => {
  const response = await query.post('/auth/token', {
    publicAddress,
    signature,
  })

  return response.data
}

const getOwnedNFT = async (token: string) => {
  const response = await query.get('/users/nfts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export { getNonce, getOwnedNFT, getToken }
