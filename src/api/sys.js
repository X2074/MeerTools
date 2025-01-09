import requestAuth from '@/utils/requestAuth.ts'
export function subscribeEmail(data) {
  return requestAuth({
    url: 'emails',
    method: 'POST',
    data
  })
}
