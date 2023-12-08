import { UserButton } from '@clerk/nextjs';
import Logo from './Logo';
import ModeSwitcher from './ModeSwitcher';

interface NavbarProps {
  submitForm?: boolean;
}

export default function Navbar({ submitForm = false }: NavbarProps) {
  return (
    <nav className='flex justify-between items-center border-b border-border h-16 px-4 py-2'>
      <Logo />
      <div className='flex gap-4 items-center'>
        <ModeSwitcher />
        {!submitForm && <UserButton afterSignOutUrl='/sign-in' />}
      </div>
    </nav>
  );
}
