from lxml import html
import requests

page = requests.get('http://www.jsc.nasa.gov/Bios/astrobio_former.html')
tree = html.fromstring(page.content)
table = tree.cssselect('table[summary="Alphabetic list of Career NASA Astronauts"]')[0]

rows = table.cssselect('tr')

astronauts = []

for row in rows[2:]:
    columns = row.cssselect('td')

    if len(columns) == 4:
        nameCol = columns[0]
        selectionYearCol = columns[1]
        selectionGroupCol = columns[2]
        currentStatusCol = columns[3]
        nameLink = nameCol.cssselect('a')[0]

        astronauts.append({
            'name': nameLink.text_content(),
            'link': nameLink.get('href'),
            'selectionYear': selectionYearCol.text_content(),
            'selectionGroup': selectionGroupCol.text_content(),
            'currentStatus': currentStatusCol.text_content()
        })


print astronauts



