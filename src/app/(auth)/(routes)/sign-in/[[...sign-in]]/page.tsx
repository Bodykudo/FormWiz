import { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'FormWiz - Sign In',
  openGraph: {
    title: 'FormWiz - Sign In',
  },
  twitter: {
    title: 'FormWiz - Sign In',
  },
};

export default function Signinpage() {
  return <SignIn />;
}
