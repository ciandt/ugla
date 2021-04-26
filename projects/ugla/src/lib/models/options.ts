export class Options {
	public value: string;
	public description: string;
	public checked: boolean;
	public color: string;
	public groupName: string;

	constructor(
		description: string,
		value: string,
		checked?: boolean,
		color?: string,
		groupName?: string
	) {
		this.value = value;
		this.description = description;
		this.checked = checked;
		this.color = color;
		this.groupName = groupName;
	}
}
