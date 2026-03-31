<script lang="ts">
  import { gameStore } from '../../stores/game.svelte';
  import { calcAverage, calcMedian, calcDistribution, hasConsensus } from '../../utils/stats';
  import { BarChart3, Trophy } from 'lucide-svelte';

  const average = $derived(calcAverage(gameStore.votes));
  const median = $derived(calcMedian(gameStore.votes));
  const distribution = $derived(calcDistribution(gameStore.votes));
  const consensus = $derived(hasConsensus(gameStore.votes));

  const maxCount = $derived(Math.max(...distribution.values(), 1));
</script>

{#if gameStore.phase === 'revealed' && gameStore.votes.length > 0}
  <div class="vote-results">
    {#if consensus}
      <div class="consensus">
        <Trophy size={20} />
        <span>Consensus!</span>
      </div>
    {/if}

    <div class="stats">
      {#if average != null}
        <div class="stat">
          <span class="stat-label">Average</span>
          <span class="stat-value">{average.toFixed(1)}</span>
        </div>
      {/if}
      {#if median != null}
        <div class="stat">
          <span class="stat-label">Median</span>
          <span class="stat-value">{median}</span>
        </div>
      {/if}
    </div>

    <div class="distribution">
      <div class="dist-header">
        <BarChart3 size={16} />
        <span>Distribution</span>
      </div>
      <div class="bars">
        {#each [...distribution.entries()] as [value, count]}
          <div class="bar-group">
            <div class="bar-wrapper">
              <div
                class="bar"
                style:height="{(count / maxCount) * 100}%"
              ></div>
            </div>
            <span class="bar-label">{value}</span>
            <span class="bar-count">{count}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .vote-results {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
    background: var(--color-surface);
    border-radius: 12px;
    border: 1px solid var(--color-border);
  }

  .consensus {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: var(--color-success-light);
    border-radius: 8px;
    color: var(--color-success);
    font-weight: 700;
    font-size: 1rem;
  }

  .stats {
    display: flex;
    gap: 1.5rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-primary);
  }

  .distribution {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .dist-header {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .bars {
    display: flex;
    gap: 0.75rem;
    align-items: flex-end;
    height: 80px;
  }

  .bar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    flex: 1;
  }

  .bar-wrapper {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: flex-end;
  }

  .bar {
    width: 100%;
    min-height: 4px;
    background: var(--color-primary);
    border-radius: 4px 4px 0 0;
    transition: height 0.3s ease;
  }

  .bar-label {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .bar-count {
    font-size: 0.6875rem;
    color: var(--color-text-secondary);
  }
</style>
