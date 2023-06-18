import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
export const runtime = 'edge'
export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag') as string
  revalidateTag(tag)
  //   const path = request.nextUrl.searchParams.get('path') || '/'
  //   revalidatePath(path)
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
