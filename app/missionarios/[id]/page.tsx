import type { Metadata } from 'next';

import { MissionaryDetailScreen } from '@/components/missionary-detail-screen';
import { saltCatalog } from '@/lib/catalog';

type MissionaryPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return saltCatalog.missionaries.map((missionary) => ({ id: missionary.id }));
}

export async function generateMetadata({ params }: MissionaryPageProps): Promise<Metadata> {
  const { id } = await params;
  const missionary = saltCatalog.missionaries.find((item) => item.id === id);

  return {
    title: missionary ? `${missionary.displayName} | Salt` : 'Mission not found | Salt',
    description: missionary?.shortBio ?? 'Mission not found.',
  };
}

export default async function MissionaryPage({ params }: MissionaryPageProps) {
  const { id } = await params;
  const missionary = saltCatalog.missionaries.find((item) => item.id === id);

  if (!missionary) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
        <div className="max-w-md rounded-3xl bg-card p-7 text-center">
          <h1 className="text-2xl font-semibold">Mission not found</h1>
          <a className="mt-6 inline-block text-primary" href="/">
            Back to catalog
          </a>
        </div>
      </main>
    );
  }

  const organization = saltCatalog.organizations.find(
    (item) => item.id === missionary.organizationID,
  );
  const campaigns = saltCatalog.campaigns.filter((campaign) =>
    missionary.activeCampaignIDs.includes(campaign.id),
  );

  return (
    <MissionaryDetailScreen
      missionary={missionary}
      organization={organization}
      campaigns={campaigns}
    />
  );
}
