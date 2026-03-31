<script lang="ts">
  import { Clock, Play, Square } from 'lucide-svelte';
  import Button from '../ui/Button.svelte';

  interface Props {
    duration?: number;
    onexpire?: () => void;
  }

  let { duration = 60, onexpire }: Props = $props();

  let remaining = $state(0);
  $effect(() => { remaining = duration; });
  let running = $state(false);
  let interval: ReturnType<typeof setInterval> | null = null;

  const minutes = $derived(Math.floor(remaining / 60));
  const seconds = $derived(remaining % 60);
  const display = $derived(`${minutes}:${String(seconds).padStart(2, '0')}`);
  const progress = $derived(remaining / duration);

  function start() {
    if (running) return;
    running = true;
    interval = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        stop();
        onexpire?.();
      }
    }, 1000);
  }

  function stop() {
    running = false;
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    stop();
    remaining = duration;
  }
</script>

<div class="timer">
  <div class="timer-display" class:warning={remaining <= 10 && running}>
    <Clock size={16} />
    <span class="timer-value">{display}</span>
  </div>

  <div class="timer-progress">
    <div class="timer-bar" style:width="{progress * 100}%"></div>
  </div>

  <div class="timer-controls">
    {#if !running}
      <Button size="sm" variant="secondary" onclick={start}>
        <Play size={14} /> Start
      </Button>
    {:else}
      <Button size="sm" variant="danger" onclick={stop}>
        <Square size={14} /> Stop
      </Button>
    {/if}
    <Button size="sm" variant="ghost" onclick={reset}>Reset</Button>
  </div>
</div>

<style>
  .timer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 10px;
  }

  .timer-display {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: var(--color-text);
  }

  .timer-display.warning {
    color: var(--color-danger);
    animation: pulse 1s ease infinite;
  }

  .timer-value {
    font-size: 1.5rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .timer-progress {
    height: 3px;
    background: var(--color-border);
    border-radius: 2px;
    overflow: hidden;
  }

  .timer-bar {
    height: 100%;
    background: var(--color-primary);
    border-radius: 2px;
    transition: width 1s linear;
  }

  .timer-controls {
    display: flex;
    gap: 0.375rem;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
</style>
