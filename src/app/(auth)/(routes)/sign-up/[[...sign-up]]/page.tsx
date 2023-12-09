import { Metadata } from 'next';
import { SignUp } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'FormWiz - Sign Up',
  openGraph: {
    title: 'FormWiz - Sign Up',
  },
  twitter: {
    title: 'FormWiz - Sign Up',
  },
};

export default function SignupPage() {
  return <SignUp />;
}
