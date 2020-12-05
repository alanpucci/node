/*
==== Declarar variables de entorno en heroku ====
heroku config >> me muestra las variables de entorno actuales
heroku config:set <variable>=<"valor"> configura una nueva variable de entorno

==== POSTMAN: Obtener el token de un usuario post-login ====
En postman->tests escribimos lo siguiente
let resp = pm.response.json();
if(resp.ok){
    let token = resp.token;
    pm.environment.set("token", token); 
}
else{
    congole.log("No se guardo el token")
}
*/