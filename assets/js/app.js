///////////////////////////////////////////////////////////////////////
//  Variables For App
///////////////////////////////////////////////////////////////////////
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

///////////////////////////////////////////////////////////////////////
//  Helpful Functions For App
///////////////////////////////////////////////////////////////////////
const addItem = (e) => {
    e.preventDefault();
    //validate input
    const newItem = itemInput.value;
    if(newItem === '') {
        alert('Please add a grocery item.');
        return;
    }
    //create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value = '';
}
//Create button functionally
const createButton = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
//Create icon functionally
const createIcon = (classes) => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}


///////////////////////////////////////////////////////////////////////
//  Event Listeners For App
///////////////////////////////////////////////////////////////////////
itemForm.addEventListener('submit', addItem);