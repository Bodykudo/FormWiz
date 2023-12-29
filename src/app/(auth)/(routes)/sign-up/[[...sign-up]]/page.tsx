import { Metadata } from 'next';
import { SignUp } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'FormWiz - Sign Up',
  openGraph: {
    title: 'FormWiz - Sign Up',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/mockup.png`],
  },
  twitter: {
    title: 'FormWiz - Sign Up',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/mockup.png`],
  },
};

export default function SignupPage() {
  return <SignUp />;
}
