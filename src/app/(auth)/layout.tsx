import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <Navbar submitForm />
      <main className='flex w-full flex-grow h-full items-center justify-center'>
        {children}
      </main>
    </div>
  );
}
