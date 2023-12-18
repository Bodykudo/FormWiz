import { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'FormWiz - Sign In',
  openGraph: {
    title: 'FormWiz - Sign In',
    images: ['https://formwiz.vercel.app/mockup.png'],
  },
  twitter: {
    title: 'FormWiz - Sign In',
    images: ['https://formwiz.vercel.app/mockup.png'],
  },
};

export default function Signinpage() {
  return <SignIn />;
}
