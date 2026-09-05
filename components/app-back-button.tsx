'use client';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AppBackButton({
  fallbackHref,
  label,
  iconOnly = false,
  className,
}: {
  fallbackHref: string;
  label: string;
  iconOnly?: boolean;
  className?: string;
}) {
  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign(fallbackHref);
  }

  return (
    <Button
      type="button"
      variant={iconOnly ? 'outline' : 'ghost'}
      size={iconOnly ? 'icon-lg' : 'lg'}
      onClick={goBack}
      aria-label={label}
      className={cn(
        iconOnly
          ? 'size-12 rounded-full border-white/10 bg-card text-primary hover:bg-muted'
          : 'h-11 rounded-xl px-2 text-sm hover:text-primary',
        className,
      )}
    >
      <ArrowLeft className="size-5" aria-hidden="true" />
      {iconOnly ? null : label}
    </Button>
  );
}
