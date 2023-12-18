import { Metadata } from 'next';
import { SignUp } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'FormWiz - Sign Up',
  openGraph: {
    title: 'FormWiz - Sign Up',
    images: ['https://formwiz.vercel.app/mockup.png'],
  },
  twitter: {
    title: 'FormWiz - Sign Up',
    images: ['https://formwiz.vercel.app/mockup.png'],
  },
};

export default function SignupPage() {
  return <SignUp />;
}
