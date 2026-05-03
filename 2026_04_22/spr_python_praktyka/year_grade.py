def year_grade(average: float) -> int:
    if average < 1.85:
        return 1
    elif average < 2.7:
        return 2
    elif average < 3.7:
        return 3
    elif average < 4.7:
        return 4
    elif average < 5.5:
        return 5
    else:
        return 6
