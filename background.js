browser.browserAction.onClicked.addListener((tab) => {

  console.debug("Scroll magnet action clicked on tab: " + tab.id + " " + tab.url);

  browser.tabs.sendMessage(tab.id, { action: "toggle" }).then((response) => {
    console.debug("Content script response: " + response.active);
    browser.browserAction.setIcon({
      tabId: tab.id,
      path: response.active ? "icons/magnet-on.png" : "icons/magnet-off.png"
    });
  });
});
