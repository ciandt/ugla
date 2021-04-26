import { Options } from './options';

export class Select {
	public name: string;
	public id: string;
	public labelBackgroundColor: string;
	public labelColor: string;
	public options: Options[];

	constructor(
		name: string,
		options: Options[],
		labelColor?: string,
		labelBackgroundColor?: string
	) {
		this.name = name;
		this.id = `select-${name}`;
		this.options = options;
		this.labelColor = labelColor;
		this.labelBackgroundColor = labelBackgroundColor;
	}
}
