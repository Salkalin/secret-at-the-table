import { SCENARIOS, Scenario } from './scenarios.js';

export type Phase = 'lobby' | 'intro' | 'story' | 'clues' | 'discussion' | 'voting' | 'results' | 'end';

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
  clearedSuspects: string[];
  roundStartedAt: number | null;
  roundDurationSec: number;
  lastResult: any | null;
  finishedAt: number | null;
};

export const ROUND_SECONDS = 600;

export function createInitialState(code: string, scenarioId: string): GameState {
  return {
    code,
    scenarioId,
    phase: 'lobby',
    round: 0,
    totalRounds: 3,
    revealedClues: [],
    teams: [],
    clearedSuspects: [],
    roundStartedAt: null,
    roundDurationSec: ROUND_SECONDS,
    lastResult: null,
    finishedAt: null
  };
}

export const scenarioOf = (s: GameState): Scenario =>
  SCENARIOS.find(x => x.id === s.scenarioId) || SCENARIOS[0];

export function generateCode(): string {
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 4 }, () => abc[Math.floor(Math.random() * abc.length)]).join('');
}

export function nextPhase(s: GameState): GameState {
  const sc = scenarioOf(s);
  const ns: GameState = { ...s, teams: s.teams.map(t => ({ ...t })) };
  switch (s.phase) {
    case 'lobby':
      ns.phase = 'intro';
      break;
    case 'intro':
      ns.phase = 'story';
      ns.round = 1;
      break;
    case 'story':
      ns.phase = 'clues';
      sc.clues.forEach((c, i) => {
        if (c.round === ns.round && !ns.revealedClues.includes(i)) ns.revealedClues.push(i);
      });
      break;
    case 'clues':
      ns.phase = 'discussion';
      ns.roundStartedAt = Date.now();
      break;
    case 'discussion':
      ns.phase = 'voting';
      ns.teams.forEach(t => (t.vote = null));
      break;
    case 'voting': {
      const killer = sc.suspects.find(x => x.isGuilty)!;
      const result: any = {
        round: ns.round,
        perTeam: [],
        correctTeamIds: [] as string[],
        wrongTeamIds: [] as string[]
      };
      ns.teams.forEach(t => {
        const correct = t.vote === killer.id;
        if (correct) { t.score += 500; result.correctTeamIds.push(t.id); }
        else if (t.vote) { t.score -= 200; result.wrongTeamIds.push(t.id); }
        result.perTeam.push({ teamId: t.id, vote: t.vote, correct });
      });
      ns.lastResult = result;
      ns.phase = 'results';
      break;
    }
    case 'results':
      if (ns.round >= ns.totalRounds) { ns.phase = 'end'; ns.finishedAt = Date.now(); }
      else { ns.phase = 'story'; ns.round += 1; ns.roundStartedAt = null; }
      break;
    case 'end':
    default:
      break;
  }
  return ns;
}

export function prevPhase(s: GameState): GameState {
  const ns: GameState = { ...s, teams: s.teams.map(t => ({ ...t })) };
  const sc = scenarioOf(ns);
  switch (s.phase) {
    case 'intro':
      ns.phase = 'lobby';
      break;
    case 'story':
      if (ns.round > 1) {
        ns.phase = 'results';
        ns.round -= 1;
        ns.revealedClues = ns.revealedClues.filter(i => sc.clues[i].round <= ns.round);
      } else {
        ns.phase = 'intro';
      }
      break;
    case 'clues':
      ns.revealedClues = ns.revealedClues.filter(i => sc.clues[i].round < ns.round);
      ns.phase = 'story';
      break;
    case 'discussion':
      ns.phase = 'clues';
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

export function publicState(s: GameState, opts: { revealSolution: boolean }) {
  const sc = scenarioOf(s);
  const base: any = {
    code: s.code,
    phase: s.phase,
    round: s.round,
    totalRounds: s.totalRounds,
    teams: s.teams,
    roundStartedAt: s.roundStartedAt,
    roundDurationSec: s.roundDurationSec,
    clearedSuspects: s.clearedSuspects,
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
    chapter: sc.chapters.find(c => c.round === s.round) || null,
    clues: s.revealedClues.map(i => sc.clues[i])
  };
  if (opts.revealSolution) {
    base.solution = sc.solution;
    base.fullSuspects = sc.suspects;
  }
  return base;
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
