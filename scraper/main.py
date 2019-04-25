import PyPDF2
import re

pdfFileObj = open('directory.pdf', 'rb')
pdfReader = PyPDF2.PdfFileReader(pdfFileObj)

text = ""

# # Faculty
# for i in range(31, 145): # Get only the pages with directory cards
#     page = pdfReader.getPage(i)
#     text += page.extractText()
#
# text += "\n\n**************\n\n"

# Students
for i in range(145, 241): # Get only the pages with directory cards
    page = pdfReader.getPage(i)
    text += page.extractText()

text = re.sub(r"(\n)", " ", text)
text = re.sub(r" {2,}", " ", text)
text = re.sub(r"STUDENTS [0-9]+", "", text) # Eliminate Page Numbers
text = re.split("([a-z]+[0-9]*@andover\.edu)", text)
students = []

def extract_student_data(student):

    # Grade
    grade = "Senior"

    if "Junior" in student:
        grade = "Junior"
    elif "Lower" in student:
        grade = "Lower"
    elif "Upper" in student:
        grade = "Upper"

    # Year Entered
    entered = re.findall("entered: ([0-9]{4})", student)[0]

    # Email
    email = re.findall("[a-z]+[0-9]*@andover\.edu", student)[0]

    # Name
    name = re.search("^([^,]+), ([A-Z][^A-Z ]+)( [A-Z]\.)?( “([^”]+)”)?( Jr\.)?( [IV]{2,})?", student).group(0)

    # From
    where_from = re.findall("(^([^,]+), ([A-Z][^A-Z ]+)( [A-Z]\.)?( “([^”]+)”)?( Jr\.)?( [IV]{2,})?)([A-Z ][^0-9]+)", student)[0]
    where_from = where_from[len(where_from) - 1].strip()

    # Dorm
    dorm = None
    cluster = None

    if "Day Student" not in student:
        dorm = re.findall("(FLG|WQN|WQS|PKN|ABB) ([A-Za-z ]+)", student)[0][1].strip()

    if "PKN" in student:
        cluster = "PKN"
    elif "WQN" in student:
        cluster = "WQN"
    elif "WQS" in student:
        cluster = "WQS"
    elif "ABB" in student:
        cluster = "ABB"
    elif "FLG" in student:
        cluster = "FLG"

    # Return
    return {
        "grade": grade,
        "entered": entered,
        "dorm": dorm,
        "cluster": cluster,
        "email": email,
        "display_name": name,
        "from": where_from
    }

for i in range(0, len(text) - 1, 2):
    students.append((text[i] + " " + text[i + 1]).strip())

for student in students:
    # print(student)
    print(extract_student_data(student))
