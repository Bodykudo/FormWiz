import { UserButton } from '@clerk/nextjs';
import ModeSwitcher from './ModeSwitcher';
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center border-b border-border h-16 px-4 py-2'>
      <Logo />
      <div className='flex gap-4 items-center'>
        <ModeSwitcher />
        <UserButton afterSignOutUrl='/sign-in' />
      </div>
    </nav>
  );
}
