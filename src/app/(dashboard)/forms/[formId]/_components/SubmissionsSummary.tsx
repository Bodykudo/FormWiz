import { formatDistance } from 'date-fns';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import RowCell from './RowCell';

import type { ElementsType } from '@/types/elements';
import type { Column, Row } from './SubmissionsDetails';

interface SubmissionsSummaryProps {
  rows: Row[];
  columns: Column[];
}

export default function SubmissionsSummary({
  rows,
  columns,
}: SubmissionsSummaryProps) {
  return (
    <div className='rounded-md border mb-8'>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id} className='upper'>
                {column.label}
              </TableHead>
            ))}
            <TableHead className='text-muted-foreground text-right upper'>
              Submitted at
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <RowCell
                  key={column.id}
                  type={column.type as ElementsType}
                  value={row[column.id]}
                />
              ))}
              <TableCell className='text-muted-foreground text-right'>
                {formatDistance(row.submittedAt, new Date(), {
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
