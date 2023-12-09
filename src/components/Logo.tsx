'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  const { resolvedTheme } = useTheme();
  return (
    <Link href={'/'} className='font-bold hover:cursor-pointer'>
      <div className='relative h-12 w-12 sm:h-12 sm:w-48'>
        <Image
          src={resolvedTheme === 'light' ? '/logo-light.png' : '/logo-dark.png'}
          fill
          alt='logo'
          className='hidden sm:block'
        />
        <Image
          src={
            resolvedTheme === 'light'
              ? '/favicon-light.png'
              : '/favicon-dark.png'
          }
          fill
          alt='logo'
          className='sm:hidden'
        />
      </div>
    </Link>
  );
}

export default Logo;
