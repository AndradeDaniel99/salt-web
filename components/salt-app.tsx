'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  assetPath,
  fundingCurrentLabel,
  fundingGoalLabel,
  fundingProgress,
  saltCatalog,
  type Campaign,
  type Organization,
} from '@/lib/catalog';

const suggestedAmounts = [50, 100, 250, 500];

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
  const [supportedCampaigns, setSupportedCampaigns] = useState<string[]>([]);
  const [selectedAmount, setSelectedAmount] = useState(100);

  const selectedCampaign = saltCatalog.campaigns[0];

  const selectedOrganization = saltCatalog.organizations.find(
    (organization) => organization.id === selectedCampaign.organizationID,
  );
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
  const hasActiveSupport = supportedCampaigns.includes(selectedCampaign.id);

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
              setSelectedAmount(amount);
              setSupportedCampaigns((current) =>
                current.includes(campaignId) ? current : [...current, campaignId],
              );
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

  function supportSelectedCampaign() {
    setSupportedCampaigns((current) =>
      current.includes(selectedCampaign.id)
        ? current
        : [...current, selectedCampaign.id],
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto min-h-screen w-full max-w-[1120px]">
        <section className="px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
          <header className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center gap-3" aria-label="Salt Web">
              <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Salt
                </span>
                <span className="block text-sm text-muted-foreground">
                  Protótipo web
                </span>
              </span>
            </Link>
            <div className="relative w-full sm:max-w-sm">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-11 rounded-lg bg-card pl-9 pr-9 text-base shadow-sm"
                placeholder="Buscar campanhas, famílias ou organizações"
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

          <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
            <article className="overflow-hidden rounded-lg border bg-card shadow-sm">
              <div className="relative min-h-[360px]">
                <Image
                  src={assetPath(selectedCampaign.cover)}
                  alt={selectedCampaign.cover.alternativeText}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(14_49_48/0.88),rgb(14_49_48/0.42),rgb(14_49_48/0.08))]" />
                <div className="relative flex min-h-[360px] max-w-2xl flex-col justify-end p-5 text-white sm:p-8">
                  <Badge className="mb-4 w-fit border-white/20 bg-white/15 text-white">
                    Demonstração sem cobrança real
                  </Badge>
                  <h1 className="max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
                    {selectedCampaign.title}
                  </h1>
                  <p className="mt-4 max-w-lg text-lg leading-7 text-white/84">
                    {selectedCampaign.shortDescription}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/86">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4" aria-hidden="true" />
                      {selectedCampaign.location}
                    </span>
                    {selectedOrganization ? (
                      <span className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="size-4" aria-hidden="true" />
                        {selectedOrganization.name}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>

            <aside className="rounded-lg border bg-card p-5 shadow-sm">
              <CampaignFunding campaign={selectedCampaign} />
              <div className="mt-6 grid grid-cols-2 gap-2">
                {suggestedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setSelectedAmount(amount)}
                    className={`rounded-lg border px-3 py-3 text-left text-sm transition ${
                      selectedAmount === amount
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background hover:border-primary/60'
                    }`}
                  >
                    <span className="block text-xs opacity-75">Valor</span>
                    <span className="text-lg font-semibold">R$ {amount}</span>
                  </button>
                ))}
              </div>
              <Button
                size="lg"
                className="mt-4 h-11 w-full bg-primary text-base hover:bg-primary/90"
                onClick={supportSelectedCampaign}
              >
                <Heart className="size-4 fill-current" aria-hidden="true" />
                {selectedCampaign.funding.type === 'monthly'
                  ? 'Apoiar mensalmente'
                  : 'Apoiar esta campanha'}
              </Button>
              {hasActiveSupport ? (
                <p className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                  Apoio simulado registrado neste navegador.
                </p>
              ) : (
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Esta versão repete a regra do app iOS: nenhum pagamento é
                  processado e nenhum dado pessoal é enviado.
                </p>
              )}
            </aside>
          </div>

          <CatalogSection
            title="Campanhas pontuais"
            subtitle="Metas com prazo, prestação de contas e atualizações de campo."
          >
            <CampaignGrid
              campaigns={featuredOneTime}
              supportedCampaigns={supportedCampaigns}
            />
          </CatalogSection>

          <CatalogSection
            title="Apoio mensal"
            subtitle="Sustento recorrente para presença, cuidado e continuidade."
          >
            <CampaignGrid
              campaigns={monthlyCampaigns}
              supportedCampaigns={supportedCampaigns}
            />
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
    <section className="mb-9">
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? <p className="text-base text-muted-foreground">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function CampaignGrid({
  campaigns,
  supportedCampaigns,
}: {
  campaigns: Campaign[];
  supportedCampaigns: string[];
}) {
  if (campaigns.length === 0) {
    return (
      <div className="rounded-lg border border-dashed bg-card p-6 text-sm text-muted-foreground">
        Nenhum resultado encontrado para esta busca.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
      {campaigns.map((campaign) => {
        const organization = saltCatalog.organizations.find(
          (item) => item.id === campaign.organizationID,
        );
        const hasSupport = supportedCampaigns.includes(campaign.id);

        return (
          <Link
            key={campaign.id}
            href={`/campanhas/${campaign.id}`}
            aria-label={`Ver detalhes de ${campaign.title}`}
            className="group overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <div className="aspect-[16/9] overflow-hidden bg-muted">
              <Image
                src={assetPath(campaign.cover)}
                alt={campaign.cover.alternativeText}
                width={640}
                height={360}
                sizes="(min-width: 1536px) 28vw, (min-width: 768px) 45vw, 100vw"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant={campaign.funding.type === 'monthly' ? 'secondary' : 'outline'}>
                  {campaign.funding.type === 'monthly' ? 'Mensal' : 'Pontual'}
                </Badge>
                {hasSupport ? (
                  <Badge className="bg-primary/10 text-primary">Apoio ativo</Badge>
                ) : null}
              </div>
              <h3 className="text-lg font-semibold leading-snug">{campaign.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {campaign.shortDescription}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3 text-sm text-muted-foreground">
                <span>{organization?.name ?? 'Organização parceira'}</span>
                <span className="inline-flex shrink-0 items-center gap-1 font-medium text-primary">
                  Ver campanha
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function CampaignFunding({ campaign }: { campaign: Campaign }) {
  const progress = fundingProgress(campaign.funding);

  return (
    <div>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {fundingCurrentLabel(campaign.funding)}
          </p>
          <p className="mt-1 text-2xl font-semibold">{progress}%</p>
        </div>
        <Badge variant="secondary">{campaign.funding.type === 'monthly' ? 'Recorrente' : 'Meta'}</Badge>
      </div>
      <Progress value={progress} className="[&_[data-slot=progress-track]]:h-2" />
      <p className="mt-3 text-sm text-muted-foreground">
        {fundingGoalLabel(campaign.funding)}
        {campaign.funding.type === 'monthly'
          ? ` com ${campaign.funding.supportersCount} apoiadores.`
          : '.'}
      </p>
    </div>
  );
}

function OrganizationCard({ organization }: { organization: Organization }) {
  return (
    <article className="rounded-lg border bg-card p-4 shadow-sm">
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
