// Dijkstra algorithm

// Importing functions
import {
	setWallAttribute
} from '../wall.js';
import {
	rowsize,
	colsize,
} from '../main.js';

// Variables
var container = document.querySelector('.container');
var slider = document.getElementById("speed");
var time = slider.value;

// Check if a node is valid
function check(row, col) {
	if (row >= 0 && col >= 0 && row < rowsize && col < colsize) return true;
	return false;
}

let fl = false; // A flag to stop traversal once the end is found

// Traverse function (DFS traversal)
function dfsTraversal(node, seen, parentMap, endNode) {
	let stack = [node]; // Stack for DFS traversal
	parentMap.set(node, null); // Start node has no parent
	seen.push(node); // Mark start node as visited

	while (stack.length > 0) {
		let current = stack.pop(); // Pop from stack (DFS behavior)
		let row = parseInt(current.getAttribute('row'));
		let col = parseInt(current.getAttribute('col'));

		// Color the current node as part of the traversal
		changeColor(current, seen.length); // Color the DFS path during traversal

		// Stop if we reach the end node
		if (current === endNode) {
			fl = true;
			return; // Exit if we've reached the end
		}

		// Get valid neighbors (up, down, left, right)
		let neighbors = [];
		if (check(row + 1, col)) neighbors.push(document.querySelector(`div[row="${row + 1}"][col="${col}"]`));
		if (check(row - 1, col)) neighbors.push(document.querySelector(`div[row="${row - 1}"][col="${col}"]`));
		if (check(row, col + 1)) neighbors.push(document.querySelector(`div[row="${row}"][col="${col + 1}"]`));
		if (check(row, col - 1)) neighbors.push(document.querySelector(`div[row="${row}"][col="${col - 1}"]`));

		// Traverse neighbors
		for (let neighbor of neighbors) {
			let wall = parseInt(neighbor.getAttribute('wall'));
			// If the neighbor is not seen and it's not a wall, visit it
			if (!seen.includes(neighbor) && wall !== 1) {
				seen.push(neighbor);
				parentMap.set(neighbor, current); // Track parent
				stack.push(neighbor); // Push neighbor onto stack for DFS
			}
		}
	}
}

// Animate the nodes during traversal (DFS path)
function changeColor(node, counter) {
	setTimeout(() => {
		node.setAttribute('class', 'Path_green'); // Set path color during DFS traversal
		node.innerHTML = counter; // Optional: show the step number
	}, counter * time);
}

// Backtrack from the end node to the start node and color the optimal path in burlywood
function colorOptimalPath(parentMap, endNode) {
	let pathNode = endNode;
	let counter = 0;

	// Backtrack from the end node to the start node
	while (pathNode != null) {
		setTimeout(() => {
			pathNode.setAttribute('class', 'Path_burlywood'); // Set optimal path color
		}, counter * time);
		pathNode = parentMap.get(pathNode); // Move to parent node
		counter++;
	}
}

export function dfs(x1 = 0, y1 = 0, x2 = rowsize - 1, y2 = colsize - 1) {
	time = slider.value;
	time = 40 + (time - 1) * (-2); // Adjust speed based on slider value
	container.removeEventListener('mousedown', setWallAttribute);
	container.removeEventListener('mouseover', setWallAttribute);

	// Get the start and end nodes
	var startNode = document.querySelector(`div[row='${x1}'][col='${y1}']`);
	var endNode = document.querySelector(`div[row='${x2}'][col='${y2}']`);

	// Hide buttons during traversal
	var btn = document.querySelector('.start');
	var refreshBtn = document.querySelector('.refresh');
	btn.style.visibility = 'hidden';
	refreshBtn.style.visibility = 'hidden';

	/* ########################## Modified DFS Algorithm ############################*/

	var seen = [];
	let parentMap = new Map(); // Map to track parent nodes
	fl = false;

	// Perform DFS traversal
	dfsTraversal(startNode, seen, parentMap, endNode);

	// After traversal, color the optimal path
	setTimeout(() => {
		if (fl) { // Check if the endNode was reached
			colorOptimalPath(parentMap, endNode); // Color the optimal path after traversal
			startNode.setAttribute('class', 'ends'); // Mark start node as "end"
			endNode.setAttribute('class', 'ends'); // Mark end node as "end"
		} else {
			console.log("No path found from start to end.");
		}
	}, seen.length * time + 100);

	// Show refresh button after traversal
	setTimeout(() => {
		refreshBtn.style.visibility = 'visible';
	}, seen.length * time + 200);
}
