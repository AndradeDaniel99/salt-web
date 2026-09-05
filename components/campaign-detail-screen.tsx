'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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

const suggestedAmounts = [50, 100, 250, 500];

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
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [hasActiveSupport, setHasActiveSupport] = useState(false);
  const progress = fundingProgress(campaign.funding);

  return (
    <main className="min-h-screen bg-background pb-8 text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/94 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg pr-3 text-sm font-medium transition hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
            Voltar às campanhas
          </Link>
          <Link href="/" className="flex items-center gap-2" aria-label="Salt Web">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <span className="hidden text-sm font-semibold uppercase tracking-[0.16em] text-primary sm:block">
              Salt
            </span>
          </Link>
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

            <div className="mt-6 grid grid-cols-2 gap-2">
              {suggestedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelectedAmount(amount)}
                  aria-pressed={selectedAmount === amount}
                  className={`min-h-14 rounded-lg border px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
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
              className="mt-4 h-12 w-full bg-primary text-base hover:bg-primary/90"
              onClick={() => setHasActiveSupport(true)}
            >
              <Heart className="size-4 fill-current" aria-hidden="true" />
              {campaign.funding.type === 'monthly'
                ? 'Apoiar mensalmente'
                : 'Apoiar esta campanha'}
            </Button>
            <div aria-live="polite">
              {hasActiveSupport ? (
                <p className="mt-4 flex items-start gap-2 text-sm font-medium text-primary">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  Apoio simulado de R$ {selectedAmount} registrado.
                </p>
              ) : (
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Nenhum pagamento é processado e nenhum dado pessoal é enviado.
                </p>
              )}
            </div>
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
              <section className="rounded-lg border bg-card p-5 shadow-sm">
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
                      Em campo
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
              </section>
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
              <h2 className="text-2xl font-semibold tracking-tight">Atualizações</h2>
              <div className="mt-4 space-y-3">
                {updates.map((update) => (
                  <article key={update.id} className="rounded-lg border bg-card p-5 shadow-sm">
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
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
