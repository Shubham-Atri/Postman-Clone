
// Utility functions:
// 1. Utility function to get DOM elements from string
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initialize number of parameters
let addedParamCount = 0;

// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';


})

// If the user clicks on json box, hide the parmas box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';

})

// If the user clicks on + button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="row g-2 my-2">
                    <label class="col-form-label col-sm-2 ">Parameter ${addedParamCount + 2}</label>
                    <div class=" col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} key">
                    </div>
                    <div class="col-md-4 ">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}"
                            placeholder="Enter Parameter ${addedParamCount + 2} value">
                    </div>
                    <button class="col btn btn-primary deleteParam" >-</button>
                </div>`;

    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        item.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;

})

// If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = 'Please wait... Fetching response...';
    document.getElementById('responsePrism').innerHTML = 'Please wait... Fetching response...';

    // fetch all the values user has entered
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='request']:checked").value;
    let contentType = document.querySelector("input[name='content']:checked").value;

   

    // If user has used params option instead of json, collect all the parameters in an object
    if(contentType == 'params'){
        data = {};
        for(let i = 0; i < addedParamCount+1; i++){
            if(document.getElementById('parameterKey' +(i+1)) != undefined){
            let key = document.getElementById('parameterKey' +(i+1)).value;
            let value = document.getElementById('parameterValue' +(i+1)).value;
            data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
    }

     // Log all the values in the console for debugging
     console.log('Url is: ', url);
     console.log('Request type is: ', requestType);
     console.log('Content type is: ', contentType);
     console.log('Data is: ', data);

    // If the request type is get, invoke the fetch api to create a post request
    if(requestType=='GET'){
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.text())
        .then((text)=>{
            //  document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();

        })
    }
    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response => response.text())
        .then((text)=>{
            //  document.getElementById('responseJsonText').value = text;
             document.getElementById('responsePrism').innerHTML = text;
             Prism.hightightAll();
        })
    }


     

})