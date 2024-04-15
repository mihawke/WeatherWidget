import React, { useEffect, useState } from 'react';
import styles from './MainPage.module.css';
import Header from '../Header/Header';
import { BsGeoAlt } from 'react-icons/bs';
import { FaWind } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";
import { IoIosCloudy } from "react-icons/io";
import { MdFoggy } from "react-icons/md";
import { RiMistFill } from "react-icons/ri";
import { BsCloudDrizzleFill } from "react-icons/bs";
import { BsCloudRainHeavyFill } from "react-icons/bs";
import { IoThunderstormSharp } from "react-icons/io5";
import { FaRegSnowflake } from "react-icons/fa";
import { BsCloudHaze2Fill } from "react-icons/bs";


const MainPage = ({ handleLocation, data }) => {
  const [temp, setTemp] = useState('')
  const [mintemp, setminTemp] = useState('')
  const [maxtemp, setmaxTemp] = useState('')
  const [weather, setWeather] = useState('')
  const [unit, setUnit] = useState('°C')
  const [temperature, setTemperature] = useState([temp, mintemp, maxtemp])

  const dayNumber = new Date().getDay();

  const currentDay = () => {
    if (dayNumber == 0) {
      return "Sunday";
    }
    else if (dayNumber == 1) {
      return "Monday";
    }
    else if (dayNumber == 2) {
      return "Tuesday";
    }
    else if (dayNumber == 3) {
      return "Wednesday";
    }
    else if (dayNumber == 4) {
      return "Thursday";
    }
    else if (dayNumber == 5) {
      return "Friday";
    }
    else if (dayNumber == 6) {
      return "Saturday";
    }
  }

  const getIcon = () => {
    if (weather == 'Clear') {
      return <IoIosSunny size={120} />;
    }
    else if (weather == 'Clouds') {
      return <IoIosCloudy size={120} />;
    }
    else if (weather == 'Drizzle') {
      return <BsCloudDrizzleFill size={120} />;
    }
    else if (weather == 'Rain') {
      return <BsCloudRainHeavyFill size={120} />;
    }
    else if (weather == 'Thunderstorm') {
      return <IoThunderstormSharp size={120} />;
    }
    else if (weather == 'Snow') {
      return <FaRegSnowflake size={120} />;
    }
    else if (weather == 'Fog') {
      return <MdFoggy size={120} />;
    }
    else if (weather == 'Mist') {
      return <RiMistFill size={120} />;
    }
    else if (weather == 'Haze') {
      return <BsCloudHaze2Fill size={120} />;
    }
    else {
      return 'None'
    }
  }

  useEffect(() => {
    if (data.main) {
      const x = (data.main?.temp || '') - 273.15
      const y = (data.main?.temp_min || '') - 273.15
      const z = (data.main?.temp_max || '') - 273.15
      setTemp(data.main?.temp || '')
      setWeather(data.weather[0]?.main || '')
      setminTemp(data.main?.temp_min || '')
      setmaxTemp(data.main?.temp_max || '')
      setTemperature([x.toFixed(0), y.toFixed(0), z.toFixed(0)])
    }
  }, [data])
  const handleCelcius = (temp, mintemp, maxtemp) => {
    const x = parseFloat(temp) - 273.15
    const y = parseFloat(mintemp) - 273.15
    const z = parseFloat(maxtemp) - 273.15
    const lis = [x.toFixed(0), y.toFixed(0), z.toFixed(0)]
    setTemperature(lis)
    setUnit('°C')
  }
  const handleFahrenheit = (temp, mintemp, maxtemp) => {
    const x = 1.8 * (parseFloat(temp) - 273) + 32
    const y = 1.8 * (parseFloat(mintemp) - 273) + 32
    const z = 1.8 * (parseFloat(maxtemp) - 273) + 32
    const lis = [x.toFixed(0), y.toFixed(0), z.toFixed(0)]
    setTemperature(lis)
    setUnit('°F')
  }
  return (
    <>
      <Header handleLocation={handleLocation}></Header>
      <div className={styles.container}>
        <div className={styles.frame1}>
          <p className={styles.day}>{currentDay()}</p>
          <div className={styles.tempContainer}>
            {/*           
          <div>
            <input
              type='radio'
              value='C'
              name='option'
              onClick={() => handleCelcius(temp, mintemp, maxtemp)}
            ></input>
            <label htmlFor='C'>C</label>
            <input
              type='radio'
              value='F'
              name='option'
              onClick={() => handleFahrenheit(temp, mintemp, maxtemp)}
            ></input>
            <label htmlFor='F'>F</label>
          </div> */}
            <p className={styles.tempText}>{temperature[0]}<span style={{ position: 'relative', top: -30,left:-10, fontSize: '5rem', fontWeight: 200 }}>°</span>
              {/* {unit} */}
            </p>
          </div>
          <div>
            <BsGeoAlt style={{marginRight:5}} size={18}/> {data.name}
            , {data.sys?.country || ''}
          </div>
        </div>
        <div className={styles.frame2}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '1rem', alignItems: 'center' }}>
              <FaWind size={22}/>
              <p style={{fontSize:18}}>{data.wind?.speed || '0'} m/s</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '1rem', alignItems: 'center' }}>
              <FaDroplet size={22}/>
              <p style={{fontSize:18}}>{data.main?.humidity || ''}%</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '1rem', alignItems: 'center' }}>
              <p style={{fontSize:'1rem'}}>H</p>
              <p style={{fontSize:'1rem'}}>{temperature[1]}°</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '1rem', alignItems: 'center' }}>
              <p style={{fontSize:'1rem'}}>L</p>
              <p style={{fontSize:'1rem'}}>{temperature[2]}°</p>
            </div>
          </div>
        </div>
        <div className={styles.frame3}>
          {data.main &&
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {getIcon()}
              <p style={{fontSize:14 , fontWeight:500,opacity:0.5}}>{data.weather[0]?.main}</p>
            </div>}
        </div>
      </div>
    </>
  );
}

export default MainPage;
