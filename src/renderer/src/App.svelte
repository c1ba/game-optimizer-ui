<script lang="ts">
  import LoginButton from './components/Button/LoginButton.svelte'
  import ComponentsSelectorDropdown from './components/ComponentsSelectorDropdown.svelte'
  import DeviceData from './components/DeviceData.svelte';
  import GameListItem from './components/GameListItem.svelte'
  import LoginPopUp from './components/LoginPopUp.svelte'
  import PerformanceFiles from './pages/PerformanceFiles.svelte'
  import {GamesStore} from './stores/GamesStore';
  import { UserStore, saveLogout } from './stores/UserStore'

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

  $: userData = null;

  UserStore().subscribe((val) => {
    userData = val;
  })
</script>

<div class="container">
  {#if showComponentsDropdown}
      <ComponentsSelectorDropdown 
      bind:selectedGame={selectedGame}
      bind:show={showComponentsDropdown}
      bind:xPosition={cursorX}
      bind:yPosition={cursorY}
      bind:performanceFilesPage={isPerformanceFilesPageVisible} />
  {/if}
  <LoginPopUp bind:showLogin={isLoginVisible} />
  <div style="width: 100vw; padding-left: 10px; display: flex; align-items: center; gap: 10px;">
    <h2 style="z-index: 3;">{userData != null ? userData.username : "Guest"}</h2>
      <LoginButton isLoggedIn={userData != null} onLogin={() => isLoginVisible = !isLoginVisible} onLogout={saveLogout} texts={{login: "Log in", logout: "Log out"}} />
  </div>
  <DeviceData />

  {#if isPerformanceFilesPageVisible}
    <PerformanceFiles bind:performanceFilesPage={isPerformanceFilesPageVisible} />
  {/if}
  <div style="width: 100%; margin-top: 15px;">
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
