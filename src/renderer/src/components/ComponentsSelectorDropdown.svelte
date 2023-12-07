<script lang="ts">
  import { ComponentsStore } from "../stores/ComponentsStore";
  import { getPerformanceFilesByGameAndComponents } from "../stores/PerformanceFilesStore";
  import ButtonPrimary from "./Button/ButtonPrimary.svelte";
  import Dropdown from "./Dropdown.svelte"

    export let show: boolean;
    export let selectedGame: string;
    export let xPosition: number;
    export let yPosition: number;
    export let performanceFilesPage: boolean;

    $: data = {
        processors: [],
        graphicCards: [],
        rams: []
    };
    ComponentsStore().subscribe((value: any) => {
        data = value;
    });

    let selectedProcessor: string;
    let selectedGraphics: string;
    let selectedRam: string;

    const onSubmit = async () => {
       await getPerformanceFilesByGameAndComponents(
        {
            gameId: selectedGame,
            processorId: selectedProcessor,
            graphicsId: selectedGraphics,
            ramId: selectedRam
        });
        performanceFilesPage = true;
        show = false;
    }
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div style="width: 100vw; height: 100vh; position: absolute;">
    <div class="mainContainer" style={`top: ${yPosition}px; left: ${xPosition}px;`}>
        <h4>Select your components</h4>
        {#if data.processors}
        <Dropdown bind:bindValue={selectedProcessor} name="Processor" data={data.processors} />
        {/if}
        {#if data.graphicCards}
        <Dropdown bind:bindValue={selectedGraphics} name="Graphic Card" data={data.graphicCards} />
        {/if}
        {#if data.rams}
        <Dropdown bind:bindValue={selectedRam} name="Ram" data={data.rams} />
        {/if}
        <ButtonPrimary onClick={onSubmit} text="Submit!" />
    </div>
    <div on:click={() => show = !show} style="width: 100vw; height: 100vh; position: absolute; overflow: hidden; z-index: 1;">
    </div>
</div>
<style>
    .mainContainer {
        background-color: var(--background-secondary);
        border-radius: 4px;
        width: 50vw;
        height: 30vw;
        position: absolute;
        z-index: 2;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    h4 {
        font-family: 'Raleway';
        color: var(--text);
    }
</style>