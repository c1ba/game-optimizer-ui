<script lang="ts">
  import ComponentsSelectorDropdown from './components/ComponentsSelectorDropdown.svelte'
import DeviceData from './components/DeviceData.svelte';
  import GameListItem from './components/GameListItem.svelte'
  import {GamesStore} from './stores/GamesStore';

  let gamesResp = [];
  GamesStore().subscribe((value) => {
    gamesResp = value;
  })

  $: games = gamesResp;
  $: showComponentsDropdown = false;
  $: selectedGame = null;

  $: cursorX = 0;
  $: cursorY = 0;
</script>

<div class="container">
  {#if showComponentsDropdown}
      <ComponentsSelectorDropdown bind:selectedGame={selectedGame} bind:show={showComponentsDropdown} bind:xPosition={cursorX} bind:yPosition={cursorY} />
  {/if}
  <DeviceData />

  <div style="width: 100%">
    <h1>Available games: </h1>
    {#each games as game}
      <GameListItem game={game} on:click={(event) => {
        selectedGame = game.id;
        cursorX = event.clientX;
        cursorY = event.clientY;
        showComponentsDropdown = !showComponentsDropdown;
      }}/>
    {/each}
  </div>
</div>

<style>
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 15px 30px 0 30px;
    overflow: hidden;
  }
</style>
