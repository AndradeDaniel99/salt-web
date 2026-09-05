import Image from 'next/image';
import { BadgeCheck, MapPin } from 'lucide-react';

import { AppBackButton } from '@/components/app-back-button';
import { assetPath, type Campaign, type Missionary, type Organization } from '@/lib/catalog';

export function MissionaryDetailScreen({
  missionary,
  organization,
  campaigns,
}: {
  missionary: Missionary;
  organization?: Organization;
  campaigns: Campaign[];
}) {
  return (
    <main className="min-h-screen bg-background pb-12 text-foreground">
      <div className="mx-auto w-full max-w-[960px] px-4 pt-5 sm:px-8 sm:pt-8">
        <AppBackButton
          fallbackHref={campaigns[0] ? `/campanhas/${campaigns[0].id}` : '/'}
          label="Voltar"
          iconOnly
        />

        <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-muted sm:aspect-[16/10]">
          <Image
            src={assetPath(missionary.portrait)}
            alt={missionary.portrait.alternativeText}
            fill
            priority
            sizes="(min-width: 960px) 896px, 100vw"
            className="object-cover"
          />
        </div>

        <section className="py-8 sm:py-10">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            {missionary.displayName}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-lg text-muted-foreground">
            <MapPin className="size-5 shrink-0" aria-hidden="true" />
            {missionary.location}, {missionary.country}
          </p>
          <p className="mt-2 text-base text-muted-foreground">
            Em campo desde {missionary.sentYear}
          </p>
        </section>

        {organization ? (
          <section>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Enviados por</h2>
            <article className="mt-5 rounded-[1.75rem] bg-card p-4 sm:p-6">
              <div className="grid h-36 place-items-center overflow-hidden rounded-[1.25rem] bg-[#e7f2ed] p-6">
                <Image
                  src={assetPath(organization.logo)}
                  alt={organization.logo.alternativeText}
                  width={240}
                  height={96}
                  className="h-24 w-full object-contain"
                />
              </div>
              <h3 className="mt-6 text-2xl font-semibold">{organization.name}</h3>
              <p className="mt-4 flex items-center gap-2 font-medium text-primary">
                <BadgeCheck className="size-5" aria-hidden="true" />
                {organization.verification === 'verifiedDemo'
                  ? 'Organização verificada'
                  : 'Informações fornecidas'}
              </p>
              <p className="mt-4 flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-5" aria-hidden="true" />
                {organization.location}
              </p>
            </article>
          </section>
        ) : null}

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Nossa história</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
            {missionary.story}
          </p>
        </section>

        <section className="mt-10 rounded-[1.75rem] bg-card p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Missão atual</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {missionary.currentMission}
          </p>
        </section>

        {campaigns.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Campanhas ativas
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {campaigns.map((campaign) => (
                <a
                  key={campaign.id}
                  href={`/campanhas/${campaign.id}`}
                  className="rounded-2xl bg-card p-5 font-semibold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
                >
                  {campaign.title}
                  <span className="mt-2 block text-sm font-normal text-muted-foreground">
                    {campaign.shortDescription}
                  </span>
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
