const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");
let stream, recorder, videoFile;

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  console.log("**** before start", recorder);

  // recording이 끝났을때
  recorder.ondataavailable = (e) => {
    console.log("recorder done");
    console.log(e);
    console.log(e.data);

    // createObjectURL  은 실제 URL이 아니라 녹화된 동영상이 위치한 메모리의 위치를 포인트 한다.
    videoFile = URL.createObjectURL(e.data);
    console.log(videoFile);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };

  recorder.start();
  console.log("====== after start", recorder);

  // setTimeout(() => {
  //   recorder.stop();
  // }, 10000);
};

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "myRecording.webm";
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  recorder.stop();
  startBtn.addEventListener("click", handleDownload);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  console.log(stream);
  video.srcObject = stream;
  video.play();
};

init();
startBtn.addEventListener("click", handleStart);