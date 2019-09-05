function showLoading() {
    swal({
        // imageUrl: "assets/img/grow-tree.gif",
        title: "Loading Photo...",
        // text: "Please wait",
        timer: 7000,
        showConfirmButton: false
        // type: "success"
    })
}

function showSuccess() {
    swal({
        // imageUrl: "assets/img/grow-tree.gif",
        title: "Successfully Added",
        // text: "Please wait",
        timer: 7000,
        showConfirmButton: false,
        type: "success"
    })
}

function showUpdate() {
    swal({
        // imageUrl: "assets/img/grow-tree.gif",
        title: "Successfully Updated",
        // text: "Please wait",
        timer: 4000,
        showConfirmButton: false,
        type: "success"
    })
}

function showDeleteSuccess() {
    swal({
        // imageUrl: "assets/img/grow-tree.gif",
        title: "Successfully Deleted",
        // text: "Please wait",
        timer: 4000,
        showConfirmButton: false,
        type: "success"
    })
}

function showPhotoError() {
    swal({
        title: "Photo size too large!",
        text: "Please choose another photo",
        timer: 3000,
        showConfirmButton: false,
        type: "error"
    })
}

function showPhotoLoading() {
    swal({
        imageUrl: "assets/img/icons/loader.gif",
        imageWidth: '90',
        imageHeight: '90',
        timer: 9000,
        showConfirmButton: false
    })
}