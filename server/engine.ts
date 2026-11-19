import { SCENARIOS, Scenario } from './scenarios.js';

export type Phase =
  | 'lobby'
  | 'build'        // сбор карточек в конструкторе
  | 'reveal'       // показ роли каждому игроку
  | 'intro'
  | 'story'
  | 'discussion'
  | 'voting'
  | 'results'
  | 'results-final'
  | 'end';

export type TeamPlayer = {
  socketId: string;
  nickname: string;
  joinedAt: number;
};

export type TeamState = {
  id: string;
  name: string;
  score: number;
  captainId: string | null;
  captainName: string | null;
  vote: string | null;
  joinedAt: number;
  roundScores: number[];
  players: TeamPlayer[];
};

// ============================================================
// КОНСТРУКТОР (custom)
// ============================================================

export type CustomSetup = {
  type: string;      // «Убийство», «Отравление»…
  victim: string;
  weapon: string;
  place: string;     // «Кухня», «Бар»…
  time: string;      // «23:00»
  details: string;
};

export type CustomPlayerCard = {
  teamId: string;
  name: string;
  role: string;
  hook: string;
  motive: string;
  alibi: string;
  location: string;
  partner: string;   // 'Один' или имя
};

export type GameState = {
  code: string;
  scenarioId: string;
  isDemo?: boolean;
  scenarioData?: Scenario;
  phase: Phase;
  round: number;
  totalRounds: number;
  revealedClues: number[];
  teams: TeamState[];
  eliminatedSuspects: string[];
  lastResult: any | null;
  roundStartedAt: number | null;
  roundDurationSec: number;
  finishedAt: number | null;
  roundPausedAt: number | null;
  roundPausedTotalMs: number;
  votingStartedAt: number | null;

  // ===== конструктор =====
  isCustom?: boolean;
  customSetup?: CustomSetup;
  customCards?: CustomPlayerCard[];
  customGenerated?: boolean;
};

export const ROUND_SECONDS = 600;
export const CLUE_TIMES_SEC = [180, 300, 420];

/**
 * Времена раскрытия улик для custom-режима.
 * Равномерно распределяет улики по раунду: первая на 30% времени,
 * последняя — на 80%. Для обычных сценариев НЕ используется —
 * там жёсткий CLUE_TIMES_SEC = [180, 300, 420].
 */
export function clueTimesForRound(
  totalClues: number,
  durationSec: number
): number[] {
  if (totalClues <= 0) return [];
  if (totalClues === 1) return [Math.floor(durationSec / 2)];
  const start = Math.floor(durationSec * 0.3);
  const end = Math.floor(durationSec * 0.8);
  const step = Math.floor((end - start) / (totalClues - 1));
  return Array.from({ length: totalClues }, (_, i) => start + step * i);
}

export const TOTAL_ROUNDS = 4;

export function createInitialState(
  code: string,
  scenarioId: string,
  isDemo = false,
  opts?: {
    isCustom?: boolean;
    totalRounds?: number;
    roundDurationSec?: number;
  }
): GameState {
  return {
    code,
    scenarioId,
    isDemo,
    isCustom: opts?.isCustom,
    phase: 'lobby',
    round: 0,
    totalRounds: opts?.totalRounds ?? TOTAL_ROUNDS,
    revealedClues: [],
    teams: [],
    eliminatedSuspects: [],
    lastResult: null,
    roundStartedAt: null,
    roundDurationSec: opts?.roundDurationSec ?? ROUND_SECONDS,
    finishedAt: null,
    roundPausedAt: null,
    roundPausedTotalMs: 0,
    votingStartedAt: null
  };
}

export const scenarioOf = (s: GameState): Scenario =>
  s.scenarioData || SCENARIOS.find(x => x.id === s.scenarioId) || SCENARIOS[0];

export function generateCode(): string {
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 4 }, () => abc[Math.floor(Math.random() * abc.length)]).join('');
}

// ============================================================
// ВЫБЫВАНИЕ ПОДОЗРЕВАЕМЫХ
// ============================================================

function pickElimination(s: GameState): string | null {
  const sc = scenarioOf(s);
  const killerId = sc.killerId ?? sc.suspects.find(x => x.isGuilty)?.id;
  const alive = sc.suspects.filter(x => !s.eliminatedSuspects.includes(x.id));
  const nonKiller = alive.filter(x => x.id !== killerId);
  if (nonKiller.length <= 1) return null;

  // ===== Строгий порядок, если задан в сценарии =====
  if (sc.eliminationOrder && sc.eliminationOrder.length > 0) {
    const next = sc.eliminationOrder.find(id => !s.eliminatedSuspects.includes(id));
    if (next) {
      if (next === killerId) return null;
      return next;
    }
    return null;
  }

  // ===== Иначе — по голосам (используется в custom) =====
  const votes: Record<string, number> = {};
  for (const t of s.teams) {
    if (t.vote) votes[t.vote] = (votes[t.vote] || 0) + 1;
  }

  const sorted = [...nonKiller].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));
  const topVotes = votes[sorted[0].id] || 0;
  const top = sorted.filter(x => (votes[x.id] || 0) === topVotes);

  return top[Math.floor(Math.random() * top.length)].id;
}

// ============================================================
// ГЕНЕРАТОР КОНСТРУКТОРА
// ============================================================

function buildContradictions(cards: CustomPlayerCard[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const a of cards) {
    if (a.partner === 'Один') continue;
    const b = cards.find(x => x.name === a.partner);
    if (!b) continue;
    const key = [a.name, b.name].sort().join('|');
    if (b.partner === 'Один') {
      out.push(
        `${a.name} говорит, что был(а) с ${b.name}. Но ${b.name} утверждает, что был(а) один(а).`
      );
    } else if (b.partner !== a.name && !seen.has(key)) {
      seen.add(key);
      out.push(`${a.name} и ${b.name} не могут договориться, кто с кем был.`);
    } else if (b.partner === a.name && a.location !== b.location && !seen.has(key)) {
      seen.add(key);
      out.push(
        `${a.name} и ${b.name} были вместе, но один называет «${a.location}», другой — «${b.location}».`
      );
    }
  }
  return out;
}

export function generateCustomScenario(s: GameState): Scenario {
  const setup = s.customSetup!;
  const cards = s.customCards || [];
  const place = setup.place || 'Кухня';
  const time = setup.time || '23:00';
  const weapon = setup.weapon || 'нож';

  // 1. Выбираем убийцу случайно
  const killerIdx = Math.floor(Math.random() * cards.length);
  const killer = cards[killerIdx];

  // 2. Suspects
  const suspects = cards.map((c, i) => ({
    id: `c${i}`,
    name: c.name,
    role: c.role,
    icon: 'fa-user-secret',
    description: c.hook,
    motive: c.motive,
    alibi: c.alibi,
    secret: '',
    isGuilty: i === killerIdx
  }));

  // 3. Улики
  const clues: any[] = [];

  // Раунд 1 — обстоятельства
  clues.push({
    round: 1,
    icon: 'fa-scroll',
    type: 'факт',
    name: 'Обстоятельства дела',
    desc: `${setup.type}. Время — ${time}. Жертва — ${setup.victim}. Место — ${place}. Орудие — ${weapon}. ${
      setup.details || 'Все были в здании.'
    }`
  });

  // Раунд 1 — противоречия
  const contradictions = buildContradictions(cards);
  contradictions.forEach((c, i) => {
    clues.push({
      round: 1,
      icon: 'fa-code-compare',
      type: 'противоречие',
      name: `Противоречие №${i + 1}`,
      desc: c
    });
  });

  // Раунд 2 — компромат (мотивы)
  cards.forEach(c => {
    clues.push({
      round: 2,
      icon: 'fa-fingerprint',
      type: 'компромат',
      name: `Компромат на ${c.name}`,
      desc: `${c.motive}. Это мотив, но не доказательство.`
    });
  });

  // Раунд 3 — протокол перемещений
  const atCrime = cards.filter(c => c.location === place).map(c => c.name);
  clues.push({
    round: 3,
    icon: 'fa-map-location-dot',
    type: 'протокол',
    name: `Протокол перемещений (${time})`,
    desc: `На месте преступления (${place}) находились: ${atCrime.join(
      ', '
    )}. Отпечатки есть у каждого.`
  });

  // 4. Распределяем по раундам (с учётом totalRounds)
  const totalRounds = s.totalRounds;
  const byRound: any[][] = Array.from({ length: totalRounds }, () => []);
  clues.forEach(c => {
    const r = Math.min(c.round, totalRounds);
    byRound[r - 1].push(c);
  });

  // 5. Главы
  const chapters = Array.from({ length: totalRounds }, (_, i) => ({
    round: i + 1,
    title: i === 0 ? 'Обстоятельства' : `Глава ${i + 1}`,
    atmosphere: '',
    text:
      i === 0
        ? `${setup.type}. Жертва — ${setup.victim}. Место — ${place}. Время — ${time}. Орудие — ${weapon}.`
        : `Новые улики указывают на ${cards.map(c => c.name).join(', ')}.`
  }));

  return {
    id: 'custom',
    title: 'Ваше дело',
    icon: 'fa-feather-pointed',
    description: `${setup.type} · ${setup.victim}`,
    crime: setup.type,
    victim: setup.victim,
    location: place,
    bg: '',
    chapters,
    suspects,
    clues: byRound.flat(),
    solution: `Убийца — ${killer.name}.`,
    eliminationOrder: undefined, // выбывание по голосам
    killerId: `c${killerIdx}`
  } as Scenario;
}

// ============================================================
// ПЕРЕХОДЫ ФАЗ
// ============================================================

export function nextPhase(s: GameState): GameState {
  const sc = scenarioOf(s);
  const ns: GameState = {
    ...s,
    teams: s.teams.map(t => ({ ...t })),
    eliminatedSuspects: [...s.eliminatedSuspects]
  };
  switch (s.phase) {
    case 'lobby':
  if (s.isCustom) {
    ns.phase = 'build';
  } else {
    ns.phase = 'intro';
  }
  break;

    case 'build': {
      // Хост нажал «Начать игру» — генерируем сценарий и переходим к reveal
      ns.scenarioData = generateCustomScenario(ns);
      ns.customGenerated = true;
      ns.phase = 'reveal';
      break;
    }

    case 'reveal': {
      // Все посмотрели роли — начинаем игру
      ns.phase = 'story';
      ns.round = 1;
      ns.roundStartedAt = Date.now();
      // roundDurationSec уже задан при создании сессии
      if (s.isDemo) {
        // на всякий случай — демо-режим в custom не используется, но пусть будет
        ns.roundDurationSec = 3600;
      }
      break;
    }

    case 'intro':
      ns.phase = 'story';
      ns.round = 1;
      ns.roundStartedAt = Date.now();
      ns.roundDurationSec = s.isDemo ? 3600 : s.roundDurationSec;
      if (s.isDemo) {
        sc.clues.forEach((c, i) => {
          if (c.round === 1) ns.revealedClues.push(i);
        });
      }
      break;

    case 'story':
      if (s.isDemo) {
        ns.phase = 'voting';
        ns.votingStartedAt = Date.now();
        ns.teams.forEach(t => (t.vote = null));
      } else {
        ns.phase = 'discussion';
        ns.roundStartedAt = Date.now();
      }
      break;

    case 'discussion':
      ns.phase = 'voting';
      ns.teams.forEach(t => (t.vote = null));
      ns.votingStartedAt = Date.now();
      break;

    case 'voting': {
      // Штраф за пропуск голосования
      ns.teams.forEach(t => {
        if (!t.vote) {
          t.score -= 100;
          if (!t.roundScores) t.roundScores = [];
          while (t.roundScores.length < ns.totalRounds) t.roundScores.push(0);
          t.roundScores[ns.round - 1] = -100;
        }
      });
      const result: any = {
        round: ns.round,
        perTeam: [],
        correctTeamIds: [] as string[],
        wrongTeamIds: [] as string[],
        eliminatedId: null as string | null
      };
      const killerId = sc.killerId ?? sc.suspects.find(x => x.isGuilty)?.id;
      ns.teams.forEach(t => {
        const correct = t.vote === killerId;
        const isFinal = ns.round >= ns.totalRounds;
        let roundScore = 0;
        if (correct) {
          roundScore = isFinal ? 500 : 100;
          t.score += roundScore;
          result.correctTeamIds.push(t.id);
        }
        if (!t.roundScores) t.roundScores = [];
        while (t.roundScores.length < ns.totalRounds) t.roundScores.push(0);
        if (t.vote !== null) {
          t.roundScores[ns.round - 1] = roundScore;
        }
        result.perTeam.push({ teamId: t.id, vote: t.vote, correct });
      });

      ns.votingStartedAt = null;

      if (s.isDemo) {
        ns.phase = 'results-final';
        ns.finishedAt = Date.now();
        ns.lastResult = result;
        break;
      }

      if (ns.round < ns.totalRounds) {
        const elimId = pickElimination(ns);
        if (elimId) {
          ns.eliminatedSuspects.push(elimId);
          result.eliminatedId = elimId;
        }
        ns.phase = 'results';
      } else {
        ns.phase = 'results';
      }
      ns.lastResult = result;
      break;
    }

    case 'results':
      if (ns.round >= ns.totalRounds) {
        ns.phase = 'end';
        ns.finishedAt = Date.now();
      } else {
        sc.clues.forEach((c, i) => {
          if (c.round <= ns.round && !ns.revealedClues.includes(i)) {
            ns.revealedClues.push(i);
          }
        });
        ns.phase = 'story';
        ns.round += 1;
        ns.roundStartedAt = Date.now();
        // для обычных сценариев — финальный раунд короче
        if (!s.isCustom) {
          ns.roundDurationSec = ns.round >= ns.totalRounds ? 300 : 600;
        }
      }
      break;

    case 'end':
      ns.phase = 'results-final';
      break;

    case 'results-final':
      break;

    default:
      break;
  }
  return ns;
}

export function prevPhase(s: GameState): GameState {
  const ns: GameState = {
    ...s,
    teams: s.teams.map(t => ({ ...t })),
    eliminatedSuspects: [...s.eliminatedSuspects]
  };
  switch (s.phase) {
    case 'intro':
      ns.phase = 'lobby';
      break;

    case 'reveal':
      // назад из reveal — в build (конструктор)
      if (s.isCustom) {
        ns.phase = 'build';
        ns.scenarioData = undefined;
        ns.customGenerated = false;
      } else {
        ns.phase = 'lobby';
      }
      break;

    case 'story':
      if (ns.round > 1) {
        ns.phase = 'results';
        ns.round -= 1;
        const sc = scenarioOf(ns);
        ns.revealedClues = ns.revealedClues.filter(i => sc.clues[i].round <= ns.round);
      } else {
        ns.phase = s.isCustom ? 'reveal' : 'intro';
      }
      break;

    case 'discussion':
      ns.phase = 'story';
      ns.roundStartedAt = null;
      break;

    case 'voting':
      ns.phase = 'discussion';
      ns.teams.forEach(t => (t.vote = null));
      break;

    case 'results':
    case 'end':
    case 'lobby':
    default:
      return s;
  }
  return ns;
}

export function resetSession(s: GameState): GameState {
  return createInitialState(s.code, s.scenarioId, s.isDemo, {
    isCustom: s.isCustom,
    totalRounds: s.totalRounds,
    roundDurationSec: s.roundDurationSec
  });
}

// ============================================================
// PUBLIC STATE
// ============================================================

export function publicState(s: GameState, opts: { revealSolution: boolean }) {
  const sc = scenarioOf(s);
  const chapterIndex =
    s.round >= 1 && s.round <= sc.chapters.length ? s.round - 1 : -1;
  const chapter = chapterIndex >= 0 ? sc.chapters[chapterIndex] : null;

  const base: any = {
    code: s.code,
    phase: s.phase,
    isDemo: s.isDemo,
    isCustom: s.isCustom,
    round: s.round,
    totalRounds: s.totalRounds,
    teams: s.teams,
    roundStartedAt: s.roundStartedAt,
    roundDurationSec: s.roundDurationSec,
    roundPausedAt: s.roundPausedAt,
    roundPausedTotalMs: s.roundPausedTotalMs,
    votingStartedAt: s.votingStartedAt,
    votingDurationSec: 60,
    clueTimesSec: s.isCustom
      ? clueTimesForRound(
      (sc.clues || []).filter(c => c.round === s.round).length,
      s.roundDurationSec
      )
      : CLUE_TIMES_SEC,
    eliminatedSuspects: s.eliminatedSuspects,
    lastResult: s.lastResult,

    // ===== конструктор =====
    customSetup: s.customSetup,
    customCardsCount: s.customCards?.length ?? 0,
    customGenerated: s.customGenerated,
    customSubmittedTeamIds: s.customCards?.map(c => c.teamId) ?? [],

      // ===== НОВОЕ: раскрываем killerId в фазе reveal =====
    myKillerId:
    opts.revealSolution || s.phase === 'reveal' ? sc.killerId : undefined,

    scenario: {
      id: sc.id,
      title: sc.title,
      description: sc.description,
      crime: sc.crime,
      victim: sc.victim,
      location: sc.location,
      bg: sc.bg,
      rulesAudioUrl: sc.rulesAudioUrl,
      solutionAudioUrl: sc.solutionAudioUrl,
      eliminationOrder: sc.eliminationOrder,
      suspects: sc.suspects.map(({ secret, ...rest }) => rest),
      clues: sc.clues
    },
    chapter,
    clues: s.revealedClues.map(i => sc.clues[i]),
    revealedClueIndices: s.revealedClues
  };
  if (opts.revealSolution) {
    base.solution = sc.solution;
    base.fullSuspects = sc.suspects;
    base.killerId = sc.killerId;
  }
  return base;
}

export function revealClue(s: GameState, clueIndex: number): GameState {
  if (s.revealedClues.includes(clueIndex)) return s;
  return { ...s, revealedClues: [...s.revealedClues, clueIndex] };
}