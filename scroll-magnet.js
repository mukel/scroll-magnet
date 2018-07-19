
var scroll_magnet_active = false;
var last_known_scroll_position = 0;
var ticking = false;
var anchored = false;

function checkScrollAtBottom(scroll_pos) {
  if (scroll_magnet_active) {
    let sh = document.documentElement.scrollHeight;
    anchored = (scroll_pos == sh);
  }
}

window.addEventListener('scroll', () => {
  last_known_scroll_position = window.scrollY + window.innerHeight;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      checkScrollAtBottom(last_known_scroll_position);
      ticking = false;
    });
    ticking = true;
  }
});

function scrollToBottom() {
  if (anchored) {
    window.scroll({
      top: document.documentElement.scrollHeight,
      behavior: "instant"
    });
  }
}

// Monitor the DOM for additions @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver.
const observer = new MutationObserver((mutations) => {
  if (anchored) {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // This DOM change was new nodes being added.      
        const newNode = mutation.addedNodes[mutation.addedNodes.length - 1];
        scrollToBottom();
      }
    });
  }
});

browser.runtime.onMessage.addListener((request, sender) => {
    console.debug(sender.tab ?
      "from a content script: " + sender.tab.url :
      "from the extension");
    if (request.action == "toggle") {
      scroll_magnet_active = !scroll_magnet_active;
      if (scroll_magnet_active) {        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      } else {
        observer.disconnect();
      }
      return Promise.resolve({ "active": scroll_magnet_active });
    }
  });