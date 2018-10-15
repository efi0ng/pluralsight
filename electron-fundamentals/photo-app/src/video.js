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

  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    videoEl.srcObject = stream;
  })
  .catch(function(error) {
    console.log('Camera error: ', error);
  });
}

module.exports = {
  init: init
};
