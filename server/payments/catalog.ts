export const SCENARIO_PRICES: Record<string, number> = {};

export const getScenarioPrice = (scenarioId: string): number => SCENARIO_PRICES[scenarioId] ?? 0;

export const TOPUP_MIN = 100_00;
export const TOPUP_MAX = 100_000_00;
