import Navbar from '@/components/Navbar';
import CreateFormModal from '@/components/CreateFormModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <Navbar />
      <CreateFormModal />
      <main className='flex w-full flex-grow'>{children}</main>
    </div>
  );
}
