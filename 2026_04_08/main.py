
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

    return