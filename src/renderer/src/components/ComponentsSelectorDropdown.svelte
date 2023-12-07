<script lang="ts">
  import { ComponentsStore } from "../stores/ComponentsStore";
  import { getPerformanceFilesByGameAndComponents } from "../stores/PerformanceFilesStore";
  import ButtonPrimary from "./common/buttons/ButtonPrimary.svelte";
  import PositionedWindow from "./common/windows/PositionedWindow.svelte"
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
<PositionedWindow width={"50vw"} height={"30vh"} bind:y={yPosition} bind:x={xPosition} bind:show={show}>
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
</PositionedWindow>
<style>
    h4 {
        font-family: 'Raleway';
        color: var(--text);
    }
</style>