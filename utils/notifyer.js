async function sendNotification(title, options = {}) {
  // 1. Validación de soporte (Corregido)
  if (!("Notification" in window)) {
    console.warn("Este navegador no soporta notificaciones de escritorio.");
    return;
  }

  // 2. Gestión de permisos usando async/await para mayor claridad
  let permission = Notification.permission;

  if (permission === "default") {
    permission = await Notification.requestPermission();
  }

  // 3. Ejecución si el permiso es concedido
  if (permission === "granted") {
    const defaultOptions = {
      body: "¡Hola!",
      icon: "https://cdn-icons-png.flaticon.com/512/4980/4980801.png",
      ...options // Permite sobrescribir opciones al llamar la función
    };
    
    return new Notification(title, defaultOptions);
  }

  // 4. Manejo de rechazo
  if (permission === "denied") {
    console.info("El usuario bloqueó las notificaciones.");
  }
}
