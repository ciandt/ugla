export const uploadComponentConfig = {
    name: 'file',
    instantUpload: false,
    imageTransformOutputQuality: 20,
    imagePreviewHeight: 300,
    multiple: false,
    styleButtonRemoveItemPosition: 'center bottom',
    labelButtonRemoveItem: '', // Empty for X icon
    maxFileSize: '5Mb',
    allowFileSizeValidation: true,
    labelIdle: '<i class="material-icons">insert_photo</i>',
    acceptedFileTypes: 'image/jpeg, image/png, application/pdf',
    allowImageValidateSize: true,
    imageValidateSizeMinWidth: 500,
    imageValidateSizeMaxWidth: 1000,
    imageValidateSizeMinHeight: 500,
    imageValidateSizeMaxHeight: 1000,
    imageValidateSizeLabelExpectedMinSize: 'O tamanho minímo é de {minWidth}px × {minHeight}px',
    server: {
      url: '/',
      process: (fieldName, file, metadata, load, error, progress, abort) => {
         console.log(file);
      },
      revert: '/undo',
      restore: '/restore/',
      load: '/load/',
      fetch: '/fetch/',
    }
  };
  