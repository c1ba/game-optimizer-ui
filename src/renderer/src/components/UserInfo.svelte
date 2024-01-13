<script lang="ts">
  import { UserStore, saveLogout } from "../stores/UserStore"
  import LoginButton from "./LoginButton.svelte";

  export let isLoginVisible: boolean;
  export let isPefromanceFilesPageOpen: boolean;
  export let style: string = "";

  const onLogin = () => {
    isPefromanceFilesPageOpen = false;
    isLoginVisible = !isLoginVisible
  }

  const onLogout = () => {
    isPefromanceFilesPageOpen = false;
    saveLogout();
  }

</script>
<div style={`width: 100vw; padding-right: 40px; display: flex; justify-content: flex-end; align-items: center; gap: 10px; ${style}`}>
    <h3 style="font-weight: 500; z-index: 4;">{$UserStore != null ? $UserStore.username : "Guest"}</h3>
      <LoginButton style="z-index: 3;" isLoggedIn={$UserStore != null} onLogin={onLogin} onLogout={onLogout} texts={{login: "Log in", logout: "Log out"}} />
  </div>