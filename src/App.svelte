<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import Home from "./views/Home.svelte";
  import Login from "./views/Login.svelte";
  import Encuestas from "./views/Encuestas.svelte";
  import Encuesta1 from "./views/Encuesta1.svelte";
  import Resultados1 from "./views/Resultados1.svelte";
  import Encuesta2 from "./views/Encuesta2.svelte";
  import Encuesta3 from "./views/Encuesta3.svelte";
  import Resultados3 from "./views/Resultados3.svelte";
  import Resultados2 from "./views/Resultados2.svelte";
  import {onMount} from 'svelte'
  import {user} from './stores/User'

  onMount(()=>{
    navigate('/', {replace: true})
  })



</script>

<Router>
  <Route path="/">
    <Login />
  </Route>
  <Route path="/home">
    <Home />
  </Route>
  <Route path="/encuestas">
    <Encuestas />
  </Route>
  <Route path="/encuesta1">
    <Encuesta1 />
  </Route>
  <Route path="/resultados1">
    <Resultados1 />
  </Route>
  <Route path="/encuesta2">
    <Encuesta2 />
  </Route>
  <Route path="/resultados2">
    <Resultados2 />
  </Route>
  <Route path="/encuesta3">
    <Encuesta3 />
  </Route>
  <Route path="/resultados3">
    <Resultados3 />
  </Route>
</Router>