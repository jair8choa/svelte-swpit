import { Router, Link, Route, navigate } from "svelte-routing";
import { getCSRFToken } from "./cookies";
import {URLAPI} from './utils.js'

const enviar = (respuestas, csrf, id_encuesta, HoraFinal, HoraInicio) => {
  respuestas = respuestas.map((element) => {
    return element.filter((i) => i != "" && i != null);
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

  // fetch("https://swpit-jwt-test-7cazqrq4mq-uc.a.run.app/encuesta/resultados", options)
  fetch(URLAPI+"/encuesta/resultados/"+id_encuesta, options)
    .then((response) => response.text())
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    });
};


export { enviar };
