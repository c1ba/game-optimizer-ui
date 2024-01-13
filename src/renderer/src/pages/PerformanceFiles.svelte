<script lang="ts">
  import { PerformanceFilesStore } from "../stores/PerformanceFilesStore";

  export let performanceFilesPage: boolean;

  let openInBrowser = (link: string) => {
    window.shell.openExternal(link);
  };

  $: showWarning = true;
  PerformanceFilesStore.subscribe((data) => {
    showWarning = data.filter((elem) => elem.files.filter((file) => file.link)) ? true : false;
  });

</script>
<div class="page">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <h3 class="link" on:click={() => performanceFilesPage = false}>Back</h3>
  <div style="margin-top: 150px; padding: 15px;">
      {#if showWarning}
        <div style="background-color: #177A0B; text-align: center;">
          <h3>Tip: You can also download files from us! All you need to do is create an account!</h3>
        </div>
      {/if}

    <div style="margin-top: 10px;">
      {#each $PerformanceFilesStore as elem}
        <div>
          <h4>By: {elem.by}</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 5px; justify-content: space-around; width: 100%; margin-top: 5px;">
            {#each elem.files as file}
              {#if file.link}
              <!-- svelte-ignore a11y-missing-attribute -->
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
                <a on:click={() => openInBrowser(file.link)}>{file.name}</a>
              {:else}
                <h4>{file.name}</h4>
              {/if}
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
<style>
    .page {
        background-color: var(--background-primary);
        position: absolute; 
        width: 100vw; 
        height: 100vh;
        z-index: 2;
    }

    .link {
        cursor: pointer;
    }
</style>