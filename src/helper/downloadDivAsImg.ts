import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

export async function handleCaptureClick({
  selector,
  fileName,
}: {
  selector: string;
  fileName: string;
}) {
  const downloadEl = document.querySelector<HTMLElement>(selector);
  if (!downloadEl) return;
  await html2canvas(downloadEl, {
    allowTaint: true,
    useCORS: true,
    backgroundColor: null,
  }).then((canvas) => {
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, fileName, "image/png");
  });
}

export async function handleShare(selector: string) {
  const downloadEl = document.querySelector<HTMLElement>(selector);
  if (!downloadEl) return;
  await html2canvas(downloadEl, {
    allowTaint: true,
    useCORS: true,
    backgroundColor: null,
  }).then(async (canvas) => {
    const dataURL = canvas.toDataURL("image/png");
    try {
      if (navigator.share) {
        const base64url = dataURL;
        const blob = await (await fetch(base64url)).blob();
        const file = new File([blob], "fileName.png", { type: blob.type });
        await navigator.share({
          title: "", 
          files: [file],
        });
      } else {
        console.log("Web Share API not supported in this browser.");
        // Handle fallback mechanism (e.g., show a modal with sharing options).
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  });
}
