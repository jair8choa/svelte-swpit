<script>
  import { onMount } from "svelte";
  import { Doughnut, Pie } from "svelte-chartjs";
  import Navbar from "../components/Navbar.svelte";
  import {navigate} from 'svelte-routing'
  import {URLAPI} from '../utils/utils.js'

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
  } from "chart.js";

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  let promise = [];

  const getResultados = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    const res = await fetch(
      URLAPI+"/encuesta/resultados/3",
      // "https://swpit-jwt-test-7cazqrq4mq-uc.a.run.app/encuesta/resultados/3",
      options
    );
    const data = await res.json();

    if (res.ok) {
      return [data];
    } else {
      if(res.status == 401)
        terminarSesion()
      throw new Error(data);
    }
  };

  onMount(() => {
    promise = getResultados();
  });
</script>

<svelte:head>
  <link rel="stylesheet" type="text/css" href="/css/style_form.css" />
  <link rel="stylesheet" type="text/css" href="/css/encuestas.css" />
  <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css" />
</svelte:head>
<div class="">
  <!-- main -->
  <div class="main">
    <div class="topbar">
      <div class="toggle">
        <ion-icon name="menu-outline" />
      </div>

      <div class="user">
        <img src="/imgs/login-icon.png" alt="" />
      </div>
    </div>
    <!-- cards -->
    <div class="container">
      {#await promise}
        <p>...waiting</p>
      {:then graficas}
      <div class="d-flex justify-content-center">
        <div class="grafica">
          <h1>INVENTARIO SOBRE CANALES DE APRENDIZAJE</h1>
          {#each graficas as { auditivo, visual, kinestesico, resultado }}
            <Pie
              data={{
                labels: [
                  "Auditivo",
                  "Visual",
                  "Kinestesico",
                ],
                datasets: [
                  {
                    data: [auditivo, visual, kinestesico],
                    backgroundColor: [
                      "rgb(54, 162, 235)",
                      "rgb(154, 62, 235)",
                      "rgb(255, 99, 132)",
                    ],
                  },
                ],
                hoverOffset: 4,
              }}
            />
            <h3>Eres una persona: {resultado}</h3>
            {#each resultado.split(" ") as tipo}
              <img src="/imgs/{tipo}.png" alt="{tipo}" class="img-fluid">
            {/each}
          {/each}
        </div>
      </div>
      {:catch error}
        <p class="text-center text-danger">Aun no realizado la encuesta</p>
      {/await}
      <div class="d-flex justify-content-center">
        <button class=" centrar btn btn-outline-primary" type="submit" value="submit" on:click={() => navigate('/encuesta3')}>Realizar Encuesta</button>
      </div>
      <br>
    </div>
  </div>
  <Navbar />
</div>
