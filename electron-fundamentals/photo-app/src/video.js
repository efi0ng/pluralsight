function init(navigator, videoEl) {
  let constraints = {
    audio: false,
    video: {
      mandatory:{
        minWidth: 853,
        minHeight: 480,
        maxWidth: 853,
        maxHeight: 480
      }
    }
  };

//navigator.webkitGetUserMedia(constraints)
  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    videoEl.srcObject = stream;
  })
  .catch(function(error) {
    console.log('Camera error: ', error);
  });
}

function captureBytes(videoEl, ctx, canvasEl) {
  ctx.drawImage(videoEl, 0, 0);
  console.log(videoEl);
  return canvasEl.toDataURL('image/png');
}

module.exports = {
  init: init,
  captureBytes : captureBytes
};
