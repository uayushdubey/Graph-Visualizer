// Importing functions
import {
	createEmptyBoard,
	createBoard,
	changeStart,
	changeEnd,
	refreshBoard,
	refreshEmptyBoard,
} from './createGrid.js';
import {
	setWallAttribute
} from './wall.js';
import {
	dijkstra
} from './pathFindingAlgorithms/dijkstra.js';
import {
	bfs // Import the bfs function from bfs.js
} from './pathFindingAlgorithms/bfs.js'; // Make sure the path is correct
import {
	dfs
} from './pathFindingAlgorithms/dfs.js';

// Variables
var resetbtn = document.querySelector('.reset');
var refreshbtn = document.querySelector('.refresh');
var startbtn = document.querySelector('.start');
var container = document.querySelector('.container');
var weightbtn = document.getElementById('weight');
var algobtn = document.getElementById('algo');

// Export variables
export var rowsize = 20;
export var colsize = 40;
export var startRow = 10;
export var endRow = 10;
export var startCol = 10;
export var endCol = 30;
export var mouseIsDown = false;
export var weighttype = weightbtn.options[weightbtn.selectedIndex].value;
export var algorithm = algobtn.options[algobtn.selectedIndex].value;

// Initializing eventListeners
resetbtn.addEventListener('click', reset);
startbtn.addEventListener('click', start);
refreshbtn.addEventListener('click', refresh);
container.addEventListener('mousedown', function () {
	mouseIsDown = true;
});
container.addEventListener('mouseup', function () {
	mouseIsDown = false;
});
container.addEventListener('mouseover', setWallAttribute);
weightbtn.addEventListener('change', updateweight);
algobtn.addEventListener('change', updatealgo);

// Reset function
function reset() {
	location.reload();
} // End refresh

// Refresh function
function refresh() {
	container.addEventListener('mousedown', setWallAttribute);
	container.addEventListener('mouseup', setWallAttribute);
	container.addEventListener('mouseover', setWallAttribute);
	if (weighttype == 'Unweighted') refreshEmptyBoard();
	else refreshBoard();
	startbtn.style.visibility = 'visible';
} // End refresh function

function updateweight() {
    weighttype = weightbtn.options[weightbtn.selectedIndex].value;
    if (weighttype == 'Unweighted') {
        refreshEmptyBoard();
    } else {
        if (algorithm !== 'Dstr' && algorithm !== 'bfs' && algorithm !== 'dfs') {
            algobtn.value = 'Dstr';
            algorithm = algobtn.options[algobtn.selectedIndex].value;
        }

        refreshBoard();
    }
    changeStart(10, 10);
    changeEnd(10, 30);
}


function updatealgo() {
	algorithm = algobtn.options[algobtn.selectedIndex].value;
	if (algorithm !== 'Dstr') {
		weightbtn.value = 'Unweighted';
		weighttype = weightbtn.options[weightbtn.selectedIndex].value;
		refreshEmptyBoard();
	} else if (algorithm === 'Dstr') {
		if (weightbtn.value === 'Unweighted') refreshEmptyBoard();
		else refreshBoard();
	}
	changeStart(10, 10);
	changeEnd(10, 30);
}

function start() {
	console.log(algorithm);
	if (algorithm === 'Dstr') {
		dijkstra(startRow, startCol, endRow, endCol);
	} else if (algorithm === 'bfs') { 
		bfs(startRow, startCol, endRow, endCol);
	} else if (algorithm === 'dfs') {
		dfs(startRow, startCol, endRow, endCol);
	}
} 

// Initialize
window.onload = () => {
	container.addEventListener('mousedown', setWallAttribute);
	container.addEventListener('mouseup', setWallAttribute);
	container.addEventListener('mouseover', setWallAttribute);
	if (weighttype === 'Unweighted') createEmptyBoard();
	else createBoard();
	changeStart(10, 10);
	changeEnd(10, 30);
}; 
