<script lang="ts">
  import { push } from 'svelte-spa-router';
  import Button from '../lib/components/ui/Button.svelte';
  import Input from '../lib/components/ui/Input.svelte';
  import Switch from '../lib/components/ui/Switch.svelte';
  import Modal from '../lib/components/ui/Modal.svelte';
  import { userStore } from '../lib/stores/user.svelte';
  import { socketStore } from '../lib/stores/socket.svelte';
  import { roomStore } from '../lib/stores/room.svelte';
  import { DECKS } from '../lib/utils/decks';
  import type { DeckType } from '../lib/types/game';
  import type { RoomSettings } from '../lib/types/room';
  import { Users, Zap, Shield, ArrowRight } from 'lucide-svelte';

  let showCreateModal = $state(false);
  let playerName = $state(userStore.name);
  let selectedDeck = $state<DeckType>('fibonacci');
  let settings = $state<RoomSettings>({
    timerEnabled: false,
    timerDuration: 60,
    autoReveal: false,
    allowSpectators: true,
  });

  const deckOptions = Object.entries(DECKS).filter(([key]) => key !== 'custom') as [DeckType, { label: string; values: (string | number)[] }][];

  function createRoom() {
    if (!playerName.trim()) return;

    userStore.name = playerName.trim();

    // Connect to backend and create room via WebSocket
    socketStore.connect();

    // Wait for connection, then emit room:create
    const checkConnection = setInterval(() => {
      if (socketStore.connected) {
        clearInterval(checkConnection);
        socketStore.emit('room:create', {
          deckType: selectedDeck,
          settings,
          displayName: userStore.name,
        });

        // Listen for room:state to get the room ID and navigate
        // The socket store already handles room:state events
        // We just need to wait for roomStore.room to be set
        const checkRoom = setInterval(() => {
          if (roomStore.room) {
            clearInterval(checkRoom);
            push(`/room/${roomStore.room.id}`);
          }
        }, 50);
      }
    }, 50);
  }
</script>

<div class="home">
  <section class="hero">
    <div class="hero-icon">
      <img src="/Logo.svg" alt="Pockerra" width="48" height="48" />
    </div>
    <h1>Pockerra</h1>
    <p class="hero-subtitle">Fast, real-time planning poker for agile teams</p>

    <div class="hero-actions">
      <Button size="lg" onclick={() => (showCreateModal = true)}>
        Create Room <ArrowRight size={18} />
      </Button>
    </div>
  </section>

  <section class="features">
    <div class="feature">
      <div class="feature-icon"><Users size={24} /></div>
      <h3>Real-time</h3>
      <p>Everyone votes simultaneously. See results instantly.</p>
    </div>
    <div class="feature">
      <div class="feature-icon"><Zap size={24} /></div>
      <h3>Fast</h3>
      <p>No signup required. Create a room and share the link.</p>
    </div>
    <div class="feature">
      <div class="feature-icon"><Shield size={24} /></div>
      <h3>Private</h3>
      <p>Votes are hidden until everyone is ready to reveal.</p>
    </div>
  </section>
</div>

<Modal bind:open={showCreateModal} title="Create a Room">
  <div class="create-form">
    <Input
      bind:value={playerName}
      label="Your Name"
      placeholder="Enter your display name"
    />

    <div class="deck-selector">
      <span class="field-label">Deck Type</span>
      <div class="deck-options">
        {#each deckOptions as [key, deck]}
          <button
            class="deck-option"
            class:selected={selectedDeck === key}
            onclick={() => (selectedDeck = key)}
          >
            <span class="deck-name">{deck.label}</span>
            <span class="deck-preview">
              {deck.values.slice(0, 5).join(', ')}...
            </span>
          </button>
        {/each}
      </div>
    </div>

    <div class="settings">
      <span class="field-label">Settings</span>
      <Switch bind:checked={settings.timerEnabled} label="Enable Timer" />
      <Switch bind:checked={settings.autoReveal} label="Auto-reveal when all voted" />
      <Switch bind:checked={settings.allowSpectators} label="Allow Spectators" />
    </div>

    <Button onclick={createRoom} disabled={!playerName.trim()}>
      Create Room
    </Button>
  </div>
</Modal>

<style>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 1.5rem;
    gap: 4rem;
  }

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
    max-width: 560px;
  }

  .hero-icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: var(--color-primary-light);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero h1 {
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: -0.03em;
    margin: 0;
    color: var(--color-text);
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--color-text-secondary);
    margin: 0;
    line-height: 1.5;
  }

  .hero-actions {
    margin-top: 0.5rem;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    max-width: 720px;
    width: 100%;
  }

  .feature {
    text-align: center;
    padding: 1.5rem;
    border-radius: 12px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
  }

  .feature-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: var(--color-primary-light);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.75rem;
  }

  .feature h3 {
    margin: 0 0 0.375rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .feature p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
  }

  /* Create form */
  .create-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .field-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    display: block;
    margin-bottom: 0.375rem;
  }

  .deck-options {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .deck-option {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-surface);
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: all 0.15s ease;
  }

  .deck-option:hover {
    background: var(--color-surface-hover);
  }

  .deck-option.selected {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
  }

  .deck-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .deck-preview {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    margin-top: 0.125rem;
  }

  .settings {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .create-form :global(.btn) {
    width: 100%;
  }
</style>
