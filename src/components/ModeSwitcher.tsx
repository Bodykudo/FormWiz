'use client';

import { useTheme } from 'next-themes';
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { cn } from '@/src/lib/utils';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export default function ModeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs defaultValue={theme}>
      <TabsList className='border'>
        <TabsTrigger value='light' onClick={() => setTheme('light')}>
          <SunIcon
            className={cn(
              'h-5 w-5 rotate-90 transition-all',
              theme === 'light' && 'rotate-0'
            )}
          />
        </TabsTrigger>
        <TabsTrigger value='dark' onClick={() => setTheme('dark')}>
          <MoonIcon
            className={cn(
              'h-5 w-5 rotate-90 transition-all',
              theme === 'dark' && 'rotate-0'
            )}
          />
        </TabsTrigger>
        <TabsTrigger value='system' onClick={() => setTheme('system')}>
          <DesktopIcon className='h-5 w-5' />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
