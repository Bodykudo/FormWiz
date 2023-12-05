import PreviewFormModal from '@/src/components/PreviewFormModal';
import PublishFormAlert from '@/src/components/PublishFormAlert';

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
