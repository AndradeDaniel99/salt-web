'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  BadgeCheck,
  CalendarDays,
  Heart,
  MapPin,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

import { AppBackButton } from '@/components/app-back-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  assetPath,
  type Campaign,
  type CampaignUpdate,
  type Missionary,
  type Organization,
} from '@/lib/catalog';
import { getUpdatePostDetails } from '@/lib/update-posts';
import { cn } from '@/lib/utils';

export function CampaignUpdatesScreen({
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
  const [likedUpdates, setLikedUpdates] = useState<string[]>([]);
  const sortedUpdates = [...updates].sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime(),
  );

  function toggleLike(updateId: string) {
    setLikedUpdates((current) =>
      current.includes(updateId)
        ? current.filter((id) => id !== updateId)
        : [...current, updateId],
    );
  }

  return (
    <main className="min-h-screen bg-background pb-12 text-foreground">
      <header className="sticky top-0 z-20 border-b border-white/8 bg-background/94 backdrop-blur-md">
        <div className="mx-auto grid h-16 w-full max-w-3xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8">
          <AppBackButton
            fallbackHref={`/campanhas/${campaign.id}`}
            label="Back"
            className="justify-self-start"
          />
          <p className="text-sm font-semibold">Updates</p>
          <a
            href="/"
            className="grid size-9 place-items-center justify-self-end rounded-lg bg-primary text-primary-foreground"
            aria-label="Go to the home page"
          >
            <Sparkles className="size-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-4 pt-7 sm:px-8 sm:pt-10">
        <section className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 text-sm text-primary">
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
            Mission journal
          </div>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {campaign.title}
          </h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">
            Follow the decisions, results, and next steps shared by the field team.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-primary" aria-hidden="true" />
              {campaign.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-primary" aria-hidden="true" />
              {sortedUpdates.length}{' '}
              {sortedUpdates.length === 1 ? 'post' : 'posts'}
            </span>
          </div>
          <Badge className="mt-5 border-primary/15 bg-primary/10 text-primary">
            Demo content
          </Badge>
        </section>

        <div className="mt-8 space-y-10">
          {sortedUpdates.map((update) => {
            const details = getUpdatePostDetails(update.id);
            const isLiked = likedUpdates.includes(update.id);
            const publishedDate = new Intl.DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }).format(new Date(update.publishedAt));

            return (
              <article
                id={update.id}
                key={update.id}
                className="scroll-mt-24 border-b border-white/10 pb-10 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  {missionary ? (
                    <Image
                      src={assetPath(missionary.portrait)}
                      alt={missionary.portrait.alternativeText}
                      width={48}
                      height={48}
                      className="size-12 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/12 text-sm font-semibold text-primary">
                      {organization?.name.slice(0, 2).toLocaleUpperCase('en') ?? 'SL'}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-sm font-semibold sm:text-base">
                        {missionary?.displayName ?? organization?.name ?? 'Field team'}
                      </p>
                      {organization?.verification === 'verifiedDemo' ? (
                        <BadgeCheck className="size-4 shrink-0 text-primary" aria-label="Verified profile" />
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {organization?.name ?? 'Local partner'} · {publishedDate} at{' '}
                      {details.publishedTime}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-primary/35 text-primary">
                    {details.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{campaign.location}</span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {update.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {update.body}
                </p>
                <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {details.context}
                </p>

                {update.media[0] ? (
                  <figure className="mt-6">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-muted">
                      <Image
                        src={assetPath(update.media[0])}
                        alt={update.media[0].alternativeText}
                        fill
                        sizes="(min-width: 768px) 704px, 100vw"
                        className="object-cover"
                      />
                    </div>
                    {details.imageCaption ? (
                      <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
                        {details.imageCaption}
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}

                <dl className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-card py-4">
                  {details.metrics.map((metric) => (
                    <div key={metric.label} className="min-w-0 px-3 text-center sm:px-5">
                      <dd className="text-lg font-semibold text-primary sm:text-xl">
                        {metric.value}
                      </dd>
                      <dt className="mt-1 text-xs leading-4 text-muted-foreground sm:text-sm sm:leading-5">
                        {metric.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 rounded-2xl border border-primary/15 bg-primary/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    Next step
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {details.nextStep}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-pressed={isLiked}
                      onClick={() => toggleLike(update.id)}
                      className={cn(
                        'rounded-xl px-2 text-muted-foreground hover:text-primary',
                        isLiked && 'text-primary',
                      )}
                    >
                      <Heart
                        className={cn('size-4', isLiked && 'fill-current')}
                        aria-hidden="true"
                      />
                      {details.reactions + (isLiked ? 1 : 0)}
                    </Button>
                    <span className="inline-flex items-center gap-1.5 px-2 text-sm text-muted-foreground">
                      <MessageCircle className="size-4" aria-hidden="true" />
                      {details.comments}
                    </span>
                  </div>
                  {organization?.verification === 'verifiedDemo' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                      <BadgeCheck className="size-4 text-primary" aria-hidden="true" />
                      Posted by the mission team
                    </span>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
