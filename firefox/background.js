browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    /^https:\/\/www.destiny.gg\/bigscreen/.test(tab.url)
  ) {
    browser.storage.sync.get("platform").then((data) => {
      browser.tabs.executeScript(tabId, {
        code: `(${embedVideo.toString()})("${data.platform}")`,
      });
    });
  }
});

function embedVideo(platform) {
  // embedVideo function definition here
  const destinyChannelId = "UC554eY5jNUfDq3yDOJYirOQ";
  const destinyKickId = "destiny"; // Replace with actual Twitch ID
  let embedElement = document.getElementById("embed");

  if (embedElement) {
    console.log("Removing existing embed element");
    embedElement.remove();
  }

  embedElement = document.createElement("div");
  embedElement.id = "dgg-embed";
  embedElement.style.width = "100%";
  embedElement.style.height = "auto";
  embedElement.style.aspectRatio = "16 / 9";

  const iframe = document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.position = "relative"; // Required for z-index to work
  iframe.style.zIndex = "9999"; // Bring to the forefront
  iframe.frameBorder = "0";

  // Set the source of the iframe based on the platform
  if (platform === "youtube") {
    iframe.src = `https://www.youtube.com/embed/live_stream?channel=${destinyChannelId}`;
  } else if (platform === "kick") {
    iframe.src = `https://player.kick.com/${destinyKickId}`;
  } else {
    console.error("Unknown platform: " + platform);
    return;
  }

  embedElement.appendChild(iframe);

  const streamWrapElement = document.getElementById("stream-wrap");
  if (streamWrapElement) {
    streamWrapElement.appendChild(embedElement);
  } else {
    console.error("stream-wrap element not found");
  }
}
