///////////////////////////////////////////////////////////////////////
//  Variables For App
///////////////////////////////////////////////////////////////////////
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('item-clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;
///////////////////////////////////////////////////////////////////////
//  Helpful Functions For App
///////////////////////////////////////////////////////////////////////
const displayItems = () => {
    const itemsFromLocalStorage = getItemsFromLocalStorage();
    itemsFromLocalStorage.forEach(item => addItemToDOM(item));
    resetUI();
}
const onAddItem = (e) => {
    e.preventDefault();
    const newItem = itemInput.value;
    if(newItem === '') {
        alert('Please add a grocery item.');
        return;
    }
    if(isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromLocalStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if(checkIfItemExists(newItem)) {
            alert('That item already exists.');
            return;
        }
    }
    addItemToDOM(newItem);
    addItemToLocalStorage(newItem);
    resetUI();
    itemInput.value = '';
}
const onClickItem = (e) => {
    if(e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}
const checkIfItemExists = (item) => {
    const itemsFromLocalStorage = getItemsFromLocalStorage();
    return itemsFromLocalStorage.includes(item);
}
const setItemToEdit = (item) => {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent;
}
const removeItem = (item) => {
    if(confirm('Are you sure you want to delete this item?'));
    item.remove();
    removeItemFromLocalStorage(item.textContent);
    resetUI();
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
    resetUI();
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
const resetUI = () => {
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if(items.length === 0) {
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block';
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
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
    resetUI();
}
///////////////////////////////////////////////////////////////////////
//  Initialize Call To Start App
///////////////////////////////////////////////////////////////////////
init();