export const RULE_TEMPLATES = [
  { id: 'blank', label: 'Blank', text: '' },
  {
    id: 'turn',
    label: 'Start Of Turn + Scoring',
    text: `START OF TURN
A - Awaken: Ready your cards and runes.
B - Beginning: Start of Turn abilities and Hold points.
C - Channel: Play two runes.
D - Draw: Draw 1 from your deck.

SCORING
- 8 points to win.
- Maximum 1 point per battlefield per turn.
- To get the 8th point, hold 1 battlefield OR score them all in one turn.`,
  },
  {
    id: 'combat',
    label: 'Your Turn + Combat',
    text: `YOUR TURN
- Play cards from hand.
- Play your champion unit (if not already on the board).
- Use abilities of cards.
- Move units to a battlefield.

COMBAT
1. Resolve defend and attack triggers.
2. Starting with the attacker, players may play actions or reactions.
3. Resolve each right away, unless players play reactions.
4. Units deal damage, then if attackers survive, they score and conquer.`,
  },
];

export function clampPct(value, fallback) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return fallback;
  return Math.max(0, Math.min(100, numeric));
}

export class RuleEntryFactory {
  static createId() {
    return `rule-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  static createBlank(zoneId = '') {
    return {
      id: RuleEntryFactory.createId(),
      zoneId,
      templateId: 'blank',
      text: '',
      xPct: 3,
      yPct: 6,
      wPct: 94,
      hPct: 88,
      fontSize: 0,
    };
  }
}

export class RulesConfigBuilder {
  static buildDefaultEntries(config) {
    const zones = config?.zones ?? [];
    const baseId = RulesConfigBuilder.pickZoneId(zones, 'base');
    const runesId = RulesConfigBuilder.pickZoneId(zones, 'runes');
    const templatesById = new Map(RULE_TEMPLATES.map((template) => [template.id, template]));
    const rules = [];

    if (baseId) {
      rules.push({
        ...RuleEntryFactory.createBlank(baseId),
        templateId: 'turn',
        text: templatesById.get('turn')?.text ?? '',
      });
    }

    if (runesId) {
      rules.push({
        ...RuleEntryFactory.createBlank(runesId),
        templateId: 'combat',
        text: templatesById.get('combat')?.text ?? '',
      });
    }

    return rules;
  }

  static applyEntries(config, rulesEntries, rulesEnabled) {
    if (!config?.zones) return config;

    const hasMirrored2P = RulesConfigBuilder.isMirroredTwoPlayer(config.zones);
    const groupedByZone = new Map();

    (rulesEntries ?? []).forEach((entry) => {
      const text = (entry?.text ?? '').trim();
      if (!entry?.zoneId || !text) return;

      const packed = {
        content: text,
        xPct: clampPct(entry.xPct, 0),
        yPct: clampPct(entry.yPct, 0),
        wPct: clampPct(entry.wPct, 100),
        hPct: clampPct(entry.hPct, 100),
        fontSize: Math.max(0, Number(entry.fontSize) || 0),
        align: 'left',
        valign: 'top',
        color: '',
        enabled: true,
      };

      RulesConfigBuilder.appendEntry(groupedByZone, entry.zoneId, packed);

      if (hasMirrored2P) {
        const mirroredZoneId = RulesConfigBuilder.mirrorZoneId(entry.zoneId);
        if (mirroredZoneId) {
          RulesConfigBuilder.appendEntry(groupedByZone, mirroredZoneId, { ...packed });
        }
      }
    });

    return {
      ...config,
      zones: config.zones.map((zone) => ({
        ...zone,
        textEntries: rulesEnabled ? groupedByZone.get(zone.id) ?? [] : [],
        text: {
          ...zone.text,
          enabled: false,
          content: '',
          align: 'left',
          valign: 'top',
        },
      })),
    };
  }

  static pickZoneId(zones, name) {
    const exact = zones.find((zone) => zone.name?.toLowerCase() === name);
    if (exact) return exact.id;

    const contains = zones.find((zone) => zone.name?.toLowerCase().includes(name));
    return contains?.id ?? '';
  }

  static isMirroredTwoPlayer(zones) {
    return zones.some((zone) => zone.id.startsWith('p1_')) && zones.some((zone) => zone.id.startsWith('p2_'));
  }

  static mirrorZoneId(zoneId) {
    if (zoneId?.startsWith('p1_')) return zoneId.replace(/^p1_/, 'p2_');
    if (zoneId?.startsWith('p2_')) return zoneId.replace(/^p2_/, 'p1_');
    return null;
  }

  static appendEntry(groupedByZone, zoneId, entry) {
    const entries = groupedByZone.get(zoneId) ?? [];
    entries.push(entry);
    groupedByZone.set(zoneId, entries);
  }
}
