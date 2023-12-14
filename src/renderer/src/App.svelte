<script lang="ts">
  import ComponentsSelectorDropdown from './components/ComponentsSelectorDropdown.svelte'
  import DeviceData from './components/DeviceData.svelte';
  import GameListItem from './components/GameListItem.svelte'
  import LoginPopUp from './components/LoginPopUp.svelte'
  import UserInfo from './components/UserInfo.svelte'
  import PerformanceFiles from './pages/PerformanceFiles.svelte'
  import {GamesStore} from './stores/GamesStore';

  $: gamesResp = [];
  GamesStore().subscribe((value) => {
    gamesResp = value;
  });

  $: isPerformanceFilesPageVisible = false;
  $: isLoginVisible = false;

  $: games = gamesResp;
  $: showComponentsDropdown = false;
  $: selectedGame = null;

  $: cursorX = 0;
  $: cursorY = 0;
</script>

<div class="container">
  <ComponentsSelectorDropdown 
      bind:selectedGame={selectedGame}
      bind:show={showComponentsDropdown}
      bind:xPosition={cursorX}
      bind:yPosition={cursorY}
      bind:performanceFilesPage={isPerformanceFilesPageVisible} />
  {#if isLoginVisible}
    <LoginPopUp bind:showLogin={isLoginVisible} />
  {/if}
  <UserInfo bind:isLoginVisible={isLoginVisible} style="margin-bottom: 10px;" />
  <DeviceData />

  {#if isPerformanceFilesPageVisible}
    <PerformanceFiles bind:performanceFilesPage={isPerformanceFilesPageVisible} />
  {/if}
  <div style="width: 100%; margin-top: 15px; overflowX: hidden; overflowY: auto;">
    <h1 style="margin-bottom: 10px;">Available games: </h1>
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
