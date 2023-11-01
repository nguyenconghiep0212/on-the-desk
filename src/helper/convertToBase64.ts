 
export  function getBase64FromUrl(imgUrl) {
  var img = new Image();
  // onload fires when the image is fully loadded, and has width and height
  img.onload = function(){
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png"),
        base64 = dataURL.replace(/^data:image\/(png|jpg);base64,/, ""); 
        console.log(base64);
    return base64
  };
  // set attributes and src 
  img.setAttribute('crossOrigin', 'anonymous'); //
  img.src = imgUrl;
}

export const fileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});