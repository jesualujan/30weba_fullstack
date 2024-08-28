const crypto = require ('crypto')
// esta línea de código se utiliza para generar claves secretas,
// tokens de acceso o cualquier otro dato aleatorio que requiera 
// seguridad criptográfica  
const secret  = crypto.randomBytes(64).toString('hex')
console.log(secret)

/*
vamos a la terminal y ejecutamos lo siguiente:
   node utils/generateJwtSecret.js
  esto nos va a generar un secret:
  31bf2801206a012a7f289982ff7fb94c75ecdea2f3e17a324ce2a44c21f4991358934dfad6dcaee63f24d50f183fab825f529f65716058316223ad5f74a6ee60
*/