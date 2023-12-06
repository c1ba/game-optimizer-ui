<script lang="ts">
  // import { electronAPI } from "@electron-toolkit/preload"

  // console.log(electronAPI.process.versions)
  $: data = undefined;
  window.electron.ipcRenderer.on('get-device-data', (_evt, message) => {
    data = message;
  })

  $: processor = data?.processor;
  $: graphics = data?.graphics;
  $: ram = data?.ram;
</script>

<div class="header_container">
  <h1 style="margin-bottom: 25px;">Your Device:</h1>
  <ul class="versions">
    {#if data}
    <li>{processor.brand} - {processor.speed} GHz</li>
    {#if graphics}
    {#each graphics.controllers as controller}
      <li>{controller.model} - {controller.vram / 1024} GB</li>
    {/each }
    {/if}
    <li>{Math.round(ram.total * Math.pow(10, -9))} GB RAM</li>
    {/if}
  </ul>
</div>

<style>
  .header_container{
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    width: 100%;
    z-index: 3;
  }
  .versions {
    margin: 0 auto;
    float: none;
    clear: both;
    overflow: hidden;
    font-family: 'Menlo', 'Lucida Console', monospace;
    color: #c2f5ff;
    line-height: 1;
    transition: all 0.3s;
  }

  .versions li {
    display: block;
    float: left;
    border-right: 1px solid rgba(194, 245, 255, 0.4);
    padding: 0 20px;
    font-size: 13px;
    opacity: 0.8;
  }

  .versions li:last-child {
    border: none;
  }

  @media (max-width: 840px) {
    .versions {
      display: none;
    }
  }
</style>
