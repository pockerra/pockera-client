<script lang="ts">
  import { push } from 'svelte-spa-router';
  import DisplayNameForm from '../lib/components/auth/DisplayNameForm.svelte';
  import { userStore } from '../lib/stores/user.svelte';
  import { roomStore } from '../lib/stores/room.svelte';
  import { socketStore } from '../lib/stores/socket.svelte';

  interface Props {
    params?: { id?: string };
  }

  let { params }: Props = $props();
  const roomId = $derived(params?.id ?? '');

  function handleJoin(name: string) {
    userStore.name = name;

    socketStore.connect();

    const checkConnection = setInterval(() => {
      if (socketStore.connected) {
        clearInterval(checkConnection);
        socketStore.emit('room:join', {
          roomId,
          displayName: userStore.name,
          role: 'participant',
        });

        const checkRoom = setInterval(() => {
          if (roomStore.room) {
            clearInterval(checkRoom);
            push(`/room/${roomId}`);
          }
        }, 50);
      }
    }, 50);
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
