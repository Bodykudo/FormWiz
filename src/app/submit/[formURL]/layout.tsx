import Navbar from '@/src/components/Navbar';

export default function SubmitFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen'>
      <Navbar submitForm />
      <main className='flex w-full flex-grow'>{children}</main>
    </div>
  );
}
