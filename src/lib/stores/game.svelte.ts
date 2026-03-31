import type { GamePhase, Vote, Story, DeckType } from '../types/game';
import { getDeck } from '../utils/decks';

function createGameStore() {
  let phase = $state<GamePhase>('waiting');
  let votes = $state<Vote[]>([]);
  let stories = $state<Story[]>([]);
  let currentStoryId = $state<string | null>(null);
  let deckType = $state<DeckType>('fibonacci');
  let selectedCard = $state<string | number | null>(null);

  const deck = $derived(getDeck(deckType));
  const currentStory = $derived(stories.find((s) => s.id === currentStoryId) ?? null);

  return {
    get phase() { return phase; },
    set phase(v: GamePhase) { phase = v; },
    get votes() { return votes; },
    set votes(v: Vote[]) { votes = v; },
    get stories() { return stories; },
    set stories(v: Story[]) { stories = v; },
    get currentStoryId() { return currentStoryId; },
    set currentStoryId(v: string | null) { currentStoryId = v; },
    get deckType() { return deckType; },
    set deckType(v: DeckType) { deckType = v; },
    get selectedCard() { return selectedCard; },
    set selectedCard(v: string | number | null) { selectedCard = v; },
    get deck() { return deck; },
    get currentStory() { return currentStory; },

    submitVote(playerId: string, value: string | number) {
      votes = [...votes.filter((v) => v.playerId !== playerId), { playerId, value }];
    },
    resetVotes() {
      votes = [];
      selectedCard = null;
      phase = 'voting';
    },
    addStory(story: Story) {
      stories = [...stories, story];
    },
    removeStory(storyId: string) {
      stories = stories.filter((s) => s.id !== storyId);
      if (currentStoryId === storyId) currentStoryId = null;
    },
    updateStoryEstimate(storyId: string, estimate: string) {
      stories = stories.map((s) => (s.id === storyId ? { ...s, estimate } : s));
    },
  };
}

export const gameStore = createGameStore();
