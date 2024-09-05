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
const removeItem = (e) => {
    if(e.target.parentElement.classList.contains('remove-item')) {
        if(confirm('Are you sure you want to remove this?')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
}
const clearItems = (e) => {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
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
    let itemsFromLocalStorage;
    if(localStorage.getItem('items') === null) {
        itemsFromLocalStorage = [];
    } else {
        itemsFromLocalStorage = JSON.parse(localStorage.getItem('items'));
    }
    itemsFromLocalStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromLocalStorage));
}
const addItemToDOM = (item) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
}
///////////////////////////////////////////////////////////////////////
//  Event Listeners For App
///////////////////////////////////////////////////////////////////////
itemForm.addEventListener('submit', onAddItem);
itemList.addEventListener('click', removeItem);
itemClear.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
///////////////////////////////////////////////////////////////////////
//  Accessory Functions For App
///////////////////////////////////////////////////////////////////////
checkUI();
///////////////////////////////////////////////////////////////////////
//  Local Storage For App
///////////////////////////////////////////////////////////////////////
