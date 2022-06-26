const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
error = document.querySelector("#error")
error2 = document.querySelector("#error2")
resultholder = document.querySelector("#resultHolder"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; 

button.onclick = ()=>{
  input.click();
}

input.addEventListener("change", function(){
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(file);
}); 

dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); 
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event)=>{
  
  event.preventDefault(); 
  file = event.dataTransfer.files[0];
  showFile(file);
});

async function showFile(){
  error.setAttribute("class","col-md-6 error d-none")
  error2.setAttribute("class","col-md-6 error2 d-none")
  resultholder.setAttribute("class","col-md-6 d-none")
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if(validExtensions.includes(fileType)){
    let fileReader = new FileReader();
    var fileurl;
    fileReader.onload = async()=>{
      fileurl = fileReader.result;
      let imgTag = `<img src="${fileurl}" alt="" width="30%" height="40%">`;
      dropArea.innerHTML = imgTag; 
    var url = "http://127.0.0.1:5000/classify"; 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    try{
      const res=await fetch(url,{
          method: 'POST',
          headers: headers,
          body:JSON.stringify({img_data:fileurl})
    });
    const data=await res.json();
    if(data[0]!==undefined){
        resultholder.setAttribute("class","col-md-6")
        document.getElementById('score_joe_biden').innerText=data[0]['class_probability'][0]
        document.getElementById('score_narendra_modi').innerText=data[0]['class_probability'][1]
        document.getElementById('score_putin').innerText=data[0]['class_probability'][2]
        document.getElementById('score_shehbaz_sharif').innerText=data[0]['class_probability'][3]
        document.getElementById('score_xi_jinping').innerText=data[0]['class_probability'][4]
    }
    else{
      error.setAttribute("class","col-md-6 error")
    }


  }
  catch(error){
    console.log(error); 
  }
    }
    fileReader.readAsDataURL(file);

  }
  else{
    error2.classList.remove("d-none");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}