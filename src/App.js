import React from 'react';

// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';
 
// the above method is a lengthy method and will populate the file

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import {fetchData} from './api';

import coronaImage from './images/image.png';

class App extends React.Component{
    state = {
        data: {},
        country: '',
    }
    
    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
        console.log('inside didimount');
        console.log(this.state.data);
    }

    // u can access this.setState method only in the arrow function and not in the normal asynchronous function.
    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country });
    }

    render(){
        const {data, country} = this.state;
        return (
            <div className = {styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={data}/> 
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>

        )
    }
}

export default App;