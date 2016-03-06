from lxml import html
import requests
import json

class AstronautScraper:

    def getAstronuats(self, baseUrl):
        astronauts = []
        astronauts.extend(self.getFormerAstronauts(baseUrl))
        astronauts.extend(self.getActiveAstronauts(baseUrl))
        astronauts.extend(self.getManagementAstronauts(baseUrl))
        return astronauts

    def getActiveAstronauts(self, baseUrl):
        page = requests.get(baseUrl + 'astrobio.html')
        tree = html.fromstring(page.content)
        table = tree.cssselect('table[summary="List of astronauts"]')[0]
        rows = table.cssselect('tr')

        return self.getAstronautsFromTableRows(baseUrl, rows)


    def getFormerAstronauts(self, baseUrl):
        page = requests.get(baseUrl + 'astrobio_former.html')
        tree = html.fromstring(page.content)
        table = tree.cssselect('table[summary="Alphabetic list of Career NASA Astronauts"]')[0]
        rows = table.cssselect('tr')

        return self.getAstronautsFromTableRows(baseUrl, rows)

    def getManagementAstronauts(self, baseUrl):
        page = requests.get(baseUrl + 'astrobio_mgmt.html')
        tree = html.fromstring(page.content)
        table = tree.cssselect('table[summary="List of astronauts"]')[0]
        rows = table.cssselect('tr')

        return self.getAstronautsFromTableRows(baseUrl, rows)


    def getAstronautsFromTableRows(self, baseUrl, rows):
        astronauts = [] 
        for row in rows:
            columns = row.cssselect('td')

            if len(columns) >= 3:
                nameCol = columns[0]
                selectionYearCol = columns[1]
                selectionGroupCol = columns[2]
                currentStatus = 'Active'
                if(len(columns) == 4):
                    currentStatusCol = columns[3]
                    currentStatus = currentStatusCol.text_content()

                nameLink = nameCol.cssselect('a')[0]

                if nameLink is not None:
                    astronaut = {
                        'name': nameLink.text_content().replace('\r\n                                      ', ' '),
                        'link': nameLink.get('href'),
                        'selectionYear': selectionYearCol.text_content(),
                        'selectionGroup': selectionGroupCol.text_content(),
                        'currentStatus': currentStatus
                    }

                    if astronaut['link'] is not None: 
                        astronaut =  self.getAstronautBioPage(baseUrl, astronaut)
                        astronauts.append(astronaut)
                    else:
                        print astronaut

        return astronauts

    def getAstronautBioPage(self, baseUrl, astronaut):
        try: 
            page = requests.get(baseUrl + astronaut['link'])
            tree = html.fromstring(page.content)
            paragraphs = tree.cssselect('p')
            astronaut['title'] = paragraphs[0].text_content()

            for paragraph in paragraphs[1:]:
                paragraphTitle = paragraph.cssselect('strong')
                if paragraphTitle is None or len(paragraphTitle) == 0: 
                    paragraphTitle = 'OTHER_INFORMATION'
                else:
                    paragraphTitle = paragraphTitle[0].text_content()

                astronaut[paragraphTitle.replace(' ', '_')] = paragraph.text_content().replace(paragraphTitle, ' ')

        except Exception:
            print 'error: '
            print astronaut

        return astronaut



astronautScraper = AstronautScraper()
astronauts = astronautScraper.getAstronuats('http://www.jsc.nasa.gov/Bios/')

with open('astronauts.json', 'w') as fp:
    json.dump(astronauts, fp)



