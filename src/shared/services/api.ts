import axios from 'axios'

const query = axios.create({
  baseURL: 'https://lrvalrdo8k.execute-api.us-east-1.amazonaws.com/Prod',
})

const getNonce = async (publicAddress: string) => {
  const response = await query.get('/users/nonce', { params: { publicAddress } })

  return response.data
}

const getToken = async (nonce: string, signature: string) => {
  const response = await query.post('/auth/token', {
    nonce,
    signature,
  })

  return response.data
}

const getOwnedNFT = async () => {
  const response = await query.get('/users/nfts')
  return response.data
}

export { getNonce, getOwnedNFT, getToken }
