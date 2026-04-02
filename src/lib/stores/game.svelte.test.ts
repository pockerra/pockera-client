import { describe, it, expect, beforeEach } from 'vitest';
import { gameStore } from './game.svelte';

beforeEach(() => {
  gameStore.phase = 'waiting';
  gameStore.votes = [];
  gameStore.stories = [];
  gameStore.currentStoryId = null;
  gameStore.deckType = 'fibonacci';
  gameStore.selectedCard = null;
});

describe('gameStore initial state', () => {
  it('starts in waiting phase', () => {
    expect(gameStore.phase).toBe('waiting');
  });

  it('starts with empty votes', () => {
    expect(gameStore.votes).toEqual([]);
  });

  it('starts with empty stories', () => {
    expect(gameStore.stories).toEqual([]);
  });

  it('starts with no current story', () => {
    expect(gameStore.currentStoryId).toBeNull();
    expect(gameStore.currentStory).toBeNull();
  });

  it('defaults to fibonacci deck', () => {
    expect(gameStore.deckType).toBe('fibonacci');
  });

  it('starts with no selected card', () => {
    expect(gameStore.selectedCard).toBeNull();
  });
});

describe('gameStore.deck (derived)', () => {
  it('returns fibonacci deck values by default', () => {
    expect(gameStore.deck).toContain(1);
    expect(gameStore.deck).toContain(13);
    expect(gameStore.deck).toContain('?');
  });

  it('returns tshirt values when deck type changes', () => {
    gameStore.deckType = 'tshirt';
    expect(gameStore.deck).toContain('XS');
    expect(gameStore.deck).toContain('XL');
  });

  it('returns empty for custom deck', () => {
    gameStore.deckType = 'custom';
    expect(gameStore.deck).toEqual([]);
  });
});

describe('gameStore.submitVote', () => {
  it('adds a vote', () => {
    gameStore.submitVote('p1', 5);
    expect(gameStore.votes).toEqual([{ playerId: 'p1', value: 5 }]);
  });

  it('replaces existing vote from same player', () => {
    gameStore.submitVote('p1', 5);
    gameStore.submitVote('p1', 8);
    expect(gameStore.votes).toEqual([{ playerId: 'p1', value: 8 }]);
  });

  it('keeps votes from different players', () => {
    gameStore.submitVote('p1', 5);
    gameStore.submitVote('p2', 8);
    expect(gameStore.votes).toHaveLength(2);
  });
});

describe('gameStore.resetVotes', () => {
  it('clears votes and selected card, sets phase to voting', () => {
    gameStore.votes = [{ playerId: 'p1', value: 5 }];
    gameStore.selectedCard = 5;
    gameStore.phase = 'revealed';

    gameStore.resetVotes();

    expect(gameStore.votes).toEqual([]);
    expect(gameStore.selectedCard).toBeNull();
    expect(gameStore.phase).toBe('voting');
  });
});

describe('gameStore story management', () => {
  const story1 = { id: 's1', title: 'Story 1' };
  const story2 = { id: 's2', title: 'Story 2' };

  it('addStory appends to list', () => {
    gameStore.addStory(story1);
    gameStore.addStory(story2);
    expect(gameStore.stories).toEqual([story1, story2]);
  });

  it('removeStory removes by id', () => {
    gameStore.stories = [story1, story2];
    gameStore.removeStory('s1');
    expect(gameStore.stories).toEqual([story2]);
  });

  it('removeStory clears currentStoryId if removed story was current', () => {
    gameStore.stories = [story1, story2];
    gameStore.currentStoryId = 's1';
    gameStore.removeStory('s1');
    expect(gameStore.currentStoryId).toBeNull();
  });

  it('removeStory does not clear currentStoryId for other stories', () => {
    gameStore.stories = [story1, story2];
    gameStore.currentStoryId = 's2';
    gameStore.removeStory('s1');
    expect(gameStore.currentStoryId).toBe('s2');
  });

  it('updateStoryEstimate sets estimate on matching story', () => {
    gameStore.stories = [story1, story2];
    gameStore.updateStoryEstimate('s1', '8');
    expect(gameStore.stories[0].estimate).toBe('8');
    expect(gameStore.stories[1].estimate).toBeUndefined();
  });

  it('currentStory returns the story matching currentStoryId', () => {
    gameStore.stories = [story1, story2];
    gameStore.currentStoryId = 's2';
    expect(gameStore.currentStory).toEqual(story2);
  });

  it('currentStory returns null when no matching story', () => {
    gameStore.stories = [story1];
    gameStore.currentStoryId = 'nonexistent';
    expect(gameStore.currentStory).toBeNull();
  });
});
