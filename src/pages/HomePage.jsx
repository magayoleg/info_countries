import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_COUNTRIES } from '../config';
import List from '../components/List';
import Card from '../components/Card';
import Controls from '../components/Controls';

const HomePage = ({ countries, setCountries }) => {
  const [filtredCountries, setFiltredCountries] = useState(countries);
  const navigate = useNavigate();

  const handleSearch = (search, region) => {
    let data = [...countries];
    if (region) {
      data = data.filter(country => country.region.includes(region));
    }
    if (search) {
      data = data.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFiltredCountries(data);
  }

  useEffect(() => {
    if (!countries.length)
      axios.get(ALL_COUNTRIES).then(({ data }) => {
        setCountries(data)
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [countries]);

  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filtredCountries.map((country) => {
          const countryInfo = {
            img: country.flag,
            name: country.name,
            info: [
              {
                title: 'Population',
                description: country.population.toLocaleString(),
              },
              {
                title: 'Region',
                description: country.region,
              },
              {
                title: 'Capital',
                description: country.capital,
              },
            ],
          };
          return (
            <Card
              key={country.name}
              {...countryInfo}
              onClick={() => navigate(`/country/${country.name}`)}
            />
          );
        })}
      </List>
    </>
  );
};

export default HomePage;
