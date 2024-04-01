const loadPhone = async (searchText='iphone', isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerHTML = '';
    const showContainer = document.getElementById('show-all-container');
    if (phones.length > 10 && !isShowAll) {
        showContainer.classList.remove('hidden')
    }
    else { showContainer.classList.add('hidden') }
    // console.log('show all button has been clicked',isShowAll);
    if (!isShowAll) {
        phones = phones.slice(0, 15)
    }
    phones.forEach(phone => {
        // console.log(phone);
        const phoneData = document.createElement('div');
        phoneData.innerHTML =
            `
        <div class="flex flex-col items-center w-[400px] p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
        <img class="rounded-t-lg" src="${phone.image}"" />
        </a>
        <div class="p-5">
        <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${phone.phone_name}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${phone.slug}</p>
        <a href="#" onclick="handleShowDetails('${phone.slug}'),
        my_modal_1.showModal()" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        </a>
        </div>
        </div>
        `;
        phoneContainer.appendChild(phoneData)
    })
    toggleLoadingSpinner(false)
}
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll)
}
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else { loadingSpinner.classList.add('hidden') }
}
const handleShowAll = () => {
    handleSearch(true)
}
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data
    console.log(phone);
    displayPhoneDetails(phone)
}
const displayPhoneDetails = (phone) => {
    onclick = "my_modal_1.showModal()"
    document.getElementById('phone-name').innerText = phone.name
    document.getElementById('phone-details').innerHTML =
    `<img class="rounded-t-lg w-32 mx-auto" src="${phone.image}"" />
     <p class="text-xl font-bold">Brand: ${phone.brand}</p>
     <p class="text-xl font-bold">Release Date: ${phone.releaseDate}</p>
     <p class="text-xl font-bold">Release Date: ${phone.slug}</p>
     <P class="text-2xl font-bold">MainFeatures: </p>
     <div class="flex flex-col gap-2 text-lg">     
     <p class="font-medium"><span class="font-bold">ChipSet:</span> ${phone.mainFeatures.chipSet}</p> 
     <p class="font-medium"><span class="font-bold">DisplaySize:</span> ${phone.mainFeatures.displaySize}</p>  
     <p class="font-medium"><span class="font-bold">Memory:</span> ${phone.mainFeatures.memory}</p> 
     <p class="font-medium"><span class="font-bold">Sensors:</span> ${phone.mainFeatures.sensors}</p> 
     <p class="font-medium"><span class="font-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
     </div>`
}
loadPhone()

