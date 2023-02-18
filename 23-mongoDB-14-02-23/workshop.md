# Workshop 2023 -02 - 2023

## Steg 1

Skriv logic för att kunna skapa en ny film ('POST/ movies') som tar emot 'title', 'runtime'(optional) och 'releaseYear'(optional).

## Steg 2

Lägg på validering med hjälp av  'express-validator'  så film måste ha:
'title' string, required, min 3
'runtime' number, min 1
'releaseYear' number, min 1888, (🙄max current year)
