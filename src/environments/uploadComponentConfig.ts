export const uploadComponentConfig = {
    name: 'file',
    instantUpload: false,
    imageTransformOutputQuality: 20,
    imagePreviewHeight: 300,
    multiple: true,
    styleButtonRemoveItemPosition: 'center bottom',
    labelButtonRemoveItem: 'Remove File',
    maxFileSize: '5Mb',
    allowFileSizeValidation: true,
    labelIdle: '<i class="material-icons">insert_photo</i>',
    acceptedFileTypes: 'image/jpeg, image/png, application/pdf',
    server: {
      url: '/',
      process: (fieldName, file, metadata, load, error, progress, abort) => {
          // fieldName is the name of the input field
            // file is the actual file object to send
            const formData = new FormData();
            formData.append(fieldName, file, file.name);
  
  
            const request = new XMLHttpRequest();
  
            request.withCredentials = false;
            request.open('POST', '/');
            request.setRequestHeader('Authorization', JSON.parse(localStorage.getItem('currentUser')).apiToken);
            // Should call the progress method to update the progress to 100% before calling load
            // Setting computable to false switches the loading indicator to infinite mode
            request.upload.onprogress = (e) => {
                progress(e.lengthComputable, e.loaded, e.total);
            };
  
            // Should call the load method when done and pass the returned server file id
            // this server file id is then used later on when reverting or restoring a file
            // so your server knows which file to return without exposing that info to the client
            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    // the load method accepts either a string (id) or an object
                    load(JSON.parse(request.responseText).file);
                } else {
                    // Can call the error method if something is wrong, should exit after
                    error('oh no');
                }
            };
  
            request.send(formData);
  
            // Should expose an abort method so the request can be cancelled
            return {
                abort: () => {
                    // This function is entered if the user has tapped the cancel button
                    request.abort();
  
                    // Let FilePond know the request has been cancelled
                    abort();
                }
            };
      },
      revert: '/undo',
      restore: '/restore/',
      load: '/load/',
      fetch: '/fetch/',
    }
  };
  