
let main_wrapper = document.getElementById('main');

let serchInput = document.getElementById('serchInput');


var query = 'react';

function fetchUrl(query){
    console.log(query)
    var fetch_url = 'https://www.googleapis.com/books/v1/volumes?q='+query+'?maxResults=40';
    return fetch_url;
}




async function getData(url){

    try{
        console.log(url);
        let response = await fetch(url);

        let data = await response.json();
        return data;
    }

    catch{
        console.log('Error');
    }
    
    
}




function appendData(data){
    main_wrapper.innerHTML="";
    data.items.map(ids=>{
        let {title,imageLinks,contentVersion,publisher} = ids.volumeInfo;

        let templateString = `<div class="card" style="width: 18rem;">
            <img src="${imageLinks.thumbnail}" class="card-img-top img-fluid" alt="Card Top Image">
            <div class="card-body">
            <p class="card-text">${contentVersion}</p>
                <h6>${title}</h6>
                <h4 class="mb-3">${publisher}<h4>
                <a href="#" class="btn btn-primary">ADDING</a>
            </div>
        </div>`;
        main_wrapper.insertAdjacentHTML('beforeend',templateString);
                
    });   
}


async function showData(){
    let dataStore = await getData(fetchUrl(query));
    console.log(dataStore);
    appendData(dataStore);
}
showData();


serchInput.addEventListener('input',async function(e){
    var query = e.target.value;
    console.log(query);    
    let dataStore = await getData(fetchUrl(query));
    appendData(dataStore);
});

