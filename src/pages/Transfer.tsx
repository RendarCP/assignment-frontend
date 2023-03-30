import { ethers } from 'ethers'
import { isAddress } from 'ethers/lib/utils'
import { Resolver, useForm } from 'react-hook-form'

import { Button } from '@/components/design'
import { useAuth } from '@/shared/hooks/useAuth'

const Transfer = () => {
  const { user } = useAuth()

  const formResolver: Resolver = async values => ({
    values,
    errors:
      !isAddress(values.transferWallet) || user?.publicAddress === values.transferWallet
        ? { transferWallet: { type: 'validate', message: '유효한 입력값을 입력해주세요!' } }
        : {},
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: formResolver })
  const amount = watch('amount', 0.1)
  const transferWallet = watch('transferWallet', '')

  const onSubmit = async (data: any) => {
    console.log('data', data)
    if (!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const etherAmount = ethers.utils.parseEther(data.amount)

    const transaction = {
      to: data.transferWallet,
      value: etherAmount,
    }
    try {
      const tx = await signer.sendTransaction(transaction)
      console.log('Transaction hash:', tx.hash)
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div>NFT 전송</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          NFT MOUNT:
          <input
            className="mt-1 rounded text-textBlack w-full disabled:opacity-40 disabled:text-opacity-40"
            type="number"
            {...register('amount', { required: true, min: 0 })}
          />
          {errors.amount && <span>Amount is required and must be a positive number.</span>}
        </label>
        <label>
          전송 주소:
          <input
            className="mt-1 rounded text-textBlack w-full disabled:opacity-40 disabled:text-opacity-40"
            type="text"
            {...register('transferWallet', {
              required: true,
              validate: (value: string) => {
                if (watch('transferWallet') === user.publicAddress) {
                  return '나에게는 전송할 수 없습니다.'
                }
              },
            })}
          />
          {errors.transferWallet && (
            <span className="text-red-400">{errors?.transferWallet?.message?.toString()}</span>
          )}
        </label>
        <Button text="전송" className="mt-4" type="submit" disable={!amount || !transferWallet} />
      </form>
    </div>
  )
}

export default Transfer
