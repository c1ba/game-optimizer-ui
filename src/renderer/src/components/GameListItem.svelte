<script lang="ts">
  import type { GamesType } from "../stores/GamesStore"

    export let game: GamesType;

</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="mainContainer" on:click>
    <h2>{game.name}</h2>
    <h3>{game.releaseYear}</h3>
</div>
<style>
    .mainContainer {
        border-radius: 8px;
        padding: 10px;
        cursor: pointer;
        background-color: var(--background-secondary);
    }
</style>