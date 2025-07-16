import { countries } from 'countries-list';

const countryList = Object.values(countries).map((country) => ({
  title: country.name,
  value: country.name,
}));

export default countryList;
