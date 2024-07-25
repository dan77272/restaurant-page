// lib/getServerSession.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../src/utils/authOptions';

export async function getSession() {
  return await getServerSession(authOptions);
}
