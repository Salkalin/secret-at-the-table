import { SCENARIOS, Scenario } from './scenarios.js';

export type Phase = 'lobby' | 'intro' | 'story' | 'discussion' | 'voting' | 'results' | 'end';

export type TeamState = {
  id: string;
  name: string;
  score: number;
  captainId: string | null;
  vote: string | null;
};

export type GameState = {
  code: string;
  scenarioId: string;
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
};

export const ROUND_SECONDS = 600;
export const CLUE_TIMES_SEC = [180, 300, 420, 540];
export const TOTAL_ROUNDS = 4;

export function createInitialState(code: string, scenarioId: string): GameState {
  return {
    code,
    scenarioId,
    phase: 'lobby',
    round: 0,
    totalRounds: TOTAL_ROUNDS,
    revealedClues: [],
    teams: [],
    eliminatedSuspects: [],
    lastResult: null,
    roundStartedAt: null,
    roundDurationSec: ROUND_SECONDS,
    finishedAt: null
  };
}

export const scenarioOf = (s: GameState): Scenario =>
  SCENARIOS.find(x => x.id === s.scenarioId) || SCENARIOS[0];

export function generateCode(): string {
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 4 }, () => abc[Math.floor(Math.random() * abc.length)]).join('');
}

function pickElimination(s: GameState): string | null {
  const sc = scenarioOf(s);
  const killerId = sc.suspects.find(x => x.isGuilty)?.id;
  const alive = sc.suspects.filter(x => !s.eliminatedSuspects.includes(x.id));
  const nonKiller = alive.filter(x => x.id !== killerId);
  if (nonKiller.length <= 1) return null;

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
      ns.phase = 'intro';
      break;
    case 'intro':
      ns.phase = 'story';
      ns.round = 1;
      ns.roundStartedAt = Date.now();
      break;
    case 'story':
      ns.phase = 'discussion';
      ns.roundStartedAt = Date.now();
      break;
    case 'discussion':
      ns.phase = 'voting';
      ns.teams.forEach(t => (t.vote = null));
      break;
    case 'voting': {
      const result: any = {
        round: ns.round,
        perTeam: [],
        correctTeamIds: [] as string[],
        wrongTeamIds: [] as string[],
        eliminatedId: null as string | null
      };
      const killer = sc.suspects.find(x => x.isGuilty)!;
      ns.teams.forEach(t => {
        const correct = t.vote === killer.id;
        if (correct) {
          t.score += 500;
          result.correctTeamIds.push(t.id);
        } else if (t.vote) {
          t.score -= 200;
          result.wrongTeamIds.push(t.id);
        }
        result.perTeam.push({ teamId: t.id, vote: t.vote, correct });
      });

      if (ns.round < ns.totalRounds) {
        const elimId = pickElimination(ns);
        if (elimId) {
          ns.eliminatedSuspects.push(elimId);
          result.eliminatedId = elimId;
        }
      }
      ns.lastResult = result;
      ns.phase = 'results';
      break;
    }
    case 'results':
      if (ns.round >= ns.totalRounds) {
        ns.phase = 'end';
        ns.finishedAt = Date.now();
      } else {
        ns.phase = 'story';
        ns.round += 1;
        ns.roundStartedAt = Date.now();
      }
      break;
    case 'end':
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
  return {
    ...createInitialState(s.code, s.scenarioId),
    teams: s.teams.map(t => ({
      id: t.id,
      name: t.name,
      score: 0,
      captainId: t.captainId,
      vote: null
    }))
  };
}

export function publicState(s: GameState, opts: { revealSolution: boolean }) {
  const sc = scenarioOf(s);
  const chapterIndex = s.round >= 1 && s.round <= sc.chapters.length ? s.round - 1 : -1;
  const chapter = chapterIndex >= 0 ? sc.chapters[chapterIndex] : null;

  const base: any = {
    code: s.code,
    phase: s.phase,
    round: s.round,
    totalRounds: s.totalRounds,
    teams: s.teams,
    roundStartedAt: s.roundStartedAt,
    roundDurationSec: s.roundDurationSec,
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
      suspects: sc.suspects.map(({ secret, ...rest }) => rest)
    },
    chapter,
    clues: s.revealedClues.map(i => sc.clues[i])
  };
  if (opts.revealSolution) {
    base.solution = sc.solution;
    base.fullSuspects = sc.suspects;
  }
  return base;
}

export function revealClue(s: GameState, clueIndex: number): GameState {
  if (s.revealedClues.includes(clueIndex)) return s;
  return { ...s, revealedClues: [...s.revealedClues, clueIndex] };
}