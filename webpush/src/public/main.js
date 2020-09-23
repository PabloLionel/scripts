/**
 * .
 */
const subscription = async () => {
  const PUBLIC_VAPID_KEY = await (
    await fetch('http://localhost:3000/webpush')
  ).then((res) => res.json()).PUBLIC_VAPID_KEY;

  console.log(PUBLIC_VAPID_KEY);

  if ('serviceWorker' in navigator) {
    const register = await navigator.serviceWorker
      .register('./sw.js', {
        scope: '/'
      })
      .then(console.log)
      .catch(console.log);
  } else {
    throw new Error('Unsupported serviceWorker.');
  }

  const si = setInterval(() => {
    fetch('http://localhost:3000/subscription', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => res.ok && (await res.json()).finalize)
      .then((finalize) => {
        if (finalize) {
          clearInterval(si);
        }
      });
  }, 5000 * Math.random());
};

subscription();
