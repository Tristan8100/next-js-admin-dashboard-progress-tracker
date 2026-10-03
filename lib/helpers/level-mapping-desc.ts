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
    '0': { description: 'lvl 1 drag and drop 3 solid' },
    '1': { description: 'lvl 2 drag and drop 3 liquids' },
    '2': { description: 'lvl 3 drag and drop 3 gas' },
    '3': { description: 'lvl 4 drag and drop 3 safe solids' },
    '4': { description: 'lvl 5 drag and drop 3 unsafe solids' },
    '5': { description: 'lvl 6 drag and drop 3 safe liquids' },
    '6': { description: 'lvl 7 drag and drop 3 unsafe liquids' },
    '7': { description: 'lvl 8 drag and drop 3 solids that changes form' },
    '8': { description: 'lvl 9 drag and drop 3 liquids that changes form' },
    '9': { description: 'lvl 10 drag and drop 4 solids, 4 liquids, 4 gas in the box' },
    // living (10-19)
    '10': { description: 'lvl 1 select 3 living things' },
    '11': { description: 'lvl 2 select 3 non living things' },
    '12': { description: 'lvl 3 select all animals' },
    '13': { description: 'lvl 4 select all 3 plants' },
    '14': { description: 'lvl 5 select all 3 humans' },
    '15': { description: 'lvl 6 select all living things that inherit traits from parents' },
    '16': { description: 'lvl 7 find and select 3 inherited traits from humans' },
    '17': { description: 'lvl 8 select learned traits from humans' },
    '18': { description: 'lvl 9 select 5 living things' },
    '19': { description: 'lvl 10 select 3 living things pt.1 - select 3 non living things pt.2' },
    // force (20-29)
    '20': { description: 'lvl 1 what force is being applied?' },
    '21': { description: 'lvl 2 what force is being applied?' },
    '22': { description: 'lvl 3 what object is moving?' },
    '23': { description: 'lvl 4 identify the source of light' },
    '24': { description: 'lvl 5 what object gives off heat?' },
    '25': { description: 'lvl 6 identify the source of sound' },
    '26': { description: 'lvl 7 does this object make sound?' },
    '27': { description: 'lvl 8 which object uses electricity' },
    '28': { description: 'lvl 9 what makes the swing move?' },
    '29': { description: 'lvl 10 what energy is shown?' },
    // earth (30-39)
    '30': { description: 'lvl 1 it is sunny! find the correct outfit' },
    '31': { description: 'lvl 2 it is raining! find the correct outfit' },
    '32': { description: 'lvl 3 it is windy find the correct outfit' },
    '33': { description: 'lvl 4 it is winter find the correct outfit' },
    '34': { description: 'lvl 5 lets star gaze find the corret outfit' },
    '35': { description: 'lvl 6 it is summer find the correct outfit' },
    '36': { description: 'lvl 7 we\'re on outer space find the correct outfit' },
    '37': { description: 'lvl 8 it is cloudy find the correct outfit' },
    '38': { description: 'lvl 9 it is stormy find the correct outfit' },
    '39': { description: 'lvl 10 it is sunrise find the correct outfit' },
  },

  tutorial: {
    // materials (0-3)
    '0': { description: 'Video: matter 1/video lesson 1'},
    '1': { description: 'tutorial (drag and drop all 3 solid)' },
    '2': { description: 'Video: matter 2/video lesson 2' },
    '3': { description: 'Video: matter 3/video lesson 3' },
    // living (4-7)
    '4': { description: 'Video: living and non living 1/video lesson 1' },
    '5': { description: 'tutorial (find and select 3 living things)' },
    '6': { description: 'Video: living and non living 2/video lesson 2' },
    '7': { description: 'Video: living and non living 3/video lesson 3' },
    // force (8-10)
    '8': { description: 'Video: force and motion 1/video lesson 1' },
    '9': { description: 'tutorial (which type of force or energy is used)' },
    '10': { description: 'Video: force and motion 2/video lesson 2' },
    // earth (11-13)
    '11': { description: 'Video: earth and space 1/video lesson 1' },
    '12': { description: 'tutorial (drag the outfit)' },
    '13': { description: 'Video: earth and space 2/video lesson 2' },
  },

  knowledge_check: {
    // materials (0-1)
    '0': { description: 'knowledge check (pre-test)' },
    '1': { description: 'knowledge check (post-test)' },
    // living (2-3)
    '2': { description: 'knowledge check (pre-test)' },
    '3': { description: 'knowledge check (post-test)' },
    // force (4-5)
    '4': { description: 'knowledge check (pre-test)' },
    '5': { description: 'knowledge check (post-test)' },
    // earth (6-7)
    '6': { description: 'knowledge check (pre-test)' },
    '7': { description: 'knowledge check (post-test)' },
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

/**
 * Returns the actual display level number (resetting to 1 for each new section/map).
 * 
 * Usage: displayActualLevel(data.type, data.level)
 */
export function displayActualLevel(
  type: string,
  index: number | string | undefined | null,
): number {
  if (index === undefined || index === null) {
    return 1;
  }

  const idx = Number(index);
  if (isNaN(idx)) {
    return 1;
  }

  switch (type) {
    case 'level':
      // Main levels reset every 10 items (0-9, 10-19, 20-29, 30-39) -> 1 to 10
      return (idx % 10) + 1;

    case 'knowledge_check':
      // Knowledge checks reset every 2 items (pre-test/post-test per section) -> 1 or 2
      return (idx % 2) + 1;

    case 'tutorial':
      // Tutorials have section-specific lengths (Materials/Living have 4, Force/Earth have 3)
      if (idx >= 0 && idx <= 3) return idx + 1;       // Materials (0-3) -> 1 to 4
      if (idx >= 4 && idx <= 7) return idx - 3;       // Living (4-7) -> 1 to 4
      if (idx >= 8 && idx <= 10) return idx - 7;      // Force (8-10) -> 1 to 3
      if (idx >= 11 && idx <= 13) return idx - 10;    // Earth (11-13) -> 1 to 3
      return idx + 1;

    default:
      return idx + 1;
  }
}
