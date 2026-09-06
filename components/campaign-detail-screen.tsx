'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AppBackButton } from '@/components/app-back-button';
import { cn } from '@/lib/utils';
import {
  assetPath,
  fundingCurrentLabel,
  fundingGoalLabel,
  fundingProgress,
  type Campaign,
  type CampaignUpdate,
  type Missionary,
  type Organization,
} from '@/lib/catalog';

export function CampaignDetailScreen({
  campaign,
  organization,
  missionary,
  updates,
}: {
  campaign: Campaign;
  organization?: Organization;
  missionary?: Missionary;
  updates: CampaignUpdate[];
}) {
  const [hasActiveSupport, setHasActiveSupport] = useState(false);
  const progress = fundingProgress(campaign.funding);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const supportedCampaigns = JSON.parse(
          window.localStorage.getItem('salt-supported-campaigns') ?? '[]',
        ) as string[];
        setHasActiveSupport(supportedCampaigns.includes(campaign.id));
      } catch {
        setHasActiveSupport(false);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [campaign.id]);

  return (
    <main className="min-h-screen bg-background pb-8 text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/94 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <AppBackButton fallbackHref="/" label="Voltar" />
          <a href="/" className="flex items-center gap-2" aria-label="Salt Web">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <span className="hidden text-sm font-semibold uppercase tracking-[0.16em] text-primary sm:block">
              Salt
            </span>
          </a>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1120px] px-4 pt-4 sm:px-6 sm:pt-7 lg:px-10">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-sm sm:aspect-[16/8] lg:aspect-[16/7]">
          <Image
            src={assetPath(campaign.cover)}
            alt={campaign.cover.alternativeText}
            fill
            priority
            sizes="(min-width: 1120px) 1040px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgb(11_39_38/0.7)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-2 p-4 text-white sm:p-6">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium">
              <MapPin className="size-4" aria-hidden="true" />
              {campaign.location}
            </span>
            {organization ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                <ShieldCheck className="size-4" aria-hidden="true" />
                {organization.name}
              </span>
            ) : null}
          </div>
        </div>

        <section className="py-6 sm:py-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant={campaign.funding.type === 'monthly' ? 'secondary' : 'outline'}>
              {campaign.funding.type === 'monthly' ? 'Apoio mensal' : 'Campanha pontual'}
            </Badge>
            <Badge className="border-primary/15 bg-primary/10 text-primary">
              Demonstração
            </Badge>
          </div>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {campaign.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-7 text-muted-foreground">
            {campaign.shortDescription}
          </p>
        </section>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <aside className="rounded-lg border bg-card p-5 shadow-sm lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {fundingCurrentLabel(campaign.funding)}
                </p>
                <p className="mt-1 text-3xl font-semibold">{progress}%</p>
              </div>
              <Badge variant="secondary">
                {campaign.funding.type === 'monthly' ? 'Recorrente' : 'Meta'}
              </Badge>
            </div>
            <Progress value={progress} className="[&_[data-slot=progress-track]]:h-2" />
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {fundingGoalLabel(campaign.funding)}
              {campaign.funding.type === 'monthly'
                ? ` com ${campaign.funding.supportersCount} apoiadores.`
                : '.'}
            </p>

            <a
              href={`/campanhas/${campaign.id}/apoio`}
              className={cn(
                buttonVariants({ size: 'lg' }),
                'mt-6 h-14 w-full rounded-2xl bg-primary px-5 text-base text-primary-foreground hover:bg-primary/90',
              )}
            >
              <Heart className="size-4 fill-current" aria-hidden="true" />
              {campaign.funding.type === 'monthly' ? 'Apoiar mensalmente' : 'Apoiar campanha'}
            </a>
            {hasActiveSupport ? (
              <p className="mt-4 flex items-start gap-2 text-sm font-medium text-primary">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                Você já apoia esta campanha neste dispositivo.
              </p>
            ) : (
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Simulação sem cobrança ou envio de dados pessoais.
              </p>
            )}
          </aside>

          <div className="space-y-7 lg:col-start-1 lg:row-start-1">
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Sobre a campanha
              </p>
              <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {campaign.story}
              </p>
            </section>

            {missionary ? (
              <a
                href={`/missionarios/${missionary.id}`}
                aria-label={`Ver perfil de ${missionary.displayName}`}
                className="group block rounded-3xl border bg-card p-5 shadow-sm transition hover:border-primary/45 hover:bg-muted/55 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={assetPath(missionary.portrait)}
                    alt={missionary.portrait.alternativeText}
                    width={72}
                    height={72}
                    className="size-18 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      Em campo · Ver perfil
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">{missionary.displayName}</h2>
                    <p className="text-sm text-muted-foreground">
                      {missionary.location}, {missionary.country}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  {missionary.currentMission}
                </p>
              </a>
            ) : null}

            {organization ? (
              <section className="rounded-lg border bg-card p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <Image
                    src={assetPath(organization.logo)}
                    alt={organization.logo.alternativeText}
                    width={48}
                    height={48}
                    className="size-12 rounded-lg border bg-background p-2"
                  />
                  <div>
                    <h2 className="font-semibold">{organization.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {organization.verification === 'verifiedDemo'
                        ? 'Verificada para demonstração'
                        : 'Informações fornecidas'}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  {organization.summary}
                </p>
              </section>
            ) : null}

            <section>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-tight">Atualizações</h2>
                <a
                  href={`/campanhas/${campaign.id}/atualizacoes`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition hover:text-primary/80"
                >
                  Ver todas
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
              <div className="mt-4 space-y-3">
                {updates.map((update) => (
                  <a
                    key={update.id}
                    href={`/campanhas/${campaign.id}/atualizacoes#${update.id}`}
                    className="group block rounded-lg border bg-card p-5 shadow-sm transition hover:border-primary/45 hover:bg-muted/55 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
                  >
                    <p className="text-xs font-medium text-muted-foreground">
                      {new Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      }).format(new Date(update.publishedAt))}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold">{update.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                      {update.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Ler atualização
                      <ArrowRight
                        className="size-4 transition group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
