
let main_wrapper = document.getElementById('main');
// console.log(main_wrapper);


let fetch_url = 'https://www.googleapis.com/books/v1/volumes?q=react?maxResults=40';

// fetch(fetch_url)

// .then((response)=>{
//     return response.json();
// })

// .then((data)=>{
//     // console.log(data.items);
//     data.items.map(ids=>{
//         // console.log(ids.volumeInfo);
//         let {title,imageLinks,contentVersion,publisher} = ids.volumeInfo;

//         let templateString = `<div class="card" style="width: 18rem;">
//             <img src="${imageLinks.thumbnail}" class="card-img-top img-fluid" alt="...">
//             <div class="card-body">
//             <p class="card-text">${contentVersion}</p>
//               <h6>${title}</h6>
//               <h4 class="mb-3">${publisher}<h4>
//               <a href="#" class="btn btn-primary">ADDING</a>
//             </div>
//         </div>`;
//         main_wrapper.insertAdjacentHTML('beforeend',templateString);
        
//     });
// })




// By Creating Two Functons 


async function getData(url){

    try{
        let response = await fetch(url);

        let data = await response.json();
        // console.log(data);
        appendData(data);
    }

    catch{
        console.log('Error');
    }
    
    
}

getData(fetch_url);



function appendData(data){
    data.items.map(ids=>{
        // console.log(ids.volumeInfo);
        let {title,imageLinks,contentVersion,publisher} = ids.volumeInfo;

        let templateString = `<div class="card" style="width: 18rem;">
            <img src="${imageLinks.thumbnail}" class="card-img-top img-fluid" alt="...">
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

