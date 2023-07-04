document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Get the current platform from storage when the popup is loaded
    browser.storage.sync.get("platform").then((data) => {
      if (data.platform) {
        document.getElementById("platform").value = data.platform;
      }
    });
  },
  false
);

document.getElementById("save").onclick = function () {
  var platform = document.getElementById("platform").value;
  browser.storage.sync.set({ platform: platform }).then(() => {
    console.log("Platform is set to " + platform);

    // Get the current active tab
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      // Check if the current URL matches the pattern
      if (/^https:\/\/www.destiny.gg\/bigscreen/.test(tabs[0].url)) {
        // Reload the tab
        browser.tabs.reload(tabs[0].id);
      }
    });
  });
};
