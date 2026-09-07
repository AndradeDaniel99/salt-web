import { access } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  assetPath,
  formatMoney,
  fundingProgress,
  saltCatalog,
  type MediaReference,
} from '@/lib/catalog';
import { getUpdatePostDetails } from '@/lib/update-posts';

function expectUniqueIds(records: Array<{ id: string }>) {
  const ids = records.map(({ id }) => id);
  expect(new Set(ids).size).toBe(ids.length);
}

function allMedia(): MediaReference[] {
  return [
    ...saltCatalog.organizations.map(({ logo }) => logo),
    ...saltCatalog.missionaries.map(({ portrait }) => portrait),
    ...saltCatalog.campaigns.map(({ cover }) => cover),
    ...saltCatalog.updates.flatMap(({ media }) => media),
  ];
}

describe('demo catalog', () => {
  it('uses unique identifiers in every collection', () => {
    expectUniqueIds(saltCatalog.organizations);
    expectUniqueIds(saltCatalog.missionaries);
    expectUniqueIds(saltCatalog.campaigns);
    expectUniqueIds(saltCatalog.updates);
  });

  it('keeps campaign and update relationships valid', () => {
    const organizationIds = new Set(
      saltCatalog.organizations.map(({ id }) => id),
    );
    const missionaryIds = new Set(saltCatalog.missionaries.map(({ id }) => id));
    const campaignIds = new Set(saltCatalog.campaigns.map(({ id }) => id));

    for (const missionary of saltCatalog.missionaries) {
      expect(organizationIds.has(missionary.organizationID)).toBe(true);
      for (const campaignId of missionary.activeCampaignIDs) {
        expect(campaignIds.has(campaignId)).toBe(true);
      }
    }

    for (const campaign of saltCatalog.campaigns) {
      expect(organizationIds.has(campaign.organizationID)).toBe(true);
      if (campaign.missionaryID) {
        expect(missionaryIds.has(campaign.missionaryID)).toBe(true);
      }
    }

    for (const update of saltCatalog.updates) {
      expect(campaignIds.has(update.campaignID)).toBe(true);
    }
  });

  it('ships every media file referenced by the catalog', async () => {
    const paths = [...new Set(allMedia().map(assetPath))];

    await Promise.all(
      paths.map((path) =>
        access(resolve(process.cwd(), 'public', path.slice(1))),
      ),
    );
  });
});

describe('catalog presentation helpers', () => {
  it('formats BRL values stored in minor units', () => {
    expect(formatMoney({ minorUnits: 735_000, currency: 'BRL' })).toContain(
      '7,350',
    );
  });

  it('caps funding progress at one hundred percent', () => {
    expect(
      fundingProgress({
        type: 'oneTime',
        goal: { minorUnits: 100, currency: 'BRL' },
        raised: { minorUnits: 150, currency: 'BRL' },
        deadline: '2027-01-01T00:00:00Z',
      }),
    ).toBe(100);
  });

  it('provides safe fallback details for an unknown update', () => {
    const details = getUpdatePostDetails('unknown-update');

    expect(details.category).toBe('Field update');
    expect(details.reactions).toBe(0);
    expect(details.comments).toBe(0);
  });
});
