<script>
  import { onMount } from "svelte";
  import { Doughnut, Pie } from "svelte-chartjs";
  import { user } from "../stores/User";
  import Navbar from "../components/Navbar.svelte";
  import { navigate } from "svelte-routing";
  import {terminarSesion} from '../utils/enviar'
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
  let resultado = ""

  const getResultados = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    const res = await fetch(
      "https://swpit-jwt-test-7cazqrq4mq-uc.a.run.app/encuesta/resultados/1",
      options
    );
    const data = await res.json();
    const {
      calificacionfinal,
      calificacionseccion1,
      calificacionseccion2,
      calificacionseccion3,
      resultadofinal,
      resultadoseccion1,
      resultadoseccion2,
      resultadoseccion3,
    } = data;

    console.log(data);
    if (res.ok) {
      resultado = resultadofinal
      return [
        {
          labels: ["Si", "No"],
          datasets: [
            {
              label:
                "ENCUESTA PARA LA ORGANIZACION DEL ESTUDIO (" +resultadoseccion1 +")",
              data: [calificacionseccion1, 20 - calificacionseccion1],
              backgroundColor: ["#46BFBD", "#F7464A"],
              hoverBackgroundColor: ["#5AD3D1", "#FF5A5E"],
            },
          ],
        },
        {
          labels: ["Si", "No"],
          datasets: [
            {
              label: "ENCUESTA TECNICA DE ESTUDIO (" + resultadoseccion2 + ")",
              data: [calificacionseccion2, 20 - calificacionseccion2],
              backgroundColor: ["#46BFBD", "#F7464A"],
              hoverBackgroundColor: ["#5AD3D1", "#FF5A5E"],
            },
          ],
        },
        {
          labels: ["Si", "No"],
          datasets: [
            {
              label:
                "ENCUESTA PARA MOTIVACION SOBRE MOTIVACION PARA EL ESTUDIO (" +resultadoseccion3 +")",
              data: [calificacionseccion3, 20 - calificacionseccion3],
              backgroundColor: ["#46BFBD", "#F7464A"],
              hoverBackgroundColor: ["#5AD3D1", "#FF5A5E"],
            },
          ],
        },
        {
          labels: ["Si", "No"],
          datasets: [
            {
              label: "General (" + resultadofinal + ")",
              data: [calificacionfinal, 60 - calificacionfinal],
              backgroundColor: ["#46BFBD", "#F7464A"],
              hoverBackgroundColor: ["#5AD3D1", "#FF5A5E"],
            },
          ],
        },
      ];
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
  <link rel="stylesheet" type="text/css" href="/svelte-swpit/css/style_form.css" />
  <link rel="stylesheet" type="text/css" href="/svelte-swpit/css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="/svelte-swpit/css/encuestas.css" />
</svelte:head>
<div class="">
  <!-- main -->
  <div class="main">
    <div class="topbar">
      <div class="toggle">
        <ion-icon name="menu-outline" />
      </div>

      <div class="user">
        <img src="/svelte-swpit/imgs/login-icon.png" alt="" />
      </div>
    </div>
    <!-- cards -->
    <div class="">
      {#await promise}
        <p>...waiting</p>
      {:then graficas}
      <h1 class="text-center">INVENTARIO SOBRE CANALES DE APRENDIZAJE</h1>
      <div class="cardBox">
            {#each graficas as grafica}
              <div class="card">
                <Pie data={grafica} />
                <p class="text-center cardName">{grafica.datasets[0].label}</p>
              </div>
            {/each}
            <h3>Tus habilidades de estudio son {resultado}</h3>
          </div>
      {:catch error}
        {console.log(error)}
        <p class="text-center text-danger">Aun no realizado la encuesta</p>
      {/await}
    </div>
    <div class="d-flex justify-content-center">
      <button class=" centrar btn btn-outline-primary" type="submit" value="submit" on:click={() => navigate("/encuesta1")}>Realizar Encuesta</button>
    </div>
    <br>
  </div>
  <Navbar />
</div>
