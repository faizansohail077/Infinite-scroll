const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []
const count = 3
let ready = false
let imageLoaded = 0
let totalImages = 0
const api_key = 'e923KpGPUCdI6IpaW0dkND6YoW34xHoNdUat6E1secw'
const api = `https://api.unsplash.com/photos/random/?client_id=${api_key}&count=${count}`

//loader function 
function imageLoader() {
    imageLoaded++;
    if (imageLoaded === totalImages) {
        ready = true
        loader.hidden = true
    }
    else {
        ready = false
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}


//get element phots
function displatPhotos() {
    imageLoaded = 0
    totalImages = photosArray.length
    photosArray.forEach((photo) => {
        const item = document.createElement('a')
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular
        })
        img.addEventListener('load', imageLoader)
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)
        item.appendChild(img)
        imageContainer.appendChild(item)

    })
}

async function getPhotos() {
    try {
        const response = await fetch(api)
        photosArray = await response.json()
        displatPhotos()
    }
    catch (err) {

    }
}
getPhotos()


//scroll functionality 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos()
        ready = false
    }
})
