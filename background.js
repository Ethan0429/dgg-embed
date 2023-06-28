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

function embedVideo() {
  fetch("https://youtube.com/channel/@destiny/live")
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const linkCanonical = doc.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        const href = linkCanonical.getAttribute("href");
        const videoId = href.split("watch?v=")[1]; // Get video ID from href
        const embedElement = document.getElementById("embed");
        if (embedElement) {
          const iframe = document.createElement("iframe");
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.src = `https://www.youtube.com/embed/${videoId}`; // Embed version of the video
          iframe.style.position = "relative"; // Required for z-index to work
          iframe.style.zIndex = "9999"; // Bring to the forefront
          iframe.frameborder = "0";
          embedElement.appendChild(iframe);
        }
      }
    })
    .catch((error) => {
      console.log("Stream likely offline...");
      console.error("Error:", error);
    });
}
