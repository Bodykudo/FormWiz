import { GetFormById } from '@/src/actions/form';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { formId },
}: {
  params: {
    formId: string;
  };
}): Promise<Metadata> {
  const form = await GetFormById(Number(formId));

  if (!form) {
    return {};
  }

  return {
    title: `FormWiz - ${form.name} Details`,
    openGraph: {
      title: `FormWiz - ${form.name} Details`,
    },
    twitter: {
      title: `FormWiz - ${form.name} Details`,
    },
  };
}

export default function FormDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col w-full flex-grow mx-auto'>{children}</div>
  );
}
