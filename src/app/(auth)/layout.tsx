import { ReactNode } from 'react';
import Logo from '@/src/components/Logo';
import ModeSwitcher from '@/src/components/ModeSwitcher';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2'>
        <Logo />
        <div className='flex gap-4 items-center'>
          <ModeSwitcher />
        </div>
      </nav>
      <main className='flex w-full flex-grow h-full items-center justify-center'>
        {children}
      </main>
    </div>
  );
}
