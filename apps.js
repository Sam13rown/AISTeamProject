const inputLink = document.getElementById("input-link");
const addLink = document.getElementById("add-link");
const appContainer = document.getElementById("app-container");
const inputImg = document.getElementById("input-img");
const toggleDelete = document.getElementById("toggle-delete");

let apps = localStorage.getItem('apps') ? JSON.parse(localStorage.getItem('apps')) : [];

console.log(localStorage);
console.log(apps);

let deleting = false;
toggleDelete.addEventListener('click', () =>{
    if(deleting){
        deleting = false;
        toggleDelete.innerText = "Link";
        console.log(deleting);
    }
    else{
        deleting = true;
        toggleDelete.innerText = "Delete";
        console.log(deleting);
    }
});

for(savedApp of apps){
    let app = document.createElement("button");
    
    app.classList.add("app");
    let link = savedApp.href;
    app.addEventListener('click', function(){
        if(deleting){
            apps = apps.filter(e => e.href != link);
            localStorage.setItem('apps', JSON.stringify(apps));
            console.log(localStorage);
            console.log(apps);
            app.remove()
        }
        else{
            window.location = link;
        }
    });

    let image = document.createElement("img");
    image.classList.add("app-img");
    image.src = savedApp.img;
    app.appendChild(image);

    appContainer.appendChild(app);
}

addLink.addEventListener('click', function(){
    if(!(isValidUrl(inputLink.value))){
        alert("The website link you entered is not valid!");
        inputLink.value = "";
        return
    }
    if(!(isValidUrl(inputImg.value))){
        alert("The image url you entered is not valid!");
        inputImg.value = "";
        return
    }

    let app = document.createElement("button");
    app.classList.add("app");
    app.href = inputLink.value;
    inputLink.value = "";
    app.addEventListener('click', function(){
        if(deleting){
            apps = apps.filter(e => e.href != app.href);
            localStorage.setItem('apps', JSON.stringify(apps));
            console.log(localStorage);
            console.log(apps);
            app.remove();
        }
        else{
            window.location = app.href;
        }
    });

    let image = document.createElement("img");
    image.classList.add("app-img");
    image.src = inputImg.value;
    inputImg.value = "";
    app.appendChild(image);

    apps.push({
        href: app.href,
        img: image.src
    });

    localStorage.setItem('apps', JSON.stringify(apps));


    appContainer.appendChild(app);

    function isValidUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return true;
    }
});      