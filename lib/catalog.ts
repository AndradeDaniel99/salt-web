import catalog from '@/data/demo-catalog.json';

export type Money = {
  minorUnits: number;
  currency: 'BRL';
};

export type MediaReference = {
  source: {
    assetName: string;
  };
  alternativeText: string;
};

export type Organization = {
  id: string;
  name: string;
  summary: string;
  location: string;
  websiteURL: string;
  logo: MediaReference;
  verification: 'verifiedDemo' | 'informationProvided';
};

export type Missionary = {
  id: string;
  organizationID: string;
  displayName: string;
  shortBio: string;
  story: string;
  currentMission: string;
  location: string;
  country: string;
  sentYear: number;
  portrait: MediaReference;
  ministryAreas: string[];
  activeCampaignIDs: string[];
};

export type Funding =
  | {
      type: 'oneTime';
      goal: Money;
      raised: Money;
      deadline: string;
    }
  | {
      type: 'monthly';
      goal: Money;
      committed: Money;
      supportersCount: number;
    };

export type Campaign = {
  id: string;
  organizationID: string;
  missionaryID?: string;
  title: string;
  shortDescription: string;
  story: string;
  location: string;
  status: 'active';
  isFeatured: boolean;
  cover: MediaReference;
  funding: Funding;
};

export type CampaignUpdate = {
  id: string;
  campaignID: string;
  publishedAt: string;
  title: string;
  body: string;
  media: MediaReference[];
};

type Catalog = {
  organizations: Organization[];
  missionaries: Missionary[];
  campaigns: Campaign[];
  updates: CampaignUpdate[];
};

export const saltCatalog = catalog as Catalog;

export function assetPath(media: MediaReference) {
  const extension = media.source.assetName.startsWith('org-') ? 'svg' : 'jpg';
  return `/assets/${media.source.assetName}.${extension}`;
}

export function formatMoney(money: Money) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: money.currency,
    maximumFractionDigits: 0,
  }).format(money.minorUnits / 100);
}

export function fundingProgress(funding: Funding) {
  const current =
    funding.type === 'oneTime' ? funding.raised.minorUnits : funding.committed.minorUnits;
  return Math.min(Math.round((current / funding.goal.minorUnits) * 100), 100);
}

export function fundingCurrentLabel(funding: Funding) {
  if (funding.type === 'oneTime') {
    return `${formatMoney(funding.raised)} arrecadados`;
  }

  return `${formatMoney(funding.committed)} mensais comprometidos`;
}

export function fundingGoalLabel(funding: Funding) {
  if (funding.type === 'oneTime') {
    return `Meta de ${formatMoney(funding.goal)}`;
  }

  return `Meta mensal de ${formatMoney(funding.goal)}`;
}
