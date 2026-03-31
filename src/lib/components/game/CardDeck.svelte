<script lang="ts">
  import PokerCard from './PokerCard.svelte';
  import { gameStore } from '../../stores/game.svelte';

  interface Props {
    onselect?: (value: string | number) => void;
    disabled?: boolean;
  }

  let { onselect, disabled = false }: Props = $props();

  function handleSelect(value: string | number) {
    if (disabled) return;
    if (gameStore.selectedCard === value) {
      gameStore.selectedCard = null;
    } else {
      gameStore.selectedCard = value;
    }
    onselect?.(value);
  }
</script>

<div class="card-deck" class:disabled>
  {#each gameStore.deck as value}
    <PokerCard
      {value}
      selected={gameStore.selectedCard === value}
      onclick={() => handleSelect(value)}
    />
  {/each}
</div>

<style>
  .card-deck {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1rem;
  }

  .card-deck.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
