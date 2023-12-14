<script lang="ts">
  import { UserStore, saveLogout } from "../stores/UserStore"
  import LoginButton from "./LoginButton.svelte";

  export let isLoginVisible: boolean;
  export let style: string = "";

</script>
<div style={`width: 100vw; padding-right: 40px; display: flex; justify-content: flex-end; align-items: center; gap: 10px; ${style}`}>
    <h3 style="z-index: 3; font-weight: 500;">{$UserStore != null ? $UserStore.username : "Guest"}</h3>
      <LoginButton isLoggedIn={$UserStore != null} onLogin={() => isLoginVisible = !isLoginVisible} onLogout={saveLogout} texts={{login: "Log in", logout: "Log out"}} />
  </div>