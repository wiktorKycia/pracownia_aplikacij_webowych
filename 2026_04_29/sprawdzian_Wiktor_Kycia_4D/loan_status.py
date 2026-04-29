__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Wiktor Kycia 4D"

def loan_status(days: int) -> str: return "OK" if days <= 14 else "WARNING" if 14 < days <= 30 else "OVERDUE"