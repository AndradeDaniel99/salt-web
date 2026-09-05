import type { Metadata } from 'next';
import Link from 'next/link';

import { SupportFlow } from '@/components/support-flow';
import { saltCatalog } from '@/lib/catalog';

type SupportPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return saltCatalog.campaigns.map((campaign) => ({ id: campaign.id }));
}

export async function generateMetadata({ params }: SupportPageProps): Promise<Metadata> {
  const { id } = await params;
  const campaign = saltCatalog.campaigns.find((item) => item.id === id);

  return {
    title: campaign ? `Apoiar ${campaign.title} | Salt` : 'Campanha não encontrada | Salt',
    description: campaign
      ? `Confirme seu apoio simulado para ${campaign.title}.`
      : 'Campanha não encontrada.',
  };
}

export default async function SupportPage({ params }: SupportPageProps) {
  const { id } = await params;
  const campaign = saltCatalog.campaigns.find((item) => item.id === id);

  if (!campaign) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
        <div className="max-w-md rounded-3xl bg-card p-7 text-center">
          <h1 className="text-2xl font-semibold">Campanha não encontrada</h1>
          <Link className="mt-6 inline-block text-primary" href="/">
            Voltar ao catálogo
          </Link>
        </div>
      </main>
    );
  }

  const organization = saltCatalog.organizations.find(
    (item) => item.id === campaign.organizationID,
  );

  return <SupportFlow campaign={campaign} organization={organization} />;
}
