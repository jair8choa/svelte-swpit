<script>
  import { onMount } from "svelte";
  import { Doughnut, Pie } from "svelte-chartjs";
  import { user } from "../stores/User";
  import Navbar from "../components/Navbar.svelte";
  import {navigate} from 'svelte-routing'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
  } from "chart.js";
  import { terminarSesion } from "../utils/enviar";

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
      "http://127.0.0.1:5000/encuesta/resultados/2",
      options
    );
    const data = await res.json();

    if (res.ok) {
      console.log([data]);
      return [data];
    } else {
      if(res.status == 401)
        terminarSesion()
      throw new Error(data);
    }
  };

  onMount(() => {
    let token = localStorage.getItem('token')
		let user_id = localStorage.getItem('user_id')
    if(!token && !user_id) navigate('/', {replace: true})
    promise = getResultados();
  });
</script>

<svelte:head>
  <link rel="stylesheet" type="text/css" href="./css/style_form.css" />
  <link rel="stylesheet" type="text/css" href="./css/encuestas.css" />
  <link rel="stylesheet" type="text/css" href="./css/bootstrap.min.css" />
</svelte:head>
<div class="">
  <!-- main -->
  <div class="main">
    <div class="topbar">
      <div class="toggle">
        <ion-icon name="menu-outline" />
      </div>

      <div class="user">
        <img src="./imgs/login-icon.png" alt="" />
      </div>
    </div>
    <!-- cards -->
    <div class="container">
      {#await promise}
        <p>...waiting</p>
      {:then graficas}
      <div class="d-flex justify-content-center">
        <div class="grafica">
          <h1>TEST DE ASERTIVIDAD</h1>
          {#each graficas as {cantidad1, cantidad2, cantidad3, cantidad4, resultado, mensaje}}
            <Pie
              data={{
                labels: ["Con frecuencia","De vez en cuando", "Casi nunca","Nunca"],
                datasets: [
                  {
                    data: [cantidad1,cantidad2,cantidad3,cantidad4],
                    backgroundColor: [
                      "rgb(54, 162, 235)",
                      "rgb(54, 162, 235)",
                      "rgb(255, 99, 132)",
                      "rgb(255, 99, 132)",
                    ],
                  },
                ],
                hoverOffset: 4
              }}
              class=""
            />
            <h3>Resultado: {resultado}</h3>
            <p>{mensaje}</p>
          {/each}
        </div>

      </div>
      {:catch error}
        <p class="text-center text-danger">Aun no realizado la encuesta</p>
      {/await}
      <div class="d-flex justify-content-center">
        <button class=" centrar btn btn-outline-primary" type="submit" value="submit" on:click={() => navigate('/encuesta2')}>Realizar Encuesta</button>
      </div>
      <br>
    </div>
  </div>
  <Navbar />
</div>
