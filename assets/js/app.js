///////////////////////////////////////////////////////////////////////
//  Variables For App
///////////////////////////////////////////////////////////////////////
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('item-clear');
const itemFilter = document.getElementById('filter');
///////////////////////////////////////////////////////////////////////
//  Helpful Functions For App
///////////////////////////////////////////////////////////////////////
const displayItems = () => {
    const itemsFromLocalStorage = getItemsFromLocalStorage();
    itemsFromLocalStorage.forEach(item => addItemToDOM(item));
    checkUI();
}
const onAddItem = (e) => {
    e.preventDefault();
    const newItem = itemInput.value;
    if(newItem === '') {
        alert('Please add a grocery item.');
        return;
    }
    addItemToDOM(newItem);
    addItemToLocalStorage(newItem);
    checkUI();
    itemInput.value = '';
}
const onClickItem = (e) => {
    if(e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }
}
const removeItem = (item) => {
    if(confirm('Are you sure you want to delete this item?'));
    item.remove();
    removeItemFromLocalStorage(item.textContent);
    checkUI();
}
const removeItemFromLocalStorage = (item) => {
    let itemsFromLocalStorage = getItemsFromLocalStorage();
    itemsFromLocalStorage = itemsFromLocalStorage.filter((i) => i !== item);
    localStorage.setItem('items', JSON.stringify(itemsFromLocalStorage));
}
const clearItems = (e) => {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem('items');
    checkUI();
}
const createButton = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
const createIcon = (classes) => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}
const filterItems = (e) => {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}
const checkUI = () => {
    const items = itemList.querySelectorAll('li');
    if(items.length === 0) {
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}
const addItemToLocalStorage = (item) => {
    const itemsFromLocalStorage = getItemsFromLocalStorage();
    itemsFromLocalStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromLocalStorage));
}
const getItemsFromLocalStorage = () => {
    let itemsFromLocalStorage;
    if(localStorage.getItem('items') === null) {
        itemsFromLocalStorage = [];
    } else {
        itemsFromLocalStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromLocalStorage;
}
const addItemToDOM = (item) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
}
///////////////////////////////////////////////////////////////////////
//  Initialize Function For App
///////////////////////////////////////////////////////////////////////
const init = () => {
    ///////////////////////////////////////////////////////////////////////
    //  Event Listeners For App
    ///////////////////////////////////////////////////////////////////////
    itemForm.addEventListener('submit', onAddItem);
    itemList.addEventListener('click', onClickItem);
    itemClear.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
    ///////////////////////////////////////////////////////////////////////
    //  Accessory Functions For App
    ///////////////////////////////////////////////////////////////////////
    checkUI();
}
///////////////////////////////////////////////////////////////////////
//  Initialize Call To Start App
///////////////////////////////////////////////////////////////////////
init();