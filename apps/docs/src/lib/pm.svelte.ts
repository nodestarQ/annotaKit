export const managers = [
	{ name: 'npm', command: 'npm install annotakit' },
	{ name: 'pnpm', command: 'pnpm install annotakit' },
	{ name: 'yarn', command: 'yarn add annotakit' }
] as const;

let _active = $state(0);

export const pm = {
	get active() {
		return _active;
	},
	set active(i: number) {
		_active = i;
	},
	get command() {
		return managers[_active].command;
	}
};
