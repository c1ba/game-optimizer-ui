<script lang="ts">
  import { UserStore, saveLogout } from "../stores/UserStore"
  import LoginButton from "./LoginButton.svelte";

  export let isLoginVisible: boolean;
  export let style: string = "";

    $: userData = null;

    UserStore().subscribe((val) => {
      userData = val;
    });
</script>
<div style={`width: 100vw; padding-right: 40px; display: flex; justify-content: flex-end; align-items: center; gap: 10px; ${style}`}>
    <h3 style="z-index: 3; font-weight: 500;">{userData != null ? userData.username : "Guest"}</h3>
      <LoginButton isLoggedIn={userData != null} onLogin={() => isLoginVisible = !isLoginVisible} onLogout={saveLogout} texts={{login: "Log in", logout: "Log out"}} />
  </div>