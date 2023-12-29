import { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'FormWiz - Sign In',
  openGraph: {
    title: 'FormWiz - Sign In',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/mockup.png`],
  },
  twitter: {
    title: 'FormWiz - Sign In',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/mockup.png`],
  },
};

export default function Signinpage() {
  return <SignIn />;
}
