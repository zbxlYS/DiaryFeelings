'use client'

import { useSession } from 'next-auth/react'
import {
  signJwtAccessToken,
  signJwtRefreshToken,
  verifyJwt,
  verifyRefresh,
} from '@/app/lib/jwt'

const CheckToken = async () => {
  // access token을 체크해서 만료됐을 시 갱신하기 => slient refresh

  const { data: session } = useSession()
  let newRefresh = ''
  let newAccess = ''
  // token 만료 => refresh 검증 => 만료 시 재생성 => 만료 안 되면 갱신.
  const user_id = session?.user?.id as string
  const curToken = session?.accessToken as string
  const chkToken = verifyJwt(curToken)
  if (!chkToken) return false // 토큰이 없거나 복호화되지 않음.
  const curTime = Math.floor(Date.now() / 1000)
  if (chkToken.exp && chkToken.exp >= curTime) return false // 토큰이 만료되지 않음.
  const curRefresh = session?.refreshToken as string
  const chkRefresh = verifyRefresh(curRefresh)
  if (!chkRefresh) return false // 토큰이 없거나 복호화되지 않음.
  if (chkRefresh.exp && chkRefresh.exp < curTime) {
    // 리프레시 토큰이 만료됨.
    newRefresh = await signJwtRefreshToken(user_id)
  }
  newAccess = signJwtAccessToken({ user_id: user_id })
  if (session) session.accessToken = newAccess
  return true
}

export default CheckToken
