<script lang="ts">
  import { gameStore } from '../../stores/game.svelte';
  import StoryItem from './StoryItem.svelte';
  import Button from '../ui/Button.svelte';
  import Input from '../ui/Input.svelte';
  import { Plus, BookOpen } from 'lucide-svelte';

  let newStoryTitle = $state('');

  function addStory() {
    if (!newStoryTitle.trim()) return;
    gameStore.addStory({
      id: crypto.randomUUID(),
      title: newStoryTitle.trim(),
    });
    newStoryTitle = '';
  }

  function selectStory(storyId: string) {
    gameStore.currentStoryId = storyId;
  }

  function deleteStory(storyId: string) {
    gameStore.removeStory(storyId);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') addStory();
  }
</script>

<div class="story-panel">
  <div class="panel-header">
    <BookOpen size={16} />
    <span>Stories ({gameStore.stories.length})</span>
  </div>

  {#if gameStore.currentStory}
    <div class="current-story">
      <span class="current-label">Current</span>
      <h3 class="current-title">{gameStore.currentStory.title}</h3>
      {#if gameStore.currentStory.description}
        <p class="current-desc">{gameStore.currentStory.description}</p>
      {/if}
    </div>
  {/if}

  <div class="add-story">
    <Input
      bind:value={newStoryTitle}
      placeholder="Add a story..."
    />
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onkeydown={handleKeydown}>
      <Button size="sm" onclick={addStory} disabled={!newStoryTitle.trim()}>
        <Plus size={16} />
      </Button>
    </div>
  </div>

  <div class="story-list">
    {#each gameStore.stories as story (story.id)}
      <StoryItem
        {story}
        active={gameStore.currentStoryId === story.id}
        onclick={() => selectStory(story.id)}
        ondelete={() => deleteStory(story.id)}
      />
    {/each}

    {#if gameStore.stories.length === 0}
      <p class="empty">No stories yet. Add one above.</p>
    {/if}
  </div>
</div>

<style>
  .story-panel {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .panel-header {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    padding: 0 0.25rem;
  }

  .current-story {
    padding: 1rem;
    background: var(--color-primary-light);
    border: 1px solid var(--color-primary);
    border-radius: 10px;
  }

  .current-label {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-primary);
  }

  .current-title {
    margin: 0.25rem 0 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .current-desc {
    margin: 0.375rem 0 0;
    font-size: 0.8125rem;
    color: var(--color-text-secondary);
    line-height: 1.4;
  }

  .add-story {
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
  }

  .add-story > :first-child {
    flex: 1;
  }

  .story-list {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    max-height: 300px;
    overflow-y: auto;
  }

  .empty {
    text-align: center;
    font-size: 0.8125rem;
    color: var(--color-text-secondary);
    padding: 1rem;
  }
</style>
