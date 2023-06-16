const $= document.querySelector.bind(document)
const $$= document.querySelectorAll.bind(document)
var CardList=[['Mã thẻ','Biển số']]
var Detect=[[5,'92-S1 0265'],[30,'92-S1 012.34'],[50,'92-S1 987.56']]
const RenderCardlist=()=>{
    const CardListElement=$('.CardListContainer .CardList')
    html=''
    html=CardList.reduce((saved,[ID,Code])=>{
      return saved+`<li class="CardItem">
      <div class="ID">${ID}</div>
      <div class="PlateCode">${Code}</div>
  </li>`
    },html)
    CardListElement.innerHTML=html
}
const HandleEvents=()=>{
    var currentIDFront=0
    var currentIDBack=0
    const FrameBoxs=$$('.FrameContainer img')
    const InputFiles=$$('.FrameContainer input')
    //Handle Upload Video
    InputFiles.forEach((input)=>{
        input.onchange=(event)=>{
            // console.log(event)
            const file = event.target.files[0];
            const canvas = input.parentNode.querySelector('.frontFrame');
            var context = canvas.getContext("2d");
            const uploadVideo= input.parentNode.nextElementSibling
            const video=input.nextElementSibling.nextElementSibling
            if (file && file.type.includes('video')){
              // console.log('ok')
              // call API
              var index_dectect=0
              uploadVideo.style.display='block'
              
              const videoURL = URL.createObjectURL(file);
              // Gán URL cho video
              video.src = videoURL;
              // Bắt đầu phát video
              // video.addEventListener("loadedmetadata", function() {
              //   context.drawImage(video, 0, 0, canvas.width, canvas.height);
              //   // requestAnimationFrame(drawFrame);
              // });
              // video.load();
              // context.drawImage(video, 0, 0, canvas.width, canvas.height);
              video.addEventListener("play", function() {
                drawFrame();
              });
              // video.play();
              
              function drawFrame() {
                if (video.paused || video.ended) {
                  return;
                }
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                // var currentFrame = Math.floor( video.playbackRate* video.playbackRate);
                const fps=60
                var currentFrame = Math.floor(video.currentTime *fps);
                console.log(currentFrame)
                if (Detect[index_dectect][0]<=currentFrame+5 && currentFrame-5<=Detect[index_dectect][0]){
                  console.log('detect')
                  video.pause()
                  index_dectect+=1
                  const inputID=uploadVideo.parentNode.querySelector('.inputIDContainer')
                  inputID.style.display='block'

                };
                requestAnimationFrame(drawFrame);
              }
              canvas.style.display='block'
              
              var imgtag=input.nextElementSibling
              imgtag.style.display='none'
              uploadVideo.onclick=()=>{
                imgtag.click()
              }
              canvas.onclick=()=>{
                if (video.paused){
                  video.play()
                }else{
                  video.pause()
                }
              }
            }

        }
        const FrontInputIDButton=$('#FrontCam .inputIDButton')
        FrontInputIDButton.onclick=()=>{
          const inputTag=FrontInputIDButton.previousElementSibling;
          var inputValue=inputTag.value
          console.log(inputValue)
          var check=CardList.filter((card)=>{
            return card[0]==inputValue 
          })
          console.log(check)
          if (check.length){
            alert(`Thẻ ${inputValue} đã được nạp, vui lòng nhập thẻ khác!`);
            inputTag.value=''
          } else{
            FrontInputIDButton.parentNode.style.display='none'
          }

        }
    });
    // LoadVideo
    FrameBoxs.forEach((value,index)=>{
        value.onclick=(element)=>{
            // console.log(InputFiles)
            InputFiles[index].click()
        };})

};



const App=()=>{
    RenderCardlist();
    HandleEvents();
}
App()