<script lang="ts">
  import { push } from 'svelte-spa-router';
  import DisplayNameForm from '../lib/components/auth/DisplayNameForm.svelte';
  import { userStore } from '../lib/stores/user.svelte';
  import { roomStore } from '../lib/stores/room.svelte';
  import { gameStore } from '../lib/stores/game.svelte';
  import { DECKS } from '../lib/utils/decks';

  interface Props {
    params?: { id?: string };
  }

  let { params }: Props = $props();
  const roomId = $derived(params?.id ?? '');

  function handleJoin(name: string) {
    userStore.name = name;

    // Mock: create room state as if joining (Phase 2)
    roomStore.room = {
      id: roomId,
      deckType: 'fibonacci',
      deck: DECKS.fibonacci.values,
      facilitatorId: 'host-id',
      phase: 'voting',
      settings: {
        timerEnabled: false,
        timerDuration: 60,
        autoReveal: false,
        allowSpectators: true,
      },
    };

    gameStore.deckType = 'fibonacci';
    gameStore.phase = 'voting';

    roomStore.players = [
      { id: 'host-id', name: 'Host', role: 'facilitator', hasVoted: false },
      { id: userStore.id, name: userStore.name, role: 'participant', hasVoted: false },
    ];

    push(`/room/${roomId}`);
  }
</script>

<div class="join-page">
  <div class="join-card">
    <p class="join-info">You've been invited to room <strong>{roomId}</strong></p>
    <DisplayNameForm
      onsubmit={handleJoin}
      initialName={userStore.name}
    />
  </div>
</div>

<style>
  .join-page {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 2rem;
  }

  .join-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    max-width: 420px;
    width: 100%;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }

  .join-info {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin: 0 0 0.5rem;
  }

  .join-info strong {
    color: var(--color-primary);
    font-family: monospace;
  }
</style>
