<script lang="js">
  import { Router, Link, Route, navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { user } from "../stores/Store.js";
  import {URLAPI} from '../utils/utils.js'

  const cerrarsesion = async () => {
    if (confirm("Deseas cerrar sesion "+$user.name+"?")) {
      const response = await fetch(URLAPI+'/auth/logout',  {method: 'POST', credentials:'include'})
      user.logout()
      navigate('/svelte-swpit/', {replace: true})
    }
  };
  
  onMount(() => {
    document.querySelector(".toggle").onclick = function () {
      document.querySelector(".navigation-1").classList.toggle("active");
      document.querySelector(".main").classList.toggle("active");
    };

    function activeLink() {
      document
        .querySelectorAll(".navigation-1 li")
        .forEach((item) => item.classList.remove("hovered"));
      this.classList.add("hovered");
    }

    document.querySelectorAll(".navigation-1 li").forEach((item) => {
      item.addEventListener("mouseover", activeLink);
      item.addEventListener("click", activeLink);
    });
  });
</script>
<svelte:head />

<Router>
  <nav class="navigation-1">
    <ul>
      <li>
        <a href="/svelte-swpit/home">
          <span class="banner-img"> <img src="/svelte-swpit/imgs/halcon.png" alt="" /> </span>
        </a>
      </li>
      <li name="Home">
        <Link to="/svelte-swpit/home">
          <span class="icon"> <ion-icon name="home" /> </span>
          <span class="tittle">Inicio</span>
        </Link>
      </li>
      <li name="Encuestas">
        <Link to="/svelte-swpit/encuestas">
          <span class="icon"> <ion-icon name="document-text" /> </span>
          <span class="tittle">Encuestas</span>
        </Link>
      </li>
      <li>
        <a on:click={cerrarsesion} href="/svelte-swpit">
          <span class="icon"> <ion-icon name="log-out" /> </span>
          <span class="tittle">Cerrar Sesión</span>
        </a>
      </li>
    </ul>
  </nav>
</Router>
