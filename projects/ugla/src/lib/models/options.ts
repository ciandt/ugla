export class Options {
	public value: string;
	public description: string;
	public checked: boolean;
	public color: string;
	public groupName: string;
	public disabled: boolean;

	constructor(
		description: string,
		value: string,
		checked?: boolean,
		color?: string,
		groupName?: string,
		disabled: boolean = false
	) {
		this.value = value;
		this.description = description;
		this.checked = checked;
		this.color = color;
		this.groupName = groupName;
		this.disabled = disabled;
	}
}
