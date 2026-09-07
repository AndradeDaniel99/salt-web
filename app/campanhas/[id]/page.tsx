import type { Metadata } from 'next';

import { CampaignDetailScreen } from '@/components/campaign-detail-screen';
import { saltCatalog } from '@/lib/catalog';

type CampaignPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return saltCatalog.campaigns.map((campaign) => ({ id: campaign.id }));
}

export async function generateMetadata({ params }: CampaignPageProps): Promise<Metadata> {
  const { id } = await params;
  const campaign = saltCatalog.campaigns.find((item) => item.id === id);

  return campaign
    ? {
        title: `${campaign.title} | Salt`,
        description: campaign.shortDescription,
      }
    : { title: 'Campaign not found | Salt' };
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { id } = await params;
  const campaign = saltCatalog.campaigns.find((item) => item.id === id);

  if (!campaign) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
        <div className="max-w-md rounded-lg border bg-card p-7 text-center shadow-sm">
          <h1 className="text-2xl font-semibold">Campaign not found</h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            This campaign is not available in the demo catalog.
          </p>
          <a
            href="/"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Back to campaigns
          </a>
        </div>
      </main>
    );
  }

  const organization = saltCatalog.organizations.find(
    (item) => item.id === campaign.organizationID,
  );
  const missionary = saltCatalog.missionaries.find(
    (item) => item.id === campaign.missionaryID,
  );
  const updates = saltCatalog.updates.filter((item) => item.campaignID === campaign.id);

  return (
    <CampaignDetailScreen
      campaign={campaign}
      organization={organization}
      missionary={missionary}
      updates={updates}
    />
  );
}
