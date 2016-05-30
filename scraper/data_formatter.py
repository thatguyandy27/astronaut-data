import json
import re
from datetime import datetime

class DataFormatter:

    def formatData(self, jsonData):
        self.count = 0;
        data = map(self.mapAstronaut, jsonData)
        print(self.count)
        return data
        
    def mapAstronaut(self, astronautData):
        formattedData = {}
        splitName = astronautData['name'].split(',')
        formattedData['lastName'] = splitName[0].strip()
        splitName = splitName[1].strip().split(' ')
        
        formattedData['firstName'] = splitName[0].strip()
        formattedData['middleName'] = '' if len(splitName) == 1 else splitName[1].strip()
        formattedData['isFormer'] = astronautData['currentStatus'] == 'Former' or astronautData['currentStatus'] == 'Deceased';
        formattedData['link'] = astronautData['link']
        formattedData['selectionYear'] = astronautData['selectionYear']
        formattedData['selectionGroup'] = astronautData['selectionGroup']
        formattedData['awards'] = astronautData.get('AWARDS:', '').replace('\r\n', '').split(';')
        formattedData['organizations'] = astronautData.get('ORGANIZATIONS:', '').replace('\r\n', '').split(';')
        formattedData['specialHonors'] = astronautData.get('SPECIAL_HONORS:', '').replace('\r\n', '').split(';')
        formattedData['experience'] = astronautData.get('EXPERIENCE:', '')
        formattedData['birthday'] = self.parseBirthday(astronautData)
        formattedData['education'] = self.parseEducation(astronautData)
        return formattedData

    def parseBirthday(self, astronautData): 
        if astronautData.get('PERSONAL_DATA:', '') == '':
            #print('no personal data: ' + astronautData['name'])
            return ''

        birthdayMatch = re.search(r"(\w+) (\d+), (\d+)", astronautData['PERSONAL_DATA:'])
        if birthdayMatch: 
            return datetime.strptime(birthdayMatch.group(0), '%B %d, %Y').strftime('%m/%d/%Y')
        else: 
            #print(astronautData['name'])
            return ''

    def parseEducation(self, astronautData):
        education = []
        educationData = astronautData.get('EDUCATION:', '').replace('\r\n', '').strip()
        #education1 = re.findall(r"((bachelor|bachelors|master|masters|doctorate) +of +\w+ +degree +in +(.+?) from (.+?) in (\d\d\d\d))", 
        #    astronautData.get('EDUCATION:', ''), flags=re.IGNORECASE )
        # education1 = re.findall(r"((bachelor|bachelors|master|masters|doctorate) +of +\w+ +degree +in +(.+?) from (.+?)[in|,| ]+(\d\d\d\d))", 
        #    astronautData.get('EDUCATION:', ''), flags=re.IGNORECASE )
        education1 = re.findall(r"((bachelor|bachelors|master|masters|doctorate|b\.s\.|m\.s\.|ph\.d\.) +of +\w+[degree ]+? in +(.+?) [from|,]+(.+?)[in|,| ]+(\d\d\d\d))", 
            educationData, flags=re.IGNORECASE)
        if education1:
            for edu in education1:
                education.append({
                    'institution': edu[3],
                    'year':  edu[4],
                    'level': edu[1],
                    'major': edu[2]
                    })

        education2 = re.findall(r"((bachelor|bachelors|master|masters|doctorate|b\.s\.|m\.s\.|ph\.d\.) +in +(\w+) +from +(.+?) in (\d\d\d\d))",
            educationData, flags=re.IGNORECASE)
        
        if education2:
            for edu in education2:  
                education.append({
                    'institution': edu[3],
                    'year':  edu[4],
                    'level': edu[1],
                    'major': edu[2]
                    })

        education3 = re.findall(r"((bachelor|bachelors|master|masters|doctorate|b\.s\.|m\.s\.|ph\.d\.) +of +(\w+),(.+?), (\d\d\d\d))", 
            educationData, flags=re.IGNORECASE)

        if education3:
            for edu in education3:  
                education.append({
                    'institution': edu[3],
                    'year':  edu[4],
                    'level': edu[1],
                    'major': edu[2]
                    })

        #  no year
        education4 = re.findall(r"((bachelor|bachelors|master|masters|doctorate|b\.s\.|m\.s\.|ph\.d\.) +of +\w+[degree ]+? in +(.+?) [from|,]+(.+?)[,])", 
            educationData, flags=re.IGNORECASE)

        if education4:
            for edu in education4:  
                education.append({
                    'institution': edu[3],
                    'year':  'unkown',
                    'level': edu[1],
                    'major': edu[2]
                    })

        education5 = re.findall(r"((bachelor|bachelors|master|masters|doctorate|b\.s\.|m\.s\.|ph\.d\.|m\.d\.), (.+?), (.+?) (\d\d\d\d))", 
            educationData, flags= re.IGNORECASE)

        if education5:
            for edu in education5:  
                education.append({
                    'institution': edu[3],
                    'year':  edu[4],
                    'level': edu[1],
                    'major': edu[2]
                    })

        if not education2 and not education1 and not education3 and not education4 and not education5 and educationData != '':
            #final test
            education1 = re.findall(r"((bachelor|bachelors|master|masters|doctorate|b\.s\.|m\.s\.|ph\.d\.) +in +(.+?)( from|,) +(.+?)\.)", 
                educationData, flags=re.IGNORECASE)

            if education1:
                for edu in education1:  
                    education.append({
                        'institution': edu[4],
                        'year':  'unkown',
                        'level': edu[1],
                        'major': edu[2]
                        })
            else: 
                self.count += 1
                print('No Education: ' + astronautData['name'])
                return []

        return education



with open('astronauts.json') as data_file:    
    data = json.load(data_file)

dataFormatter = DataFormatter()
formattedData = dataFormatter.formatData(data)

with open('formatted_astronauts.json', 'w') as fp:
    json.dump(formattedData, fp)