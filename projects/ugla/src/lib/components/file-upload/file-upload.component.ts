import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';

/**
 * File upload component
 *
 * This component generates a element for uploading file.
 *
 * # Example
 ```html
 <ugl-file-upload [options]="options"
 (uploadPath)="getUploadPath($event)
 (onAddFile)="onAddFile($event)
 (onRemoveFile)="onRemoveFile($event)
 (onUpdateFile)="onUpdateFile($event)
 [id]="'id'"></ugl-file-upload>
 ```
 ```typescript
 let pondOptions = {
      name: 'file',
      instantUpload: false,
      imageTransformOutputQuality: 20,
      imagePreviewHeight: 300,
      multiple: false,
      styleButtonRemoveItemPosition: 'center bottom',
      styleButtonProcessItemPosition: 'center',
      labelButtonRemoveItem: 'Remove File',
      maxFileSize: '500kb',
      allowFileSizeValidation: true,
      labelIdle: '<i class="material-icons">insert_photo</i>',
      acceptedFileTypes: 'image/jpeg, image/png, application/pdf',
      server: {
        url: 'http://localhost:9000/api/v1',
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          // fieldName is the name of the input field
          // file is the actual file object to send
          const formData = new FormData();
          formData.append(fieldName, file, file.name);
          const request = new XMLHttpRequest();
          request.open('POST', 'http://localhost:9000/api/v1/upload');
          // Should call the progress method to update the progress to 100% before calling load
          // Setting computable to false switches the loading indicator to infinite mode
          request.upload.onprogress = (e) => {
              progress(e.lengthComputable, e.loaded, e.total);
          };
          // Should call the load method when done and pass the returned server file id
          // this server file id is then used later on when reverting or restoring a file
          // so your server knows which file to return without exposing that info to the client
          request.onload = function() {
              if (request.status >= 200 && request.status < 300) {
                // the load method accepts either a string (id) or an object
                load(request.responseText);
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
 ```
 */
@Component({
  selector: 'ugl-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, AfterViewInit {

  /**
   * Component embedded label
   */
  @Input() label?: string;

  /**
   * Object pontOptions
   */
  @Input() pondOptions: object;

  /**
   * Text to attribute id
   */
  @Input() id: string;

  /**
   * Is required
   *
   * Default: false
   */
  @Input() required: boolean;

  /**
   * Object with error messages
   */
  @Input() messages: {};

  /**
   * Set message
   */
  @Input() infoMessage: string;

  /**
   * Set initial files
   */
  @Input() files: any;

  /**
   *  Emitter uploadPath function
   */
  @Output() onUploadPath = new EventEmitter<string>();

  /**
   *  Emitter on handleAddFile function.
   */
  @Output() onAddFile = new EventEmitter<boolean>();

  /**
   * Emmiter on handleRemoveFile.
   * @return true when a file was removed
   */
  @Output() onRemoveFile = new EventEmitter<boolean>();

  /**
   * Emmiter on handleUpdateFile.
   * A file has been added or removed.
   * @return a list of file items
   */
  @Output() onUpdateFile = new EventEmitter<Object[]>();

  /**
   * Indicates if file is valid.
   */
  public isFileValid: boolean;

  /**
   * Parent element
   */
  private element: Element;

  public valid = true;

  /**
   * Instance of file pond
   */
  @ViewChild('myPond') instance: any;

  constructor() {
  }

  /**
   * Function called on oninit event of file pond
   */
  pondHandleInit() {
  }

  /**
   * Function called on onaddfile event of file pond
   * @param event
   */
  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
    if (event) {
      if (event.error || event.status) {
        this.isFileValid = false;
      } else {
        this.isFileValid = true;
      }

      this.onAddFile.emit(true);
      this.addPreview(event);
      this.handleError(event);
    }
  }

  /**
   * Function called on onprocessfile event of file pond
   * @param event
   */
  pondHandleProcessFile(event: any) {
    console.log('A file was processed', event);
    if (this.instance.getFile()) {
      this.onUploadPath.emit(this.instance.getFile().serverId);
    }
  }

  /**
   * Set initial configurations
   */
  ngOnInit() {
    console.log('FilePond has initialised');
    this.label = (this.label === undefined) ? '' : this.label;
    this.required = (this.required === undefined) ? false : this.required;
  }

  /**
   * Set configurations after view is initialized
   */
  ngAfterViewInit() {
    this.element = document.querySelector(`#${this.id}`);
  }

  /**
   * Add a preview, case it doesn't have.
   * @param event
   */
  addPreview(event: any) {
    if (!event.error && !event.status) {
      this.element = document.querySelector(`#${this.id}`);
      const file = this.element.querySelector('.filepond--file');
      const preview = this.element.querySelector('.filepond--image-preview-wrapper') || null;
      if (!preview && event.file.fileExtension === 'pdf') {
        file.insertAdjacentHTML('beforeend', '<div class="preview"><i class="material-icons">picture_as_pdf</i></div>');
      }
    }
  }

  /**
   * Error on adding file. Handle error messages.
   * @param event
   */
  handleError(event: any) {
    this.element = document.querySelector(`#${this.id}`);
    const fileWrapper = this.element.querySelector('.filepond--wrapper');
    if (event.error || event.status) {
      fileWrapper.classList.add('error');
      this.valid = false;
    } else {
      fileWrapper.classList.remove('error');
      this.valid = true;
    }
  }

  /**
   * A file has been removed, emit remove event
   * @param event
   */
  pondHandleRemoveFile(event: any) {
    if (event) {
      this.onRemoveFile.emit(true);
      const fileWrapper = this.element.querySelector('.filepond--wrapper');
      fileWrapper.classList.remove('error');
    }
  }

  /**
   * A file has been added or removed, receives a list of file items
   * @param event
   */
  pondHandleUpdateFiles(event: any) {
    if (event) {
      this.onUpdateFile.emit(event.items);
    }
  }

  /**
   * Function to browse files on enter key press
   * @param event
   */
  browse(event: any) {
    if (event.keyCode === 13) {
      (this.element as HTMLDivElement).querySelector<HTMLInputElement>('.filepond--browser').focus();
      this.instance.browse();
    }
  }
}
