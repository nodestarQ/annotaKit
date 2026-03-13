export const managers = [
	{ name: 'npm', command: 'npm install annotakit', installMcp: 'npm install @annotakit/mcp' },
	{ name: 'pnpm', command: 'pnpm add annotakit', installMcp: 'pnpm add @annotakit/mcp' },
	{ name: 'yarn', command: 'yarn add annotakit', installMcp: 'yarn add @annotakit/mcp' }
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
	},
	get installMcp() {
		return managers[_active].installMcp;
	}
};
