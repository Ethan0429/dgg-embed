chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url === "https://www.destiny.gg/bigscreen"
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: embedVideo,
    });
  }
});

async function embedVideo() {
  try {
    const destinyChannelId = "UC554eY5jNUfDq3yDOJYirOQ";
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
    iframe.src = `https://www.youtube.com/embed/live_stream?channel=${destinyChannelId}`;
    iframe.style.position = "relative"; // Required for z-index to work
    iframe.style.zIndex = "9999"; // Bring to the forefront
    iframe.frameBorder = "0";

    embedElement.appendChild(iframe);

    const streamWrapElement = document.getElementById("stream-wrap");
    if (streamWrapElement) {
      streamWrapElement.appendChild(embedElement);
    } else {
      console.error("stream-wrap element not found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
