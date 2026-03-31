<script lang="ts">
  interface Props {
    value: string | number;
    selected?: boolean;
    revealed?: boolean;
    faceDown?: boolean;
    onclick?: () => void;
  }

  let { value, selected = false, revealed = false, faceDown = false, onclick }: Props = $props();
</script>

<button
  class="poker-card"
  class:selected
  class:revealed
  class:face-down={faceDown}
  {onclick}
>
  <div class="card-inner">
    <div class="card-front">
      <span class="card-value">{value}</span>
    </div>
    <div class="card-back">
      <div class="card-pattern"></div>
    </div>
  </div>
</button>

<style>
  .poker-card {
    perspective: 600px;
    width: 64px;
    height: 88px;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    transition: transform 0.15s ease;
  }

  .poker-card:hover {
    transform: translateY(-4px);
  }

  .poker-card.selected {
    transform: translateY(-8px);
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;
    transform-style: preserve-3d;
  }

  .poker-card.face-down .card-inner {
    transform: rotateY(180deg);
  }

  .poker-card.revealed .card-inner {
    transform: rotateY(0deg);
  }

  .card-front,
  .card-back {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-front {
    background: var(--color-surface);
    border: 2px solid var(--color-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .poker-card.selected .card-front {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
    box-shadow: 0 4px 12px var(--color-primary-ring);
  }

  .card-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .poker-card.selected .card-value {
    color: var(--color-primary);
  }

  .card-back {
    background: var(--color-primary);
    transform: rotateY(180deg);
    overflow: hidden;
  }

  .card-pattern {
    width: 80%;
    height: 80%;
    border-radius: 6px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      rgba(255, 255, 255, 0.08) 4px,
      rgba(255, 255, 255, 0.08) 8px
    );
  }
</style>
