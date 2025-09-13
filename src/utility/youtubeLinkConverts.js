export function toYoutubeEmbed(url) {
  try {
    let videoId;

    // handle short youtu.be links
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }

    //handle standard youtube.com links
    if (url.includes("youtube.com/watch?v=")) {
      videoId = new URL(url.searchParams.get("v"));
    }

    //Handle share Links with etra parameters
    if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("shorts/")[1].split("?")[0];
    }

    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}`;
  } catch (e) {
    console.log(e);
  }
}
