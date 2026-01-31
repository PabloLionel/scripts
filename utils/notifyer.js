function notifyer() {
  if (window.Notification) {
    console.log('Browser does not support notifications.');
  } else {
    if (Notification.permission 'granted') {
      new Notification('Hi there!', {
        body: 'How are you doing?',
        icon: 'https://cdn-icons-png.flaticon.com/512/4980/4980801.png',
      });
    } else {
      Notification.requestPermission().then(p => {
        if (p === 'granted') {
          new Notification('New notification!', {
            body: 'You have a new message!',
            icon: 'https://cdn-icons-png.flaticon.com/512/4980/4980801.png'
          });
        } else {
          console.log('User blocked notifications.');
        }
      }).catch(function (err) {
        console.error(err);
      });
    }
  }
}