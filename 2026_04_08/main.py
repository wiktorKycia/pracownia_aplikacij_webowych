
filename: str = "graph.txt"

def read_graph(filename: str):
    lines: list[str]
    with open(filename, 'r') as f:
        lines = f.read().split('\n')

    n: int = int(lines.pop(0))
    graph: list[list[int]] = []
    for line in lines:
        line: list[int] = list(map(int, line.split(' ')))
        line.pop(0)
        graph.append(line)

    return graph, n

def write_neighbors_list(lst: list[list[int]]):
    for i, l in enumerate(lst):
        s = ", ".join(list(map(str, l)))
        print(f"Sąsiadami wierzchołka {i} są {s}")

write_neighbors_list(read_graph(filename)[0])