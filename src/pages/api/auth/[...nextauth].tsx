import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export default handler;
