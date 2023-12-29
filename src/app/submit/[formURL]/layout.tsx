import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { GetFormContentByURL } from '@/actions/form';

export async function generateMetadata({
  params: { formURL },
}: {
  params: {
    formURL: string;
  };
}): Promise<Metadata> {
  const form = await GetFormContentByURL(formURL);

  if (!form) {
    return {};
  }

  return {
    title: `FormWiz - ${form.name}`,
    description: `Submit ${form.name} form now, the form description is: ${form.description}`,
    openGraph: {
      title: `FormWiz - ${form.name}`,
      description: `Submit ${form.name} form now, the form description is: ${form.description}`,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/submit/${formURL}`,
    },
    twitter: {
      title: `FormWiz - ${form.name}`,
      description: `Submit ${form.name} form now, the form description is: ${form.description}`,
      card: 'summary',
    },
  };
}

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
