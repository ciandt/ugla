import { Link } from './link';

export class List {
	public name: string;
	public links: Link[];

	constructor(name: string, links?: Link[]) {
		this.name = name;
		this.links = links;
	}
}
