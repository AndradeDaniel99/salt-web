'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  BadgeCheck,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  assetPath,
  fundingProgress,
  saltCatalog,
  type Campaign,
  type Organization,
} from '@/lib/catalog';

declare global {
  interface Document {
    modelContext?: {
      registerTool(
        tool: {
          name: string;
          title?: string;
          description: string;
          inputSchema: object;
          annotations?: {
            readOnlyHint?: boolean;
            untrustedContentHint?: boolean;
          };
          execute(input: unknown): unknown;
        },
        options?: { signal?: AbortSignal },
      ): void | Promise<void>;
    };
  }
}

export function SaltApp() {
  const [query, setQuery] = useState('');
  const searchResults = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');

    if (!normalized) {
      return {
        campaigns: saltCatalog.campaigns,
        organizations: saltCatalog.organizations,
      };
    }

    return {
      campaigns: saltCatalog.campaigns.filter((campaign) => {
        const organization = saltCatalog.organizations.find(
          (item) => item.id === campaign.organizationID,
        );
        const missionary = saltCatalog.missionaries.find(
          (item) => item.id === campaign.missionaryID,
        );

        return [
          campaign.title,
          campaign.shortDescription,
          campaign.location,
          organization?.name,
          missionary?.displayName,
        ]
          .filter(Boolean)
          .join(' ')
          .toLocaleLowerCase('pt-BR')
          .includes(normalized);
      }),
      organizations: saltCatalog.organizations.filter((organization) =>
        [organization.name, organization.summary, organization.location]
          .join(' ')
          .toLocaleLowerCase('pt-BR')
          .includes(normalized),
      ),
    };
  }, [query]);

  const featuredOneTime = searchResults.campaigns.filter(
    (campaign) => campaign.isFeatured && campaign.funding.type === 'oneTime',
  );
  const monthlyCampaigns = searchResults.campaigns.filter(
    (campaign) => campaign.funding.type === 'monthly',
  );

  useEffect(() => {
    const context = document.modelContext;

    if (!context?.registerTool) {
      return;
    }

    const lifecycle = new AbortController();
    const campaignIds = saltCatalog.campaigns.map((campaign) => campaign.id);

    function parseCampaignId(input: unknown) {
      if (
        !input ||
        typeof input !== 'object' ||
        !('campaignId' in input) ||
        typeof input.campaignId !== 'string' ||
        !campaignIds.includes(input.campaignId)
      ) {
        throw new Error('campaignId must be one of the demo catalog campaign IDs.');
      }

      return input.campaignId;
    }

    function parseAmount(input: unknown) {
      if (
        !input ||
        typeof input !== 'object' ||
        !('amount' in input) ||
        typeof input.amount !== 'number' ||
        !Number.isFinite(input.amount) ||
        input.amount <= 0
      ) {
        throw new Error('amount must be a positive number.');
      }

      return input.amount;
    }

    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: 'select_campaign',
            title: 'Select campaign',
            description: 'Opens the dedicated page for a Salt demo campaign.',
            inputSchema: {
              type: 'object',
              properties: {
                campaignId: { type: 'string', enum: campaignIds },
              },
              required: ['campaignId'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            execute(input) {
              const campaignId = parseCampaignId(input);
              window.location.assign(`/campanhas/${campaignId}`);
              return { campaignId, status: 'opening_campaign' };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(console.error);

      void Promise.resolve(
        context.registerTool(
          {
            name: 'complete_simulated_support',
            title: 'Complete simulated support',
            description:
              'Registers demo support for a Salt campaign in the visible prototype without processing payment.',
            inputSchema: {
              type: 'object',
              properties: {
                campaignId: { type: 'string', enum: campaignIds },
                amount: { type: 'number', exclusiveMinimum: 0 },
              },
              required: ['campaignId', 'amount'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            execute(input) {
              const campaignId = parseCampaignId(input);
              const amount = parseAmount(input);
              let supportedCampaigns: string[] = [];

              try {
                supportedCampaigns = JSON.parse(
                  window.localStorage.getItem('salt-supported-campaigns') ?? '[]',
                ) as string[];
              } catch {
                supportedCampaigns = [];
              }

              if (!supportedCampaigns.includes(campaignId)) {
                window.localStorage.setItem(
                  'salt-supported-campaigns',
                  JSON.stringify([...supportedCampaigns, campaignId]),
                );
              }

              return { campaignId, amount, status: 'simulated_support_registered' };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(console.error);
    } catch (error) {
      console.error(error);
    }

    return () => lifecycle.abort();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto min-h-screen w-full max-w-[1120px]">
        <section className="px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <header className="mb-8">
            <div className="flex items-center justify-between gap-4">
              <a href="/" className="flex items-center gap-3" aria-label="Salt Web">
                <span className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_8px_30px_rgb(103_230_157/0.14)]">
                  <Sparkles className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Salt
                </span>
              </a>
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Descobrir</h1>
              <span className="w-[85px] text-right text-xs text-muted-foreground">Demonstração</span>
            </div>
            <div className="relative mt-6 w-full">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-14 rounded-2xl border-white/10 bg-card pl-12 pr-11 text-base shadow-none placeholder:text-muted-foreground/80 focus-visible:border-primary/60"
                placeholder="Campanhas, pessoas ou organizações"
                aria-label="Buscar no catálogo"
              />
              {query ? (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                  onClick={() => setQuery('')}
                  aria-label="Limpar busca"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </header>

          <CatalogSection
            title="Campanhas pontuais"
            subtitle="Metas com prazo, prestação de contas e atualizações de campo."
          >
            <CampaignGrid campaigns={featuredOneTime} />
          </CatalogSection>

          <CatalogSection
            title="Apoio mensal"
            subtitle="Sustento recorrente para presença, cuidado e continuidade."
          >
            <CampaignGrid campaigns={monthlyCampaigns} />
          </CatalogSection>

          <CatalogSection title="Organizações">
            <div className="grid gap-3 md:grid-cols-3">
              {searchResults.organizations.map((organization) => (
                <OrganizationCard key={organization.id} organization={organization} />
              ))}
            </div>
          </CatalogSection>
        </section>

      </div>
    </main>
  );
}

function CatalogSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="mb-5 flex flex-col gap-1.5">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {subtitle ? <p className="text-base text-muted-foreground">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function CampaignGrid({ campaigns }: { campaigns: Campaign[] }) {
  if (campaigns.length === 0) {
    return (
      <div className="rounded-lg border border-dashed bg-card p-6 text-sm text-muted-foreground">
        Nenhum resultado encontrado para esta busca.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {campaigns.map((campaign) => {
        const organization = saltCatalog.organizations.find(
          (item) => item.id === campaign.organizationID,
        );

        return (
          <a
            key={campaign.id}
            href={`/campanhas/${campaign.id}`}
            aria-label={`Ver detalhes de ${campaign.title}`}
            className="group block rounded-[1.25rem] text-left transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
          >
            <div className="aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-muted">
              <Image
                src={assetPath(campaign.cover)}
                alt={campaign.cover.alternativeText}
                width={640}
                height={360}
                sizes="(min-width: 1536px) 28vw, (min-width: 768px) 45vw, 100vw"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
              />
            </div>
            <div className="pt-5">
              <h3 className="text-2xl font-semibold leading-tight tracking-tight">
                {campaign.title}
              </h3>
              <p className="mt-3 text-base text-muted-foreground">
                {fundingProgress(campaign.funding)}% da meta alcançada
              </p>
              <Progress
                value={fundingProgress(campaign.funding)}
                aria-label={`${fundingProgress(campaign.funding)}% da meta alcançada`}
                className="mt-3 [&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:bg-white/15"
              />
              <div className="mt-4 flex min-w-0 items-center gap-2 text-sm text-muted-foreground sm:text-base">
                {organization?.verification === 'verifiedDemo' ? (
                  <>
                    <BadgeCheck
                      className="size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Organização verificada:</span>
                  </>
                ) : null}
                <span className="truncate">
                  {organization?.name ?? 'Organização parceira'}
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}

function OrganizationCard({ organization }: { organization: Organization }) {
  return (
    <article className="rounded-3xl bg-card p-5 shadow-[0_18px_48px_rgb(0_0_0/0.2)]">
      <div className="mb-4 flex items-center gap-3">
        <Image
          src={assetPath(organization.logo)}
          alt={organization.logo.alternativeText}
          width={48}
          height={48}
          className="size-12 rounded-lg border bg-background p-2"
        />
        <div>
          <h3 className="font-semibold">{organization.name}</h3>
          <p className="text-sm text-muted-foreground">{organization.location}</p>
        </div>
      </div>
      <p className="text-sm leading-6 text-muted-foreground">{organization.summary}</p>
    </article>
  );
}
