import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubmissionsSummary from './SubmissionsSummary';
import SubmissionsIndividual from './SubmissionsIndividual';
import type { Column, Row } from './SubmissionsDetails';

interface SubmissionTabsProps {
  rows: Row[];
  columns: Column[];
}

export default function SubmissionTabs({ rows, columns }: SubmissionTabsProps) {
  return (
    <Tabs defaultValue='summary' className='w-full'>
      <div className='flex flex-col sm:flex-row justify-between items-center'>
        <h1 className='text-3xl font-bold my-4'>Submissions</h1>
        <TabsList>
          <TabsTrigger value='summary'>Summary</TabsTrigger>
          <TabsTrigger value='individual'>Individual</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value='summary'>
        <SubmissionsSummary rows={rows} columns={columns} />
      </TabsContent>
      <TabsContent value='individual'>
        <SubmissionsIndividual fields={columns} submissions={rows} />
      </TabsContent>
    </Tabs>
  );
}
