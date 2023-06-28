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
  const destinyChannelId = "UC554eY5jNUfDq3yDOJYirOQ";
  try {
    const embedElement = document.getElementById("embed");
    if (embedElement) {
      const iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.src = `https://www.youtube.com/embed/live_stream?channel=${destinyChannelId}`;
      iframe.style.position = "relative"; // Required for z-index to work
      iframe.style.zIndex = "9999"; // Bring to the forefront
      iframe.frameBorder = "0";
      embedElement.appendChild(iframe);
    }
  } catch (error) {
    console.log("Stream is likely offline...");
    console.error("Error:", error);
  }
}
