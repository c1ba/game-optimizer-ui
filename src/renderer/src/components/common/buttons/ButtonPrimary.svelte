<script lang="ts">
    export let onClick: () => void;
    export let text: string;
    export let style: string = "";
</script>
<button class="buttonPrimary" style={style} on:click={onClick}>{text}</button>