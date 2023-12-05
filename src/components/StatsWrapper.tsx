import { GetFormStats } from '@/src/actions/form';
import StatsCards from './StatsCards';

export default async function StatsWrapper() {
  const stats = await GetFormStats();

  return <StatsCards data={stats} isLoading={false} />;
}
