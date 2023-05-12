<script>
  import { onMount } from "svelte";
  import { Doughnut, Pie } from "svelte-chartjs";
  import Navbar from "../components/Navbar.svelte";
  import { navigate, Link } from "svelte-routing";
    import { each } from "svelte/internal";

  export let encuestaId
  export let nombre

  let promiseResultados = [];
  let dictamen = {}
  let detalles = []

  const getResultados = async () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
      credentials: "include"
    };
    const res = await fetch("http://localhost:5050/encuesta/resultados/"+encuestaId, options);
    const json = await res.json();
    dictamen = json.Dictamen[0]
    let {DetalleAsertividad, DetalleAutoEstima, DetalleDicHA, DetalleDicHE, DetalleDictInvApre} = dictamen
    detalles = [DetalleAsertividad[0], DetalleAutoEstima[0], DetalleDicHA[0], DetalleDicHE[0], DetalleDictInvApre[0]]
    console.log(detalles)
    return json;
  }

  onMount(() => {
    promiseResultados = getResultados();
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
      <h1 class="text-center">{nombre}</h1>
      {#await promiseResultados}
        <p>...waiting</p>
      {:then data}
      <h2 class="text-center">Dictamen</h2>
      <div class="cardBox">
        <p><b>Evaluacion Descriptiva:</b> {dictamen.EvalDescripctiva}</p> <br>
        <p><b>Evaluacion Numerica:</b> {dictamen.EvalNumerica}</p> <br>
        <p><b>Observaciones:</b> {dictamen.Observaciones}</p> <br>
        <p><b>Recomendaciones:</b> {dictamen.Recomendaciones}</p> <br>
        <p><b>Fecha Aplicacion:</b> {data.FechaAplicacion}</p> <br>
        <p><b>Hora Inicio:</b> {data.HoraInicio}</p> <br>
        <p><b>Hora Final:</b> {data.HoraFinal}</p> <br>
      </div>
      <h2 class="text-center">Detalle</h2>
      <div class="cardBox">
          {#each detalles as detalle}
            {#if detalle != null}
              {#each Object.entries(detalle) as [key, value], index (key)}
              <p><b>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}:</b> {value}</p> <br>
              {/each}
            {/if}
          {/each}
        </div>
        {:catch error}
        <p class="text-center text-danger">Aun no realizado la encuesta</p>
      {/await}
    </div>
    <div class="d-flex justify-content-center">
      <Link to={"/encuesta/"+encuestaId}>
        <button class=" centrar btn btn-outline-primary" type="submit" value="submit">Realizar Encuesta</button>
      </Link>
    </div>
    <br>
  </div>
  <Navbar />
</div>
