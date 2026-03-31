<script lang="ts">
  import PlayerCard from './PlayerCard.svelte';
  import { roomStore } from '../../stores/room.svelte';
  import { gameStore } from '../../stores/game.svelte';
  import { Users } from 'lucide-svelte';

  const votedCount = $derived(roomStore.players.filter((p) => p.hasVoted).length);
  const participantCount = $derived(roomStore.players.filter((p) => p.role !== 'spectator').length);

  function getVote(playerId: string) {
    const vote = gameStore.votes.find((v) => v.playerId === playerId);
    return vote?.value ?? null;
  }
</script>

<div class="player-list">
  <div class="player-list-header">
    <div class="player-count">
      <Users size={16} />
      <span>{roomStore.players.length} Players</span>
    </div>
    {#if gameStore.phase === 'voting'}
      <span class="vote-count">{votedCount}/{participantCount} voted</span>
    {/if}
  </div>

  <div class="players">
    {#each roomStore.players as player (player.id)}
      <PlayerCard
        {player}
        showVote={gameStore.phase === 'revealed'}
        vote={getVote(player.id)}
      />
    {/each}
  </div>
</div>

<style>
  .player-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .player-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.25rem;
  }

  .player-count {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .vote-count {
    font-size: 0.8125rem;
    color: var(--color-primary);
    font-weight: 600;
  }

  .players {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
