import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { countries } from '../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {
    const [countryList , setCountryList] = useState([]);
    
    // callback functions must be synchronous to avoid the race condition.
    useEffect(() => {
        const fetchCountries = async () => {
            setCountryList(await countries());
        }
        console.log('helo bro');
        fetchCountries();
        
    }, [setCountryList]); // here it is working with the setCountryList but gives infinte loop with countryList.
    console.log(setCountryList);
    console.log('_+_+_+_+_+_+_+_+_+_+');
    console.log(countryList);

    return (
        <FormControl className={styles.formControl} >
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {countryList.map(function(country, i){
                     return <option key={i} value={country}>{country}</option>
                })}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;