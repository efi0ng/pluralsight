function init(navigator, videoEl) {
  let constraints = {
    audio: false,
    video: {
      width:  { exact: 853 },
      height: { exact: 480 }
    }
  };

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
  return canvasEl.toDataURL('image/png');
}

function captureBytesFromLiveCanvas(canvasEl) {
  return canvasEl.toDataURL('image/png');
}

module.exports = {
  init: init,
  captureBytes : captureBytes,
  captureBytesFromLiveCanvas : captureBytesFromLiveCanvas
};
