<script lang="ts">
    export let onClick: () => void;
    export let text: string;
</script>
<button class="buttonPrimary" on:click={onClick}>{text}</button>