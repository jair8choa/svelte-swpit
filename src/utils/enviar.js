import { Router, Link, Route, navigate } from "svelte-routing";
import { getCSRFToken } from "./cookies";
import {URLAPI} from './utils.js'

const enviar = async(respuestas, csrf, id_encuesta, HoraFinal, HoraInicio) => {

  respuestas = respuestas.map((element) => {
    return element.filter((i) => i !== "" && i !== null);
  });

  const body = {
    respuestas,
    HoraInicio,
    HoraFinal
  };

  const options = {
    method: "POST",
    headers: {
      Accept: "*/*",
      XCSRFTOKEN: csrf,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  };

  try{
    const response = await fetch(URLAPI+"/encuesta/resultados/"+id_encuesta, options)
    const data = await response.text()
    return data
  }catch(error){
    return error
  }
};


export { enviar };
