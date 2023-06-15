const $= document.querySelector.bind(document)
const $$= document.querySelectorAll.bind(document)
const HandleEvents=()=>{
    const FrameBoxs=$$('.FrameContainer img')
    const InputFiles=$$('.FrameContainer input')
    //Handle Upload Video
    InputFiles.forEach((input)=>{
        input.onchange=(fileUp)=>{
            const file = fileUp.target.files[0];
            const formData = new FormData();
          
            // Append the file to the FormData object
            formData.append('video', file);
          
            // Make a POST request to the API endpoint
            fetch('https://api.example.com/upload', {
              method: 'POST',
              body: formData
            })
              .then(response => response.json())
              .then(data => {
                // Handle the API response
                console.log(data);
              })
              .catch(error => {
                // Handle any errors
                console.error('Error:', error);
              });
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
    HandleEvents();
}
App()