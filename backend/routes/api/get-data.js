let fetch = require("node-fetch");

// Deals

let url_deals = new URL("http://www.cheapshark.com/api/1.0/deals");

function getDeals(params){
    Object.keys(params).forEach(key => url_deals.searchParams.append(key, params[key]))
    
    fetch(url_deals).then(data =>{return data.json()}).catch(err =>{console.log(err)})
}

function getDealInfo(id){
    Object.keys(id).forEach(key => url_deals.searchParams.append(key, id[key]))
    
    fetch(url_deals).then(data =>{return data.json()}).catch(err =>{console.log(err)})
}

// Games

let url_games = new URL("http://www.cheapshark.com/api/1.0/games");

function getGamesList(params){
    Object.keys(params).forEach(key => url_games.searchParams.append(key, params[key]))
    
    fetch(url_games).then(data =>{return data.json()}).catch(err =>{console.log(err)})
}

function getGameInfo(id){
    Object.keys(id).forEach(key => url_games.searchParams.append(key, id[key]))
    
    fetch(url_games).then(data =>{return data.json()}).then(resp => {console.log(resp)}).catch(err =>{console.log(err)})
}

function getGamesInfo(ids){
    let new_url = url_games + "?ids=" + ids;
    
    fetch(new_url).then(data =>{return data.json()}).catch(err =>{console.log(err)})
}
// Alerts

function controlAlerts(params){
    let url_alerts = "http://www.cheapshark.com/api/1.0/alerts";

    Object.keys(params).forEach(key => url_alerts.searchParams.append(key, params[key]))

    fetch(url_alerts).then(data => {return data}).catch(err => {console.log(err)})
}

let test = getGameInfo({id:128});