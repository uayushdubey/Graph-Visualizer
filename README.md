Graph Visualizer
This project is made for Semister 5 Project Based Learing.
Overview
Graph Visualizer is a web-based tool that allows users to visualize and interact with graphs. This tool demonstrates the working of popular graph traversal and pathfinding algorithms, namely Dijkstra's Algorithm, Breadth-First Search (BFS), and Depth-First Search (DFS). Users can see how these algorithms explore the graph and compute paths step-by-step.

Features
Visualize graph traversal and pathfinding in real time.
Supports three algorithms:
Dijkstra's Algorithm for shortest path
Breadth-First Search (BFS) for graph traversal
Depth-First Search (DFS) for graph traversal
Interactive interface for adding nodes and edges.
Allows the user to select a starting point for the algorithm.
Algorithms Explained
1. Dijkstra's Algorithm
Dijkstra's algorithm is used to find the shortest path between nodes in a graph. It works by exploring the graph and expanding the nearest unvisited node to accumulate the shortest distances from the source node.

Steps:

Start at the source node and initialize its distance to 0, with all other nodes' distances set to infinity.
Visit the nearest unvisited node and update its neighbors' distances.
Continue the process until all nodes have been visited.
Example: For a graph with nodes A, B, C, and edges:

A-B: 1
B-C: 2
A-C: 4
If you run Dijkstra from node A, the algorithm will find the shortest path from A to C via B (A -> B -> C with distance 3).
2. Breadth-First Search (BFS)
BFS is a graph traversal algorithm that explores the graph layer by layer. It starts at the selected node and visits all neighboring nodes before moving on to their neighbors.

Steps:

Start from a node (source) and visit all its immediate neighbors.
Once all neighbors are visited, visit their neighbors in the next layer.
Repeat until all nodes are visited.
Example: Consider a graph with nodes connected as:

A -> B, A -> C
B -> D, C -> E
If BFS is run starting from A, the traversal will be: A -> B -> C -> D -> E.
3. Depth-First Search (DFS)
DFS is a graph traversal algorithm that explores as far as possible along a branch before backtracking. It starts at a node and keeps going deeper into the graph until it cannot go further, then it backtracks.

Steps:

Start from the source node.
Visit a neighbor, and then a neighbor of that neighbor, going as deep as possible.
If no more unvisited neighbors remain, backtrack to explore other branches.
Example: For a graph with nodes connected as:

A -> B, A -> C
B -> D, C -> E
If DFS is run starting from A, the traversal could be: A -> B -> D -> C -> E (depending on the implementation).
Usage
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/graph-visualizer.git
Navigate to the project directory:
bash
Copy code
cd graph-visualizer
Run the application (depending on your setup, it could be a simple HTML file or a web server):
bash
Copy code
python -m http.server  # If using a Python local server
Open your browser and navigate to:
arduino
Copy code
http://localhost:8000
