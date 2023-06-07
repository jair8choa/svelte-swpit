<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import Navbar from "../components/Navbar.svelte";
  import { enviar } from "../utils/enviar";
  import { navigate } from "svelte-routing";
  import { user } from "../stores/Store";
  import {URLAPI} from '../utils/utils.js'

  export let encuestaId

  let promise = {};
  let secciones = [];
  let respuestas = [[],[],[]];
  let horaInicio = new Date().getTime()
  let horaFinal = null
  let encuestaNombre = ""
  let cantidadPreguntas = 0

  onMount(() => {
    if(!$user) navigate('/svelte-swpit', {replace: true})
    promise = getPreguntas();
  });

  const getPreguntas = async () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    };
    const res = await fetch(URLAPI+"/encuesta/"+encuestaId, options);
    const json = await res.json();
    
    encuestaNombre = json.Nombre;
    secciones = json.Secciones;

    cantidadPreguntas = secciones.reduce((result, current)=>{
      return result+current.Preguntas.length
    }, 0)

    return json;
  };

  const calificar = async () => {

    horaFinal = new Date().getTime()

    respuestas = respuestas.map((current1)=>{
      return current1.filter((current)=>{
        return current !== ''
      })
    })

    let cantidadRespuestas = respuestas.reduce((result, current)=>{
      return result+current.length
    }, 0)

    if (cantidadPreguntas == cantidadRespuestas) {
      await enviar(respuestas, $user.csrf, encuestaId, horaFinal, horaInicio)
      navigate("/svelte-swpit/resultados/"+encuestaNombre+"/"+encuestaId, {replace:true})
    } else {
      alert("Contesta todas las pregunas!");
    }
  };
</script>

<svelte:head>
  <link rel="stylesheet" href="/svelte-swpit/css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="/svelte-swpit/css/style_form.css" />
</svelte:head>

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
  <div class="center">
    {#await promise}
      <p>...waiting</p>
    {:then data}
    <div class="d-flex justify-content-center text-muted">
      <h1 class="text-center">{data.Nombre}</h1>
    </div>
    {#each secciones as seccion, s}
        <div class="d-flex justify-content-start p-3 text-muted">
          <h2>{seccion.Titulo}</h2>
        </div>
        <div class="cardBox" transition:fade>
            {#each seccion.Preguntas as pregunta, i}

                <div class="card">
                  <p class="cardName">{pregunta.TituloPregunta}</p>
                  <br />
                  <fieldset>
                    {#each pregunta.TipoPregunta.DetTipoPreg as op, j }
                      <div class="form-check">
                        <input class="opcion form-check-input" type="radio" id="opcion-{seccion.idSeccion}-{i}-{j}" name="pregunta-{seccion.idSeccion}-{i}" value="{j}" bind:group={respuestas[s][i]} required/>
                        <label class="numbers" for="opcion-{seccion.idSeccion}-{i}-{j}">{op.Opcion}</label>
                      </div>
                    {/each}
                  </fieldset>
                </div>

            {/each}
          </div>
      {/each}
      <div class="d-flex justify-content-center">
        <button class="centrar  centrar btn btn-outline-primary" type="submit" value="submit" on:click={calificar}>Enviar</button>
      </div>
      <br>
    {:catch error}
      <p class="text-center text-danger">{error}</p>
    {/await}
  </div>
</div>
<Navbar />
