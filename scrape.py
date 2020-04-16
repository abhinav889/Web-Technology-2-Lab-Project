import requests
import json
from bs4 import BeautifulSoup
URL = 'https://www.indiabix.com/aptitude/permutation-and-combination/065002'
page = requests.get(URL)
soup = BeautifulSoup(page.content, 'html.parser')
#job_elems = soup.find_all('td', class_='bix-td-qtxt')
questions = []
job_elems = soup.find_all('div', class_='bix-div-container')
i = 0
for job_elem in job_elems:
    #print((job_elem.find('p')).text)
    questions.append({})
    #print(job_elem)
    q = job_elem.find('td',class_='bix-td-qtxt')
    questions[i]["question"] = (((q.find('p')).text).strip()).encode('ascii')
    options = job_elem.find_all('td',class_ = 'bix-td-option')
    #print(options)
    even = True
    opval = ""
    answer = job_elem.find('div',class_='bix-div-answer')
    #print(answer)
    ans = ((((answer.find('p')).find('span',class_='jq-hdnakqb')).text).strip()).encode('ascii')
    print(ans)
    first = 1
    '''for a in two :
        if first == 0:
            ans = ((a.text).strip()).encode('ascii')
        first = 0'''
    for option in options :
        if even :
            opt = (((option.text)[:-1]).strip()).encode('ascii')
            opval = "option" + opt
            even = False
        else :
            value = ((option.text).strip()).encode('ascii')
            questions[i][opval] = value
            if opt == ans :
                questions[i]["answer"] = value
            even = True
        
    i += 1
    
print(questions)
with open('data.txt', 'w') as outfile:
    json.dump(questions, outfile)
    
    



