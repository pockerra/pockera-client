<script lang="ts">
  import type { Player } from '../../types/room';
  import Avatar from '../ui/Avatar.svelte';
  import { Check, Eye, Crown } from 'lucide-svelte';

  interface Props {
    player: Player;
    showVote?: boolean;
    vote?: string | number | null;
  }

  let { player, showVote = false, vote = null }: Props = $props();
</script>

<div class="player-card" class:voted={player.hasVoted} class:spectator={player.role === 'spectator'}>
  <div class="player-avatar">
    <Avatar name={player.name} size="md" />
    {#if player.hasVoted && !showVote}
      <div class="vote-indicator">
        <Check size={12} />
      </div>
    {/if}
  </div>

  <div class="player-info">
    <div class="player-name">
      {#if player.role === 'facilitator'}
        <Crown size={14} />
      {/if}
      {#if player.role === 'spectator'}
        <Eye size={14} />
      {/if}
      <span>{player.name}</span>
    </div>
    {#if showVote && vote != null}
      <div class="player-vote">{vote}</div>
    {/if}
  </div>
</div>

<style>
  .player-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.875rem;
    border-radius: 10px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    transition: all 0.2s ease;
  }

  .player-card.voted {
    border-color: var(--color-success);
    background: var(--color-success-light);
  }

  .player-card.spectator {
    opacity: 0.7;
  }

  .player-avatar {
    position: relative;
  }

  .vote-indicator {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--color-success);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--color-surface);
  }

  .player-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
  }

  .player-name {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .player-name span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .player-vote {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-primary);
  }
</style>
