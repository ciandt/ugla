import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';

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
  @Input() pondOptions: {multiple: false};

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

  @Input() photosPerColumn = 2;

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
  @ViewChild('myPond') instance !: any;

  constructor() {
  }

  /**
   * Function called on oninit event of file pond
   */
  pondHandleInit() {
  }

  /**
   * Function called on onaddfile event of file pond
   * @param event is a Event value
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
   * @param event is a Event value
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
   * @param event is a Event value
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
   * @param event is a Event value
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
   * @param event is a Event value
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
   * @param event is a Event value
   */
  pondHandleUpdateFiles(event: any) {
    if (event) {
      this.onUpdateFile.emit(event.items);
    }
  }

  /**
   * Function to browse files on enter key press
   * @param event is a Event value
   */
  browse(event: any) {
    if (event.keyCode === 13) {
      (this.element as HTMLDivElement).querySelector<HTMLInputElement>('.filepond--browser').focus();
      this.instance.browse();
    }
  }
}
