import { Metadata } from 'next';
import PreviewFormModal from '@/components/PreviewFormModal';
import PublishFormAlert from '@/components/PublishFormAlert';
import { GetFormById } from '@/actions/form';

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
    title: `FormWiz - Build ${form.name}`,
    openGraph: {
      title: `FormWiz - Build ${form.name}`,
    },
    twitter: {
      title: `FormWiz - Build ${form.name}`,
    },
  };
}

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex w-full flex-grow mx-auto'>
      <PreviewFormModal />
      <PublishFormAlert />
      {children}
    </div>
  );
}
