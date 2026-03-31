<script lang="ts">
  import Button from '../lib/components/ui/Button.svelte';
  import { push } from 'svelte-spa-router';
  import { AlertCircle } from 'lucide-svelte';
</script>

<div class="not-found">
  <AlertCircle size={48} />
  <h1>404</h1>
  <p>Page not found</p>
  <Button onclick={() => push('/')}>Go Home</Button>
</div>

<style>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: 0.75rem;
    padding: 2rem;
    color: var(--color-text-secondary);
  }

  h1 {
    font-size: 4rem;
    font-weight: 900;
    margin: 0;
    color: var(--color-text);
  }

  p {
    font-size: 1.125rem;
    margin: 0;
  }
</style>
