import { SCENARIOS, Scenario } from './scenarios.js';

export type Phase = 'lobby' | 'intro' | 'story' | 'discussion' | 'voting' | 'results' | 'results-final' | 'end';

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
};

export const ROUND_SECONDS = 600;
export const CLUE_TIMES_SEC = [180, 300, 420];

export const TOTAL_ROUNDS = 4;

export function createInitialState(code: string, scenarioId: string, isDemo = false): GameState {
  return {
    code,
    scenarioId,
    isDemo,
    phase: 'lobby',
    round: 0,
    totalRounds: TOTAL_ROUNDS,
    revealedClues: [],
    teams: [],
    eliminatedSuspects: [],
    lastResult: null,
    roundStartedAt: null,
    roundDurationSec: ROUND_SECONDS,
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
      // защита от случайного выбывания убийцы
      if (next === killerId) return null;
      return next;
    }
    return null;
  }

  // ===== Иначе — по голосам =====
  const votes: Record<string, number> = {};
  for (const t of s.teams) {
    if (t.vote) votes[t.vote] = (votes[t.vote] || 0) + 1;
  }

  const sorted = [...nonKiller].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));
  const topVotes = votes[sorted[0].id] || 0;
  const top = sorted.filter(x => (votes[x.id] || 0) === topVotes);

  return top[Math.floor(Math.random() * top.length)].id;
}

export function nextPhase(s: GameState): GameState {
  const sc = scenarioOf(s);
  const ns: GameState = {
    ...s,
    teams: s.teams.map(t => ({ ...t })),
    eliminatedSuspects: [...s.eliminatedSuspects]
  };
  switch (s.phase) {
    case 'lobby':
      if (s.isDemo) {
        ns.phase = 'intro';
      } else {
        ns.phase = 'intro';
      }
      break;
    case 'intro':
      ns.phase = 'story';
      ns.round = 1;
      ns.roundStartedAt = Date.now();
      ns.roundDurationSec = s.isDemo ? 3600 : 600;
      if (s.isDemo) {
        // Демо: сразу раскрываем все улики главы 1
        sc.clues.forEach((c, i) => {
          if (c.round === 1) ns.revealedClues.push(i);
        });
      }
      break;
    case 'story':
      if (s.isDemo) {
        // Демо: сразу в голосование (без обсуждения)
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
            // ===== Штраф за пропуск голосования =====
      ns.teams.forEach(t => {
        if (!t.vote) {
          t.score -= 100;
          if (!t.roundScores) t.roundScores = [0, 0, 0, 0];
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
        if (!t.roundScores) t.roundScores = [0, 0, 0, 0];
        // Не затираем штраф за пропуск
        if (t.vote !== null) {
          t.roundScores[ns.round - 1] = roundScore;
        }
        result.perTeam.push({ teamId: t.id, vote: t.vote, correct });
      });

      ns.votingStartedAt = null;

      if (s.isDemo) {
        // Демо: сразу к таблице результатов (без разгадки и без end)
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
        ns.round = 4;
      }
      ns.lastResult = result;
      break;
    }
    case 'results':
      if (ns.round >= ns.totalRounds) {
        ns.phase = 'end';
        ns.finishedAt = Date.now();
      } else {
        // Раскрываем все улики прошлых раундов
        sc.clues.forEach((c, i) => {
          if (c.round <= ns.round && !ns.revealedClues.includes(i)) {
            ns.revealedClues.push(i);
          }
        });
        ns.phase = 'story';
        ns.round += 1;
        ns.roundStartedAt = Date.now();
        // Раунд 1 — 10 минут (из case 'intro'),
        // раунды 2-3 — 10 минут,
        // раунд 4 (финал) — 5 минут
        ns.roundDurationSec = ns.round >= ns.totalRounds ? 300 : 600;
      }
      break;
    case 'end':
      // По кнопке «Итоги расследования» ведущий переходит на финальный экран
      ns.phase = 'results-final';
      break;
    default:
      break;
    case 'results-final':
      // финальный экран — уже никуда не идём
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
    case 'story':
      if (ns.round > 1) {
        ns.phase = 'results';
        ns.round -= 1;
        const sc = scenarioOf(ns);
        ns.revealedClues = ns.revealedClues.filter(i => sc.clues[i].round <= ns.round);
      } else {
        ns.phase = 'intro';
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
  return createInitialState(s.code, s.scenarioId, s.isDemo);
}

export function publicState(s: GameState, opts: { revealSolution: boolean }) {
  const sc = scenarioOf(s);
  const chapterIndex = s.round >= 1 && s.round <= sc.chapters.length ? s.round - 1 : -1;
  const chapter = chapterIndex >= 0 ? sc.chapters[chapterIndex] : null;

  const base: any = {
    code: s.code,
    phase: s.phase,
    isDemo: s.isDemo,
    round: s.round,
    totalRounds: s.totalRounds,
    teams: s.teams,
    roundStartedAt: s.roundStartedAt,
    roundDurationSec: s.roundDurationSec,
    roundPausedAt: s.roundPausedAt,
    roundPausedTotalMs: s.roundPausedTotalMs,
    votingStartedAt: s.votingStartedAt,
    votingDurationSec: 60,
    clueTimesSec: CLUE_TIMES_SEC,
    eliminatedSuspects: s.eliminatedSuspects,
    lastResult: s.lastResult,
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