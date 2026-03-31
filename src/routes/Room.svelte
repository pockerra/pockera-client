<script lang="ts">
  import { push } from 'svelte-spa-router';
  import GameLayout from '../lib/components/layout/GameLayout.svelte';
  import CardDeck from '../lib/components/game/CardDeck.svelte';
  import PlayerList from '../lib/components/game/PlayerList.svelte';
  import VoteResults from '../lib/components/game/VoteResults.svelte';
  import StoryPanel from '../lib/components/game/StoryPanel.svelte';
  import InviteLink from '../lib/components/game/InviteLink.svelte';
  import Timer from '../lib/components/game/Timer.svelte';
  import Button from '../lib/components/ui/Button.svelte';
  import { gameStore } from '../lib/stores/game.svelte';
  import { roomStore } from '../lib/stores/room.svelte';
  import { userStore } from '../lib/stores/user.svelte';
  import { Eye, EyeOff, RotateCcw } from 'lucide-svelte';

  interface Props {
    params?: { id?: string };
  }

  let { params }: Props = $props();

  const roomId = $derived(params?.id ?? '');
  const isFacilitator = $derived(roomStore.room?.facilitatorId === userStore.id);

  // Redirect if no room loaded
  $effect(() => {
    if (!roomStore.room && roomId) {
      // In Phase 3 this would fetch from backend
      // For now redirect to home if no room state
      push('/');
    }
  });

  function handleVoteSelect(value: string | number) {
    gameStore.submitVote(userStore.id, value);
    roomStore.setPlayerVoted(userStore.id);
  }

  function revealVotes() {
    gameStore.phase = 'revealed';
    // Mock: reveal mock player votes
    if (!gameStore.votes.find((v) => v.playerId === 'mock-1')) {
      gameStore.submitVote('mock-1', 5);
    }
  }

  function resetVotes() {
    gameStore.resetVotes();
    roomStore.resetPlayerVotes();
  }
</script>

{#if roomStore.room}
  <GameLayout>
    {#snippet sidebar()}
      <div class="sidebar-content">
        <InviteLink roomId={roomId} />
        <PlayerList />
        {#if roomStore.settings.timerEnabled}
          <Timer duration={roomStore.settings.timerDuration} onexpire={revealVotes} />
        {/if}
      </div>
    {/snippet}

    <div class="room-content">
      {#if gameStore.currentStory}
        <div class="current-story-banner">
          <span class="story-label">Estimating</span>
          <h2 class="story-title">{gameStore.currentStory.title}</h2>
        </div>
      {/if}

      <div class="table-area">
        {#if gameStore.phase === 'revealed'}
          <VoteResults />
        {:else}
          <div class="table">
            <div class="table-surface">
              <span class="table-text">
                {#if gameStore.phase === 'waiting'}
                  Waiting for stories...
                {:else}
                  Pick your cards!
                {/if}
              </span>
            </div>
          </div>
        {/if}
      </div>

      {#if isFacilitator}
        <div class="facilitator-controls">
          {#if gameStore.phase === 'voting'}
            <Button variant="primary" onclick={revealVotes}>
              <Eye size={16} /> Reveal Votes
            </Button>
          {:else if gameStore.phase === 'revealed'}
            <Button variant="secondary" onclick={resetVotes}>
              <RotateCcw size={16} /> New Round
            </Button>
          {/if}
        </div>
      {/if}
    </div>

    {#snippet footer()}
      <CardDeck
        onselect={handleVoteSelect}
        disabled={gameStore.phase === 'revealed'}
      />
    {/snippet}
  </GameLayout>

  <!-- Story panel on the right side -->
  <aside class="story-sidebar">
    <StoryPanel />
  </aside>
{:else}
  <div class="loading">Loading room...</div>
{/if}

<style>
  .sidebar-content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .room-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
  }

  .current-story-banner {
    text-align: center;
  }

  .story-label {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-primary);
  }

  .story-title {
    margin: 0.25rem 0 0;
    font-size: 1.375rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .table-area {
    width: 100%;
    max-width: 500px;
  }

  .table {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .table-surface {
    width: 100%;
    aspect-ratio: 2 / 1;
    background: var(--color-primary-light);
    border: 2px solid var(--color-primary);
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .table-text {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-primary);
  }

  .facilitator-controls {
    display: flex;
    gap: 0.5rem;
  }

  .story-sidebar {
    position: fixed;
    right: 0;
    top: 53px;
    bottom: 0;
    width: 280px;
    padding: 1.25rem;
    border-left: 1px solid var(--color-border);
    background: var(--color-surface);
    overflow-y: auto;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--color-text-secondary);
    font-size: 1rem;
  }

  @media (max-width: 1024px) {
    .story-sidebar {
      display: none;
    }
  }
</style>
