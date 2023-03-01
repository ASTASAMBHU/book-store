const main_wrapper = document.getElementById('main');
const serchInput = document.getElementById('serchInput');
const selectDropdown = document.getElementById('selectDropdown');

let query = 'react';
function fetchUrl(query){
    const fetch_url = 'https://www.googleapis.com/books/v1/volumes?q='+query+'?maxResults=40';
    return fetch_url;
}

async function getData(url){

    try{
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
    data.map(ids=>{
        const {title,imageLinks,contentVersion,publisher,publishedDate} = ids.volumeInfo;
        const showYear = new Date(publishedDate).getFullYear();
        const templateString = `<div class="card" style="width: 18rem;">
            <img src="${imageLinks.thumbnail}" class="img-fluid" alt="Card Top Image">
            <div class="card-body p-0">
                <p class="card-text mt-3 content-version">${contentVersion}</p>
                <h6 class="title">${title}</h6>
                <h4 class="mb-3 publisher">${publisher}<h4>
            </div>
            <p class="show-date">${showYear}</p>
        </div>`;
        main_wrapper.insertAdjacentHTML('beforeend',templateString);          
    });   
}

async function showData(){
    let dataStore = await getData(fetchUrl(query));
    appendData(dataStore.items);
}
showData();

serchInput.addEventListener('input',async function(e){
    let query = e.target.value;
    let dataStore = await getData(fetchUrl(query));
    appendData(dataStore.items);
    
});

async function filterByYear(data,val){
    let dataFilter = data.items.filter((currData)=>{
        const yearShow = new Date(currData.volumeInfo.publishedDate).getFullYear();
        return yearShow == val; 
        
    });
    return dataFilter;
}

selectDropdown.addEventListener('change',async function(e){
    const selectDropdowns = e.target.value;
    const url = fetchUrl('react');
    const data = await getData(url);
    const dataYearfilter = await filterByYear(data,selectDropdowns);
    appendData(dataYearfilter);
});

