    // This will hold url of image that is beign shown
    // to share url of image
    var imageUrl = '';


// Function to make a get request
async function Get(url) {

    const response = await fetch(url);
    if (response.status != 200) {
        throw new Error(response.status);
    }
    const data = await response.json();
    return data;
}

// Image Object to store preview and large image url, user's image and name and tags 

function ImageData(thumbnail, image, user, userImage, shareUrl) {
    this.thumbnail = thumbnail;
    this.image = image;
    this.user = user;
    this.userImage = userImage;
    this.shareUrl = shareUrl;
}

function parseJson(json) {
    let list = json.hits;
    let images = [];
    list.forEach(object => {
        let image = new ImageData(
            object.webformatURL,
            object.largeImageURL,
            object.user,
            object.userImageURL,
            object.pageURL
        );
        images.push(image);
    })
    return images;
}

function createImage(parent, imageData) {
    let imageContainer = $(document.createElement('div'));
    imageContainer.attr('class', 'image');
    let image = $(document.createElement('img'));
    image.attr('src', imageData.thumbnail);
    imageContainer.append(image);

    let overlay = $(document.createElement('div'));
    overlay.attr('class', 'image-overlay');
    imageContainer.append(overlay);

    let userImage = $(document.createElement('img'));
    userImage.attr({ 'class': 'avatar', 'src': imageData.userImage });
    overlay.append(userImage);

    let userName = $(document.createElement('p'));
    userName.attr('class', 'user-name');
    userName[0].innerText = imageData.user;
    overlay.append(userName);

    let viewBtn = $(document.createElement('button'));
    viewBtn[0].innerText = "View";
    viewBtn.attr('class', 'btn secondary-btn');
    overlay.append(viewBtn);

    viewBtn.on('click', function () {
        document.body.classList.add('overflow-hidden');
        let imageViewer = $('.image-viewer');
        imageViewer[0].classList.add('active');
        imageViewer.find('.preview').attr('src', imageData.image);
        imageViewer.css('top', window.scrollX);
        imageUrl = imageData.shareUrl;
    });

    image.on('load', function () {
        $(parent).append(imageContainer);
    });
}

function randomUrl() {
    return 'https://pixabay.com/api/?key=16863692-e8a0487c2233e2197e5751647&min_width=450&safesearch=true&per_page=50&editors_choice=true&page=' + Math.round(Math.random() * 10);
}

function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}