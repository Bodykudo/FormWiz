import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import AuthProvider from '../components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FormWiz - Create and Manage Forms',
  description:
    'FormWiz: Effortlessly create and manage forms with our intuitive drag-and-drop tools. Design the forms you need and seamlessly publish them for people to submit. Simplify form creation with FormWiz!',
  generator: 'Next.js',
  manifest: '/manifest.json',
  authors: {
    name: 'Abdallah Magdy',
    url: 'https://www.linkedin.com/in/abdallahmagdy',
  },
  keywords: [
    'Form Creation',
    'Drag and Drop Forms',
    'Form Builder',
    'Web Forms',
    'Form Submission',
  ],
  openGraph: {
    title: 'FormWiz - Create and Manage Forms',
    type: 'website',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/mockup.png`],
    url: process.env.NEXT_PUBLIC_APP_URL,
    description:
      'FormWiz: Effortlessly create and manage forms with our intuitive drag-and-drop tools. Design the forms you need and seamlessly publish them for people to submit. Simplify form creation with FormWiz!',
  },
  twitter: {
    title: 'FormWiz - Create and Manage Forms',
    description:
      'FormWiz: Effortlessly create and manage forms with our intuitive drag-and-drop tools. Design the forms you need and seamlessly publish them for people to submit. Simplify form creation with FormWiz!',
    card: 'summary_large_image',
    creator: 'a_m_s666',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/mockup.png`],
  },
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: 'icons/icon-128x128.png' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <AuthProvider>
            <NextTopLoader />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
