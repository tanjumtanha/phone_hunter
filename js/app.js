const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display 9 phone only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // display no phone
    const noPhone = document.getElementById('no-phone-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4 ">
        <img src="${phone.image}" class="card-img-top p-3 img-fluid" alt="...">
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in
        to additional content. This content is a little bit longer.</p>
        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>
        </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv);
    });

    // stop loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}
// handel search button click
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(9);
    //searchField.value = '';
})

// search input field input key
document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        processSearch(9);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone =>{
       const modalTitle = document.getElementById('phoneDetailModalLabel');
       modalTitle.innerText= phone.name; 
       const phoneDetail = document.getElementById('phone-details');
       phoneDetail.innerHTML = `
       <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date'}</p>
       <p>Memory: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'Sorry'}</p>
       <p>Detail: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'Sorry'}</p>
       `
}
loadPhone('phone');