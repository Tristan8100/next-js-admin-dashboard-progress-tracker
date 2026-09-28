// Static descriptions for MapProgress records, shown on the web dashboard.
//
// Keys are the RAW stored values from MongoDB:
//   - type  -> MapProgress.type  ('level' | 'tutorial' | 'knowledge_check')
//   - index -> MapProgress.level (the global index sent by the game)
//
// The placeholder text uses the display number (index + 1), so key '0' says
// "level 1 description". The lookup itself always uses the raw index.

export type ProgressType = 'level' | 'tutorial' | 'knowledge_check';

export interface ProgressDescription {
  description: string;
}

export type ProgressDescriptions = Record<
  ProgressType,
  Record<string, ProgressDescription>
>;

// Shown when a type/index has no entry or its description is empty.
export const DESCRIPTION_FALLBACK = '(no description)';

export const PROGRESS_DESCRIPTIONS: ProgressDescriptions = {
  level: {
    // materials (0-9)
    '0': { description: 'level 1 description' },
    '1': { description: 'level 2 description' },
    '2': { description: 'level 3 description' },
    '3': { description: 'level 4 description' },
    '4': { description: 'level 5 description' },
    '5': { description: 'level 6 description' },
    '6': { description: 'level 7 description' },
    '7': { description: 'level 8 description' },
    '8': { description: 'level 9 description' },
    '9': { description: 'level 10 description' },
    // living (10-19)
    '10': { description: 'level 11 description' },
    '11': { description: 'level 12 description' },
    '12': { description: 'level 13 description' },
    '13': { description: 'level 14 description' },
    '14': { description: 'level 15 description' },
    '15': { description: 'level 16 description' },
    '16': { description: 'level 17 description' },
    '17': { description: 'level 18 description' },
    '18': { description: 'level 19 description' },
    '19': { description: 'level 20 description' },
    // force (20-29)
    '20': { description: 'level 21 description' },
    '21': { description: 'level 22 description' },
    '22': { description: 'level 23 description' },
    '23': { description: 'level 24 description' },
    '24': { description: 'level 25 description' },
    '25': { description: 'level 26 description' },
    '26': { description: 'level 27 description' },
    '27': { description: 'level 28 description' },
    '28': { description: 'level 29 description' },
    '29': { description: 'level 30 description' },
    // earth (30-39)
    '30': { description: 'level 31 description' },
    '31': { description: 'level 32 description' },
    '32': { description: 'level 33 description' },
    '33': { description: 'level 34 description' },
    '34': { description: 'level 35 description' },
    '35': { description: 'level 36 description' },
    '36': { description: 'level 37 description' },
    '37': { description: 'level 38 description' },
    '38': { description: 'level 39 description' },
    '39': { description: 'level 40 description' },
  },

  tutorial: {
    // materials (0-3)
    '0': { description: 'tutorial 1 description' },
    '1': { description: 'tutorial 2 description' },
    '2': { description: 'tutorial 3 description' },
    '3': { description: 'tutorial 4 description' },
    // living (4-7)
    '4': { description: 'tutorial 5 description' },
    '5': { description: 'tutorial 6 description' },
    '6': { description: 'tutorial 7 description' },
    '7': { description: 'tutorial 8 description' },
    // force (8-10)
    '8': { description: 'tutorial 9 description' },
    '9': { description: 'tutorial 10 description' },
    '10': { description: 'tutorial 11 description' },
    // earth (11-13)
    '11': { description: 'tutorial 12 description' },
    '12': { description: 'tutorial 13 description' },
    '13': { description: 'tutorial 14 description' },
  },

  knowledge_check: {
    // materials (0-1)
    '0': { description: 'knowledge check 1 description' },
    '1': { description: 'knowledge check 2 description' },
    // living (2-3)
    '2': { description: 'knowledge check 3 description' },
    '3': { description: 'knowledge check 4 description' },
    // force (4-5)
    '4': { description: 'knowledge check 5 description' },
    '5': { description: 'knowledge check 6 description' },
    // earth (6-7)
    '6': { description: 'knowledge check 7 description' },
    '7': { description: 'knowledge check 8 description' },
  },
};

/**
 * Returns the description for a progress record.
 *
 * Usage: addDesc(data.type, data.level)
 * (MapProgress has `_id: false`, and the index lives in `level` for every type.)
 */
export function addDesc(
  type: string,
  index: number | string | undefined | null,
): string {
  if (index === undefined || index === null) {
    return DESCRIPTION_FALLBACK;
  }

  const entry = (
    PROGRESS_DESCRIPTIONS as Record<string, Record<string, ProgressDescription>>
  )[type]?.[String(index)];

  return entry?.description || DESCRIPTION_FALLBACK;
}