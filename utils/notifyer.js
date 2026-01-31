async function sendNotification(title, options = {}, duration = 5000) {
  if (!("Notification" in window)) {
    console.warn("Navegador no compatible.");
    return;
  }

  let permission = Notification.permission;
  if (permission === "default") {
    permission = await Notification.requestPermission();
  }

  if (permission === "granted") {
    const notification = new Notification(title, {
      body: "Mensaje por defecto",
      icon: "https://cdn-icons-png.flaticon.com/512/4980/4980801.png",
      ...options
    });

    // 1. Foco al hacer clic
    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // 2. Cierre automático (si duration es mayor a 0)
    if (duration > 0) {
      setTimeout(() => notification.close(), duration);
    }

    return notification;
  }
}
