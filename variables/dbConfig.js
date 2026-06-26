/**
 * Configuración de conexión MySQL (solo para el backend).
 *
 * Seguridad:
 * - No exponer estas credenciales al frontend.
 * - En un entorno real se recomienda usar variables de entorno (no hardcodear secretos).
 *
 * Nota SSL:
 * - En MySQL local, el uso real de TLS puede variar por configuración del servidor.
 * - El parámetro `ssl` se deja configurado para intentar TLS; si tu servidor no lo requiere, se puede ajustar.
 */

const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME; 

const sslEnabled = String(process.env.DB_SSL || "true").toLowerCase() !== "false"; // Feature flag simple: permite desactivar TLS en entornos locales que no lo soporten.
const ssl = sslEnabled
  ? {
      rejectUnauthorized: false, // En laboratorios suele usarse CA propia o sin CA; en producción debe ser true con CA válida.
      minVersion: "TLSv1.2", // Fuerza un mínimo criptográfico razonable (evita TLS 1.0/1.1).
      ciphers: "TLS_AES_128_GCM_SHA256" // Selecciona un conjunto de cifrado moderno (puede variar según OpenSSL/servidor MySQL).
    }
  : undefined; // Si se desactiva TLS por variable de entorno, no se envía configuración SSL al driver.

module.exports = {
  host, // Exporta el host final calculado.
  port, // Exporta el puerto final calculado.
  user, // Exporta el usuario final calculado.
  password, // Exporta la contraseña final (de entorno o vacía).
  database, // Exporta el nombre de base de datos final.
  ssl // Exporta configuración TLS si aplica.
};
