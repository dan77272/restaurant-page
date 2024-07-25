// app/api/admin/secure-data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../utils/authOptions';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session) {
    // User is authenticated, return secure data
    return NextResponse.json({ message: 'This is secure data' });
  } else {
    // User is not authenticated
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
