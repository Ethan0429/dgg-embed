document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Get the current platform from storage when the popup is loaded
    chrome.storage.sync.get("platform", function (data) {
      if (data.platform) {
        document.getElementById("platform").value = data.platform;
      }
    });
  },
  false
);

document.getElementById("save").onclick = function () {
  var platform = document.getElementById("platform").value;
  chrome.storage.sync.set({ platform: platform }, function () {
    console.log("Platform is set to " + platform);

    // Get the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Check if the current URL matches the pattern
      if (/^https:\/\/www.destiny.gg\/bigscreen/.test(tabs[0].url)) {
        // Reload the tab
        chrome.tabs.reload(tabs[0].id);
      }
    });
  });
};
