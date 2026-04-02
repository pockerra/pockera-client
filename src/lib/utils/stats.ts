import type { Vote } from "../types/game";

export function getNumericVotes(votes: Vote[]): number[] {
  return votes
    .map((v) => (typeof v.value === "number" ? v.value : parseFloat(String(v.value))))
    .filter((n) => !isNaN(n));
}

export function calcAverage(votes: Vote[]): number | null {
  const nums = getNumericVotes(votes);
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function calcMedian(votes: Vote[]): number | null {
  const nums = getNumericVotes(votes).sort((a, b) => a - b);
  if (nums.length === 0) return null;
  const mid = Math.floor(nums.length / 2);
  return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

export function calcDistribution(votes: Vote[]): Map<string, number> {
  const dist = new Map<string, number>();
  for (const v of votes) {
    const key = String(v.value);
    dist.set(key, (dist.get(key) ?? 0) + 1);
  }
  return dist;
}

export function hasConsensus(votes: Vote[]): boolean {
  if (votes.length < 2) return false;
  const values = votes.map((v) => String(v.value));
  return new Set(values).size === 1;
}
