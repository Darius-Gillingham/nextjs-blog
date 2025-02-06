import React, { useState } from "react";
import { Stage, Layer, Circle, Line, Text } from "react-konva";

const GraphVisualizer = () => {
    const [nodes, setNodes] = useState([
        { id: 0, x: 200, y: 50 },
        { id: 1, x: 100, y: 150 },
        { id: 2, x: 300, y: 150 },
        { id: 3, x: 50, y: 250 },
        { id: 4, x: 150, y: 250 },
        { id: 5, x: 250, y: 250 },
        { id: 6, x: 350, y: 250 },
        { id: 7, x: 25, y: 350 },
        { id: 8, x: 75, y: 350 },
        { id: 9, x: 125, y: 350 },
        { id: 10, x: 175, y: 350 },
        { id: 11, x: 225, y: 350 },
        { id: 12, x: 275, y: 350 },
        { id: 13, x: 325, y: 350 },
        { id: 14, x: 375, y: 350 },
      ]);
      
      const [edges, setEdges] = useState([
        [0, 1], [0, 2],
        [1, 3], [1, 4],
        [2, 5], [2, 6],
        [3, 7], [3, 8],
        [4, 9], [4, 10],
        [5, 11], [5, 12],
        [6, 13], [6, 14],
        
      ]);
      

  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);

  const adjacencyList: { [key: number]: number[] } = nodes.reduce(
    (acc: { [key: number]: number[] }, node) => {
      acc[node.id] = [];
      return acc;
    },
    {}
  );

  edges.forEach(([from, to]) => {
    adjacencyList[from].push(to);
    adjacencyList[to].push(from);
  });

  const resetGraph = () => {
    setVisitedNodes([]);
  };

  const dfs = (startNode: number) => {
    const visited: number[] = [];
    const stack: number[] = [startNode];
  
    const visitNode = (node: number) => {
      if (!visited.includes(node)) {
        visited.push(node);
        setVisitedNodes((prev) => [...prev, node]);
      }
    };
  
    const processStack = () => {
      if (stack.length === 0) {
        // Reset the graph after 1 second
        setTimeout(resetGraph, 1000);
        return;
      }
  
      const node = stack.pop()!;
      visitNode(node);
  
      // Reverse the adjacency list to prioritize left-most neighbors first
      const neighbors = [...adjacencyList[node]].reverse();
  
      neighbors.forEach((neighbor) => {
        if (!visited.includes(neighbor)) {
          stack.push(neighbor);
        }
      });
  
      // Delay the next step to visualize the search
      setTimeout(processStack, 100);
    };
  
    processStack();
  };
  

  const bfs = (startNode: number) => {
    const visited: number[] = [];
    const queue: number[] = [startNode];

    const visitNode = (node: number) => {
      if (!visited.includes(node)) {
        visited.push(node);
        setVisitedNodes((prev) => [...prev, node]);
      }
    };

    const processQueue = () => {
      if (queue.length === 0) {
        // Reset the graph after 5 seconds
        setTimeout(resetGraph, 1000);
        return;
      }

      const node = queue.shift()!;
      visitNode(node);

      adjacencyList[node].forEach((neighbor) => {
        if (!visited.includes(neighbor)) {
          queue.push(neighbor);
        }
      });

      // Delay the next step
      setTimeout(processQueue, 100);
    };

    processQueue();
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => dfs(0)}
          style={{
            border: "2px solid black",
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: "white",
            color: "black", // Button text color set to black
            cursor: "pointer",
          }}
        >
          Depth-First Search
        </button>
        <button
          onClick={() => bfs(0)}
          style={{
            border: "2px solid black",
            padding: "10px 20px",
            backgroundColor: "white",
            color: "black", // Button text color set to black
            cursor: "pointer",
          }}
        >
          Breadth-First Search
        </button>
      </div>
      <Stage width={500} height={400}>
        <Layer>
          {edges.map(([from, to], index) => (
            <Line
              key={index}
              points={[nodes[from].x, nodes[from].y, nodes[to].x, nodes[to].y]}
              stroke="black"
            />
          ))}
          {nodes.map((node) => (
            <Circle
              key={node.id}
              x={node.x}
              y={node.y}
              radius={20}
              fill={visitedNodes.includes(node.id) ? "blue" : "gray"}
              stroke="black"
            />
          ))}
          {nodes.map((node) => (
            <Text
              key={`text-${node.id}`}
              x={node.x - 5}
              y={node.y - 5}
              text={node.id.toString()}
              fontSize={15}
              fill="white"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default GraphVisualizer;

