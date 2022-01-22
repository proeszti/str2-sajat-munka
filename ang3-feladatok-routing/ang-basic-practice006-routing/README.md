# Router Gyakorlat 01

**_Instrukciók_**: jelenítsd meg az események részleteit a főoldalon. 

## Kezdő lépések
- Lépj be a letöltött mappába és állítsd be a projektet:
- `cd ang-basic-practice006-routing`
- `code . -r`
- Telepítsd a függőségeket:
- `npm i`
- Indítsd el az Angular Development Server -t:
- `npm start`

Lépések:
> Az alkalmazás már rendelkezik az app-routing.module.ts állománnyal, ahol be tudod állítani a Router -t. Ezen kívül egy 
navigációs sávot is készítettem, ami megjeleníti majd a menüpontokat.

1. Hozd létre a Location osztályt a következő változókkal: 
`@var address {string}`, 
`@var city {string}`, 
`@var country {string}`

1. Hozd létre az Event osztályt a következő változókkal: 
`@var name {string}`, 
`@var date {string}`, 
`@var time {string}`,
`@var location {Location}`  
> FIGYELEM: vigyázz, hogy jó helyről importáld az Event és Location 
osztályokat, mert azonos néven léteznek natív JS objektumok is.

1. Hozd létre az EventService service -t: 
`ng g service service/event`. Legyen egy getAll metódusa, ami legalább három esemény tömbjét adja vissza, ami megfelel a saját Event osztályunknak. Az adatok lehetnek szabodon választottak.

1. Hozd létre az EventsListComponent komponenst `ng g c events-list`. Injektáld be a constructor -ban az EventService -t és vedd át az a service getAll metódusa által visszaadott tömböt 
eventsList néven. A html -ben jelenítsd meg az eseményeket (az eventsList tömb elemeit) egy táblázatban. Az oszlopok legyenek: Event, Date, Time, Address. (*ngFor -t használj)

1. Helyezd el az app.component.html -ben a router-outlet -et és állítsd be az app-routing.module.ts -ben, hogy a kezdőlapon az EvnetsListComponent jelenjen meg (nem direktben, hanem a router-outlet segítségével).
