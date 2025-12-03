const width = 10;

const iTetrominoe = [
	[0, 1, 2, 3],
	[0, width, width * 2, width * 3],
	[0, 1, 2, 3],
	[0, width, width * 2, width * 3]
];

const oTetrominoe = [
	[0, 1, width, width + 1],
	[0, 1, width, width + 1],
	[0, 1, width, width + 1],
	[0, 1, width, width + 1]
];

const tTetrominoe = [
	[0, 1, 2, width + 1],
	[1, width, width + 1, width * 2 + 1],
	[1, width, width + 1, width + 2],
	[0, width, width + 1, width * 2]
];

const jTetrominoe = [
	[0, 1, width, width*2],
	[0, 1, 2, width + 2],
	[1, width + 1, width * 2, width * 2 + 1],
	[0, width, width + 1, width + 2]
];

const lTetrominoe = [
	[0, 1, width + 1, width * 2 + 1],
	[2, width, width + 1, width + 2],
	[0, width, width * 2, width * 2 + 1],
	[0, 1, 2, width]
];

const sTetrominoe = [
	[0, width, width + 1, width * 2 + 1],
	[1, 2, width, width + 1],
	[0, width, width + 1, width * 2 + 1],
	[1, 2, width, width + 1]
];

const zTetrominoe = [
	[1, width, width + 1, width * 2],
	[0, 1, width + 1, width + 2],
	[1, width, width + 1, width * 2],
	[0, 1, width + 1, width + 2]
];