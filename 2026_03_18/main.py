# filename = "./Dane_PR2/sygnaly.txt"
filename = "./Dane_PR2/przyklad.txt"

result_file = "./wyniki4.txt"

def zad1():
    lines = []
    with open(filename, "r") as file:
        lines = file.readlines()

    with open(result_file, "a+") as output:
        for i in range(39, len(lines), 40):
            output.write(lines[i].strip()[-1])

def zad2():
    lines = []
    with open(filename, "r") as file:
        lines = file.readlines()

    letters_lines: dict = { l[:-1]: len(set(l[:-1])) for l in lines }

    max_letters = 0
    the_most_different_line = ""

    for line, length in letters_lines.items():
        if length > max_letters:
            the_most_different_line = line
            max_letters = length

    with open(result_file, "a") as output:
        output.write(the_most_different_line + " " + str(max_letters))

def zad3():
    lines = []
    with open(filename, "r") as file:
        lines = file.readlines()

    with open(result_file, "a") as output:
        for line in lines:
            line = line[:-1] # usuwanie \n z końca
            can_print = True
            for i in range(len(line)-1):
                if abs(ord(line[i]) - ord(line[i+1])) > 10:
                    can_print = False
            if can_print:
                output.write(line+'\n')



if __name__ == "__main__":
    with open(result_file, "w") as f:
        f.write("Zadanie 1: \n")
    zad1()
    with open(result_file, "a") as f:
        f.write("\n\nZadanie 2: \n")
    zad2()
    with open(result_file, "a") as f:
        f.write("\n\nZadanie 3: \n")
    zad3()