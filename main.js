const installButton = document.getElementById('installButton');

// When brownser support pwa install function
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile.
  event.preventDefault();
  console.log('[beforeinstallprompt]', event);

  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;

  // Remove the 'disabled' class from the install button container.
  installButton.classList.toggle('disabled', false);
});

// When click install button
installButton.addEventListener('click', async () => {
  console.log('clicked install button');

  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }

  // Show the install prompt.
  promptEvent.prompt();

  // Log the result
  const result = await promptEvent.userChoice;
  console.log('userChoice', result);

  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;

  // Disable the install button.
  installButton.classList.toggle('disabled', true);
});

// After installed
window.addEventListener('appinstalled', (event) => {
  console.log('[appinstalled]', event);

  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}