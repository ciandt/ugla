export class ListOptionsItem {
  name: string;
  active: boolean;

  constructor(name: string = null, active: boolean = true) {
    this.name = name;
    this.active = active;
  }
}
