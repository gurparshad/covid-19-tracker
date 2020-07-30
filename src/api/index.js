import axios from 'axios';

const url =  'https://covid19.mathdro.id/api';

export const fetchData = async(country) => {
    let changeableUrl = url;
    if(country){
        changeableUrl = `${url}/countries/${country}`
    }
    try{
        // const response = await axios.get(url); // this is commented as we are using the next implementation
        const { data } = await axios.get(changeableUrl); // destructured data from response        
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }
        return modifiedData;
    }
    catch(err){}
}

export const fetchDailyData = async () => {
    try{
        const { data } = await axios.get(`${url}/daily`); // data is destrucured from the response returned by axios.
        // araay of objects will be stored in the modified data.
        const modifiedData = data.map(function(item){
            let modifiedDataObj = {
                confirmed: item.confirmed.total,
                deaths: item.deaths.total,
                date: item.reportDate
            }
            return modifiedDataObj;  // each object is returned one by one and stored into the array.
        })
       return modifiedData;
    }catch(error){
        console.log(error);
    }
}

export const countries = async () => {
    try{
        const {data: {countries} } = await axios.get(`${url}/countries`);
        const countryList =  countries.map(function(country){
            return country.name;
        });
        return countryList;
    } catch(err){
        console.log(err);
    }
}