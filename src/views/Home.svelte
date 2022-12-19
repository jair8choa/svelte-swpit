<script>
	import { Router, Link, Route, navigate } from "svelte-routing";
    import {user} from '../stores/User'
	import Navbar from "../components/Navbar.svelte";
    import {onMount} from 'svelte'

    onMount(()=>{
		let token = localStorage.getItem('token')
		let user_id = localStorage.getItem('user_id')
      	if(!token && !user_id) navigate('/', {replace: true})
    })

</script>

<svelte:head>
	<link rel="stylesheet" type="text/css" href="/svelte-swpit/css/style_home.css" />
	<link rel="stylesheet" type="text/css" href="/svelte-swpit/css/style_form.css" />
</svelte:head>

<div class="container">
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
		<div class="panel panel-default">
			<div class="panel-body text-center">
				¡Bienvenido a SWPIT!
				<br />
				<br />
				<br />
				En esta plataforma podras, realizar tus encuestas.
			</div>
		</div>
	</div>
	<Navbar></Navbar>
</div>