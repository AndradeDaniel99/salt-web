'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Info,
  X,
} from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { formatMoney, type Campaign, type Organization } from '@/lib/catalog';

const suggestedAmounts = [50, 100, 200, 500];
const minimumAmount = 10;
const maximumAmount = 5000;

function formatContribution(amount: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(amount);
}

function SimulationNotice() {
  return (
    <div className="flex gap-3 rounded-3xl border border-primary/10 bg-primary/16 p-5 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
      <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <p>
        Esta experiência é uma simulação. Nenhum dinheiro será movimentado e nenhuma
        cobrança será realizada.
      </p>
    </div>
  );
}

function HeaderControl({
  label,
  children,
  onClick,
  href,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const className = cn(
    buttonVariants({ variant: 'outline', size: 'icon-lg' }),
    'size-12 rounded-full border-white/10 bg-card text-primary hover:bg-muted',
  );

  if (href) {
    return (
      <Link href={href} className={className} aria-label={label}>
        {children}
      </Link>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      className={className}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </Button>
  );
}

export function SupportFlow({
  campaign,
  organization,
}: {
  campaign: Campaign;
  organization?: Organization;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('100');
  const isValidAmount = amount >= minimumAmount && amount <= maximumAmount;
  const frequency = campaign.funding.type === 'monthly' ? 'Mensal' : 'Uma vez';
  const missionHref = campaign.missionaryID
    ? `/missionarios/${campaign.missionaryID}`
    : `/campanhas/${campaign.id}`;

  function selectAmount(value: number) {
    setAmount(value);
    setCustomAmount(String(value));
  }

  function updateCustomAmount(value: string) {
    setCustomAmount(value);
    const parsed = Number(value.replace(',', '.'));
    setAmount(Number.isFinite(parsed) ? parsed : 0);
  }

  function confirmSupport() {
    try {
      const current = JSON.parse(
        window.localStorage.getItem('salt-supported-campaigns') ?? '[]',
      ) as string[];
      const next = current.includes(campaign.id) ? current : [...current, campaign.id];
      window.localStorage.setItem('salt-supported-campaigns', JSON.stringify(next));
      window.localStorage.setItem(
        `salt-support-${campaign.id}`,
        JSON.stringify({ amount, frequency, confirmedAt: new Date().toISOString() }),
      );
    } catch {
      // The confirmation still works when browser storage is unavailable.
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-5 sm:px-8 sm:py-8">
        {step < 3 ? (
          <header className="grid grid-cols-[48px_1fr_48px] items-center gap-3">
            {step === 2 ? (
              <HeaderControl label="Voltar para escolher o valor" onClick={() => setStep(1)}>
                <ArrowLeft className="size-5" aria-hidden="true" />
              </HeaderControl>
            ) : (
              <span aria-hidden="true" />
            )}
            <p className="text-center text-sm font-semibold text-muted-foreground">Seu apoio</p>
            <HeaderControl
              label="Fechar fluxo de apoio"
              href={`/campanhas/${campaign.id}`}
            >
              <X className="size-5" aria-hidden="true" />
            </HeaderControl>
          </header>
        ) : null}

        {step === 1 ? (
          <section className="flex flex-1 flex-col pt-12 sm:pt-16">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Escolha sua contribuição
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{campaign.title}</p>
            </div>

            <div className="mt-8">
              <SimulationNotice />
            </div>

            <div className="mt-6 rounded-[1.75rem] bg-card p-5 sm:p-7">
              <h2 className="text-xl font-semibold">Valores sugeridos</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {suggestedAmounts.map((suggestedAmount) => (
                  <Button
                    key={suggestedAmount}
                    type="button"
                    variant="outline"
                    aria-pressed={amount === suggestedAmount}
                    onClick={() => selectAmount(suggestedAmount)}
                    className={cn(
                      'h-14 rounded-2xl border-primary text-base font-semibold text-primary hover:bg-primary/10 sm:text-lg',
                      amount === suggestedAmount &&
                        'border-[#8be0ad] bg-[#8be0ad] text-[#092015] shadow-[0_8px_24px_rgb(139_224_173/0.2)] hover:bg-[#9be8b9]',
                    )}
                  >
                    {formatContribution(suggestedAmount)}
                  </Button>
                ))}
              </div>

              <label className="mt-7 block text-base font-medium" htmlFor="custom-amount">
                Outro valor
              </label>
              <div className="relative mt-3">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  R$
                </span>
                <Input
                  id="custom-amount"
                  inputMode="decimal"
                  value={customAmount}
                  onChange={(event) => updateCustomAmount(event.target.value)}
                  className="h-14 rounded-2xl border-white/10 bg-background pl-12 text-lg"
                  aria-describedby="amount-help"
                />
              </div>
              <p
                id="amount-help"
                className={cn(
                  'mt-3 text-sm text-muted-foreground',
                  customAmount && !isValidAmount && 'text-destructive',
                )}
              >
                Entre {formatMoney({ minorUnits: minimumAmount * 100, currency: 'BRL' })} e{' '}
                {formatMoney({ minorUnits: maximumAmount * 100, currency: 'BRL' })}.
              </p>
            </div>

            <div className="mt-8 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Button
                type="button"
                size="lg"
                className="h-14 w-full rounded-2xl bg-primary px-6 text-base text-primary-foreground hover:bg-primary/90"
                disabled={!isValidAmount}
                onClick={() => {
                  setStep(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Continuar
                <ArrowRight className="size-5" aria-hidden="true" />
              </Button>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="flex flex-1 flex-col pt-12 sm:pt-16">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Seu apoio</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Confira os dados desta simulação.
              </p>
            </div>

            <dl className="mt-8 divide-y divide-white/10 rounded-[1.75rem] bg-card px-5 sm:px-7">
              {[
                ['Campanha', campaign.title],
                ['Organização', organization?.name ?? 'Organização parceira'],
                ['Valor', formatContribution(amount)],
                ['Frequência', frequency],
                ['Pagamento', 'Cartão demonstrativo •••• 4242'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[minmax(108px,0.7fr)_minmax(0,1.3fr)] gap-4 py-5"
                >
                  <dt className="font-medium">{label}</dt>
                  <dd className="text-right leading-6 text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <SimulationNotice />
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Nenhum dado de cartão é coletado ou armazenado. O número exibido é
              inteiramente fictício.
            </p>

            <div className="mt-8 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Button
                type="button"
                size="lg"
                className="h-14 w-full rounded-2xl bg-primary px-6 text-base text-primary-foreground hover:bg-primary/90"
                onClick={confirmSupport}
              >
                <Heart className="size-5 fill-current" aria-hidden="true" />
                Confirmar apoio
              </Button>
            </div>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="flex flex-1 flex-col items-center justify-center py-12 text-center">
            <p className="text-sm font-semibold text-muted-foreground">Confirmação</p>
            <div className="mt-12 grid size-20 place-items-center rounded-full bg-primary text-primary-foreground">
              <Heart className="size-9 fill-current" aria-hidden="true" />
            </div>
            <Check className="sr-only" aria-hidden="true" />
            <h1 className="mt-8 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Você agora faz parte dessa missão.
            </h1>
            <p className="mt-8 text-xl">{campaign.title}</p>
            <p className="mt-5 text-3xl font-semibold">{formatContribution(amount)}</p>
            <p className="mt-3 text-lg text-muted-foreground">{frequency}</p>

            <div className="mt-10 w-full text-left">
              <SimulationNotice />
            </div>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground">
              O apoio foi salvo somente neste dispositivo para que você possa experimentar o
              acompanhamento da missão.
            </p>

            <Link
              href={missionHref}
              className={cn(
                buttonVariants({ size: 'lg' }),
                'mt-9 h-14 w-full rounded-2xl bg-primary px-6 text-base text-primary-foreground hover:bg-primary/90',
              )}
            >
              Acompanhar missão
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </section>
        ) : null}
      </div>
    </main>
  );
}
