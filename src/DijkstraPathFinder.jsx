import React, { useState, useEffect } from "react";
import { Play, RotateCcw, MapPin, Route, Search } from "lucide-react";

const DijkstraPathFinder = () => {
  const locationNames = {
    1: "Main Gate",
    2: "Administration Block",
    3: "Director's Office",
    4: "Academic Block A",
    5: "Academic Block B",
    6: "Computer Center",
    7: "Library",
    8: "Workshop Area",
    9: "Electrical Department",
    10: "Mechanical Department",
    11: "Civil Department",
    12: "Architecture Department",
    13: "Chemistry Department",
    14: "Physics Department",
    15: "Central Auditorium",
    16: "Student Activity Center",
    17: "Sports Complex",
    18: "Basketball Court",
    19: "Volleyball Court",
    20: "Tennis Court",
    21: "Cafeteria",
    22: "Guest House",
    23: "Health Center",
    24: "Post Office",
    25: "Bank",
    26: "ATM",
    27: "Shopping Complex",
    28: "Faculty Housing A",
    29: "Faculty Housing B",
    30: "Faculty Housing C",
    31: "Boys Hostel A",
    32: "Boys Hostel B",
    33: "Boys Hostel C",
    34: "Girls Hostel A",
    35: "Girls Hostel B",
    36: "Research Center",
    37: "Innovation Center",
    38: "Incubation Center",
    39: "Parking Area A",
    40: "Parking Area B",
    41: "Main Garden",
    42: "Zen Garden",
    43: "Amphitheater",
    44: "Open Air Theater",
    45: "Solar Panel Area",
    46: "Water Treatment Plant",
    47: "Electrical Substation",
    48: "Security Office",
    49: "Maintenance Office",
    50: "Transport Office",
    51: "Cycle Stand",
    52: "Bus Stand",
    53: "Main Road Junction",
    54: "North Gate",
    55: "East Gate",
    56: "West Gate",
    57: "South Gate",
    58: "Footpath Junction A",
    59: "Footpath Junction B",
    60: "Footpath Junction C",
    61: "Footpath Junction D",
    62: "Pedestrian Bridge",
    63: "Emergency Exit",
    64: "Back Gate"
  };

  const [graph] = useState({
    1: { 2: 262 },
    2: { 1: 262, 3: 330, 39: 262 },
    3: { 2: 330, 4: 130 },
    4: { 5: 200, 3: 130 },
    5: { 4: 200, 6: 66, 37: 157 },
    6: { 5: 66, 7: 131 },
    7: { 6: 131, 8: 66, 37: 260 },
    8: { 7: 66, 9: 131 },
    9: { 8: 131, 10: 66 },
    10: { 9: 66, 11: 66 },
    11: { 10: 66, 12: 150 },
    12: { 11: 150, 13: 130 },
    13: { 12: 130, 14: 100 },
    14: { 13: 100, 15: 66 },
    15: { 14: 66, 32: 250, 16: 140 },
    16: { 15: 140, 17: 200, 18: 240 },
    17: { 16: 200 },
    18: { 16: 240, 19: 52 },
    19: { 18: 52, 20: 175, 21: 132 },
    20: { 19: 175 },
    21: { 19: 132, 23: 60, 22: 66 },
    22: { 21: 66, 64: 716 },
    23: { 21: 60, 24: 105, 25: 200 },
    24: { 23: 105 },
    25: { 23: 200, 26: 130, 27: 160 },
    26: { 25: 130 },
    27: { 25: 160, 28: 130 },
    28: { 29: 200, 64: 460, 27: 130 },
    29: { 28: 200, 30: 20, 43: 170 },
    30: { 29: 20, 31: 131, 32: 200 },
    31: { 30: 131 },
    32: { 33: 109, 15: 250, 35: 130, 30: 200 },
    33: { 32: 109, 34: 60 },
    34: { 33: 60 },
    35: { 32: 130, 36: 130, 40: 130, 38: 262 },
    36: { 35: 130, 37: 400 },
    37: { 36: 400, 5: 157, 7: 260 },
    38: { 35: 262, 39: 330, 49: 380 },
    39: { 38: 330, 2: 262 },
    40: { 35: 130, 41: 80, 42: 79 },
    41: { 40: 80, 45: 20 },
    42: { 40: 79, 44: 53, 43: 92 },
    43: { 42: 92, 63: 105, 29: 170 },
    44: { 42: 53, 45: 50 },
    45: { 46: 105, 44: 50, 41: 20 },
    46: { 45: 105, 47: 100 },
    47: { 48: 120, 49: 100, 46: 100 },
    48: { 47: 120, 63: 66, 55: 250 },
    49: { 38: 380, 50: 91, 47: 100 },
    50: { 49: 91, 52: 182 },
    51: { 52: 40 },
    52: { 53: 130, 54: 130, 51: 40, 50: 182, 62: 200 },
    53: { 52: 130, 54: 20, 55: 130 },
    54: { 53: 20, 52: 130, 55: 130 },
    55: { 48: 250, 56: 122, 53: 130, 54: 130 },
    56: { 55: 122, 57: 115 },
    57: { 56: 115, 58: 130, 64: 250 },
    58: { 57: 130, 59: 66, 60: 66 },
    59: { 58: 66, 60: 66 },
    60: { 58: 66, 59: 66, 61: 66 },
    61: { 60: 66, 62: 30 },
    62: { 52: 200, 61: 30 },
    63: { 48: 66, 43: 105 },
    64: { 57: 250, 28: 460, 22: 716 },
  });

  const [startNode, setStartNode] = useState("");
  const [endNode, setEndNode] = useState("");
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [availableNodes, setAvailableNodes] = useState([]);
  const [startSearchTerm, setStartSearchTerm] = useState("");
  const [endSearchTerm, setEndSearchTerm] = useState("");
  const [showStartDropdown, setShowStartDropdown] = useState(false);
  const [showEndDropdown, setShowEndDropdown] = useState(false);

  useEffect(() => {
    const nodes = Object.keys(graph)
      .map(Number)
      .sort((a, b) => a - b);
    setAvailableNodes(nodes);
  }, [graph]);

  const getFilteredNodes = (searchTerm) => {
    if (!searchTerm) return availableNodes;
    return availableNodes.filter(node => 
      locationNames[node].toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.toString().includes(searchTerm)
    );
  };

  const dijkstra = (graph, start, end) => {
    const distances = {};
    const previous = {};
    const visited = new Set();
    const queue = [];

    for (const node in graph) {
      distances[node] = node === start ? 0 : Infinity;
      previous[node] = null;
      queue.push(node);
    }

    while (queue.length > 0) {
      let minNode = null;
      let minDistance = Infinity;
      for (const node of queue) {
        if (!visited.has(node) && distances[node] < minDistance) {
          minDistance = distances[node];
          minNode = node;
        }
      }
      if (minNode === null || distances[minNode] === Infinity) break;
      visited.add(minNode);
      queue.splice(queue.indexOf(minNode), 1);
      if (minNode === end) break;

      for (const neighbor in graph[minNode]) {
        if (!visited.has(neighbor)) {
          const newDistance = distances[minNode] + graph[minNode][neighbor];
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = minNode;
          }
        }
      }
    }

    const path = [];
    let current = end;
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }
    return {
      distance: distances[end],
      path: distances[end] === Infinity ? [] : path,
    };
  };

  const handleCalculate = async () => {
    if (!startNode || !endNode) {
      alert("Please select both start and end locations");
      return;
    }

    const startNodeNum = parseInt(startNode);
    const endNodeNum = parseInt(endNode);

    if (startNodeNum === endNodeNum) {
      alert("Start and end locations cannot be the same");
      return;
    }

    setIsCalculating(true);
    await new Promise((res) => setTimeout(res, 500));
    const resData = dijkstra(graph, startNodeNum.toString(), endNodeNum.toString());
    setResult(resData);
    setIsCalculating(false);
  };

  const handleReset = () => {
    setStartNode("");
    setEndNode("");
    setResult(null);
    setStartSearchTerm("");
    setEndSearchTerm("");
    setShowStartDropdown(false);
    setShowEndDropdown(false);
  };

  const getNodeConnections = (node) =>
    graph[node] ? Object.keys(graph[node]).length : 0;

  const selectStartNode = (node) => {
    setStartNode(node.toString());
    setStartSearchTerm(locationNames[node]);
    setShowStartDropdown(false);
  };

  const selectEndNode = (node) => {
    setEndNode(node.toString());
    setEndSearchTerm(locationNames[node]);
    setShowEndDropdown(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full p-6 md:p-8 flex-1 flex flex-col">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <MapPin className="text-indigo-600" />
              NIT Bhopal Campus Navigator
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Find optimal paths using Dijkstra's algorithm
            </p>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
            {/* Node Selection Section */}
            <div className="w-full lg:w-1/3 bg-indigo-50 rounded-xl p-6 flex flex-col min-h-0">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="text-indigo-600" />
                Location Selection
              </h2>

              <div className="space-y-6 flex-1 min-h-0 overflow-auto">
                {/* Quick Location List */}
                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <h3 className="text-sm font-medium text-indigo-800 mb-3">
                    Quick Select Locations
                  </h3>
                  <div className="max-h-32 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-1">
                      {availableNodes.map((node) => (
                        <button
                          key={node}
                          onClick={() => {
                            if (!startNode) {
                              selectStartNode(node);
                            } else if (!endNode) {
                              selectEndNode(node);
                            } else {
                              selectStartNode(node);
                            }
                          }}
                          className="text-left p-2 rounded hover:bg-indigo-50 transition text-xs border border-transparent hover:border-indigo-200"
                        >
                          <div className="font-medium text-gray-800 truncate">
                            {node}. {locationNames[node]}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Click any location to set as start point, or end point if start is already selected
                  </p>
                </div>
                {/* Start Location */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={startSearchTerm}
                      onChange={(e) => {
                        setStartSearchTerm(e.target.value);
                        setShowStartDropdown(true);
                        if (!e.target.value) {
                          setStartNode("");
                        }
                      }}
                      onFocus={() => setShowStartDropdown(true)}
                      placeholder="Search for start location..."
                      className="w-full p-3 pl-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                  {showStartDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {getFilteredNodes(startSearchTerm).map((node) => (
                        <div
                          key={node}
                          onClick={() => selectStartNode(node)}
                          className="p-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-800">
                            {locationNames[node]}
                          </div>
                          <div className="text-sm text-gray-500">
                            Node {node} • {getNodeConnections(node)} connections
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {startNode && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: Node {startNode} ({getNodeConnections(parseInt(startNode))} connections)
                    </p>
                  )}
                </div>

                {/* End Location */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={endSearchTerm}
                      onChange={(e) => {
                        setEndSearchTerm(e.target.value);
                        setShowEndDropdown(true);
                        if (!e.target.value) {
                          setEndNode("");
                        }
                      }}
                      onFocus={() => setShowEndDropdown(true)}
                      placeholder="Search for end location..."
                      className="w-full p-3 pl-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                  {showEndDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {getFilteredNodes(endSearchTerm).map((node) => (
                        <div
                          key={node}
                          onClick={() => selectEndNode(node)}
                          className="p-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-800">
                            {locationNames[node]}
                          </div>
                          <div className="text-sm text-gray-500">
                            Node {node} • {getNodeConnections(node)} connections
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {endNode && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: Node {endNode} ({getNodeConnections(parseInt(endNode))} connections)
                    </p>
                  )}
                </div>

                {/* Current Selection Display */}
                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <h3 className="text-sm font-medium text-indigo-800 mb-3">
                    Current Selection
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-slate-900 font-medium">Start:</span>
                      <span className="text-sm text-gray-600">
                        {startNode ? `${startNode}. ${locationNames[parseInt(startNode)]}` : 'Not selected'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm  text-slate-900 font-medium">End:</span>
                      <span className="text-sm text-gray-600">
                        {endNode ? `${endNode}. ${locationNames[parseInt(endNode)]}` : 'Not selected'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto pt-4">
                  <button
                    onClick={handleCalculate}
                    disabled={!startNode || !endNode || isCalculating}
                    className={`flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition ${
                      !startNode || !endNode || isCalculating
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isCalculating ? (
                      "Calculating..."
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Calculate Path
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-0">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Route className="text-indigo-600" />
                  Path Results
                </h2>
              </div>

              <div className="flex-1 p-6 overflow-auto min-h-0">
                {result ? (
                  result.path.length > 0 ? (
                    <div className="space-y-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-green-800 mb-2">
                          Path Found!
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              Total Distance
                            </p>
                            <p className="text-2xl font-bold text-green-600">
                              {result.distance} meters
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Locations Visited
                            </p>
                            <p className="text-2xl font-bold text-green-600">
                              {result.path.length}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                          Route Details
                        </h3>
                        <div className="space-y-3">
                          {result.path.map((node, index) => (
                            <div key={node} className="flex items-center gap-3">
                              <div className="bg-indigo-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-medium text-sm">
                                {node}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-800">
                                  {locationNames[node]}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Node {node}
                                  {index === 0 && " • Starting Point"}
                                  {index === result.path.length - 1 && " • Destination"}
                                  {index > 0 && ` • Distance from previous: ${graph[result.path[index - 1]][node]} meters`}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          Path Summary
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">From:</span> {locationNames[result.path[0]]}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">To:</span> {locationNames[result.path[result.path.length - 1]]}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Total Distance:</span> {result.distance} meters
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200 max-w-md">
                        <h3 className="text-lg font-medium text-red-800 mb-2">
                          No Path Found
                        </h3>
                        <p className="text-gray-600">
                          There is no available path between the selected locations.
                        </p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="bg-indigo-50 rounded-full p-4 mb-4">
                      <Route className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      Select Locations to Begin
                    </h3>
                    <p className="text-gray-600 max-w-md">
                      Choose your starting location and destination from the dropdown menus, then
                      click "Calculate Path" to find the shortest route.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-4 text-center text-white/80 text-sm">
          NIT Bhopal Campus Navigator • Dijkstra Algorithm Visualization •{" "}
          {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default DijkstraPathFinder;