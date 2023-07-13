chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    /^https:\/\/www.destiny.gg\/bigscreen/.test(tab.url)
  ) {
    chrome.storage.sync.get("platform", function (data) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: (platform) => {
          // embedVideo function definition here
          async function embedVideo() {
            try {
              const destinyChannelId = "UC554eY5jNUfDq3yDOJYirOQ";
              const destinyKickId = "destiny"; // Replace with actual Twitch ID
              const destinyLiveWs = "https://www.destiny.gg/api/info/stream";

              // Check stream live webservice to see if he's live on currently selected platform
              const response = await fetch(destinyLiveWs);
              const liveJson = await response.json();
              let streams = liveJson.data.streams;
              let live = false;
              for (let key in streams) {
                if (key === platform) {
                  let stream = streams[key];
                  if (stream != null) {
                    live = live || stream.live;
                  }
                }
              }

              // Only embed if stream is live
              if (live) {
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
            } catch (error) {
              console.error("Error:", error);
            }
          }

          // Call the function after defining it
          embedVideo(platform);
        },
        args: [data.platform],
      });
    });
  }
});
