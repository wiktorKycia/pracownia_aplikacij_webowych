
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

def list_to_matrix(lst: list[list[int]]):
    print(lst)
    matrix: list[list[int]] = []
    for i in range(len(lst)):
        matrix.append([])
        for j in range(len(lst)):
            matrix[i].append(1 if j in lst[i] else 0)

    return matrix

def write_matrix(matrix: list[list[int]]):
    for i in range(len(matrix)):
        for j in range(len(matrix)):
            print(matrix[i][j], end=' ')
        print()

def main():
    write_matrix(list_to_matrix(read_graph(filename)[0]))

if __name__ == "__main__":
    main()