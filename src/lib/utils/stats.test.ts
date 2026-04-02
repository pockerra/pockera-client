import { describe, it, expect } from 'vitest';
import { getNumericVotes, calcAverage, calcMedian, calcDistribution, hasConsensus } from './stats';
import type { Vote } from '../types/game';

function vote(playerId: string, value: string | number): Vote {
  return { playerId, value };
}

describe('getNumericVotes', () => {
  it('extracts numeric values', () => {
    const votes = [vote('a', 5), vote('b', 8), vote('c', 13)];
    expect(getNumericVotes(votes)).toEqual([5, 8, 13]);
  });

  it('parses string numbers', () => {
    const votes = [vote('a', '5'), vote('b', '13')];
    expect(getNumericVotes(votes)).toEqual([5, 13]);
  });

  it('filters out non-numeric values', () => {
    const votes = [vote('a', 5), vote('b', '?'), vote('c', '☕'), vote('d', 'XL')];
    expect(getNumericVotes(votes)).toEqual([5]);
  });

  it('returns empty array for no numeric votes', () => {
    const votes = [vote('a', '?'), vote('b', '☕')];
    expect(getNumericVotes(votes)).toEqual([]);
  });

  it('returns empty array for empty input', () => {
    expect(getNumericVotes([])).toEqual([]);
  });
});

describe('calcAverage', () => {
  it('calculates average of numeric votes', () => {
    const votes = [vote('a', 2), vote('b', 4), vote('c', 6)];
    expect(calcAverage(votes)).toBe(4);
  });

  it('returns null for empty votes', () => {
    expect(calcAverage([])).toBeNull();
  });

  it('returns null when no numeric votes exist', () => {
    expect(calcAverage([vote('a', '?')])).toBeNull();
  });

  it('ignores non-numeric votes in average', () => {
    const votes = [vote('a', 3), vote('b', '?'), vote('c', 9)];
    expect(calcAverage(votes)).toBe(6);
  });

  it('handles single vote', () => {
    expect(calcAverage([vote('a', 7)])).toBe(7);
  });
});

describe('calcMedian', () => {
  it('calculates median for odd count', () => {
    const votes = [vote('a', 1), vote('b', 3), vote('c', 5)];
    expect(calcMedian(votes)).toBe(3);
  });

  it('calculates median for even count', () => {
    const votes = [vote('a', 1), vote('b', 3), vote('c', 5), vote('d', 7)];
    expect(calcMedian(votes)).toBe(4);
  });

  it('sorts values before computing median', () => {
    const votes = [vote('a', 10), vote('b', 1), vote('c', 5)];
    expect(calcMedian(votes)).toBe(5);
  });

  it('returns null for empty votes', () => {
    expect(calcMedian([])).toBeNull();
  });

  it('returns null when no numeric votes', () => {
    expect(calcMedian([vote('a', '?')])).toBeNull();
  });

  it('handles single vote', () => {
    expect(calcMedian([vote('a', 42)])).toBe(42);
  });
});

describe('calcDistribution', () => {
  it('counts vote values', () => {
    const votes = [vote('a', 5), vote('b', 5), vote('c', 8)];
    const dist = calcDistribution(votes);
    expect(dist.get('5')).toBe(2);
    expect(dist.get('8')).toBe(1);
  });

  it('handles string values', () => {
    const votes = [vote('a', 'XL'), vote('b', 'XL'), vote('c', 'M')];
    const dist = calcDistribution(votes);
    expect(dist.get('XL')).toBe(2);
    expect(dist.get('M')).toBe(1);
  });

  it('handles mixed types', () => {
    const votes = [vote('a', 5), vote('b', '?'), vote('c', 5)];
    const dist = calcDistribution(votes);
    expect(dist.get('5')).toBe(2);
    expect(dist.get('?')).toBe(1);
  });

  it('returns empty map for empty votes', () => {
    expect(calcDistribution([]).size).toBe(0);
  });
});

describe('hasConsensus', () => {
  it('returns true when all votes are the same', () => {
    const votes = [vote('a', 5), vote('b', 5), vote('c', 5)];
    expect(hasConsensus(votes)).toBe(true);
  });

  it('returns false when votes differ', () => {
    const votes = [vote('a', 5), vote('b', 8)];
    expect(hasConsensus(votes)).toBe(false);
  });

  it('returns false for fewer than 2 votes', () => {
    expect(hasConsensus([])).toBe(false);
    expect(hasConsensus([vote('a', 5)])).toBe(false);
  });

  it("compares as strings (number 5 and string '5' are consensus)", () => {
    const votes = [vote('a', 5), vote('b', '5')];
    expect(hasConsensus(votes)).toBe(true);
  });

  it('handles string value consensus', () => {
    const votes = [vote('a', 'XL'), vote('b', 'XL')];
    expect(hasConsensus(votes)).toBe(true);
  });
});
