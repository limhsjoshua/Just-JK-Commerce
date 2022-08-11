import * as React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

const categories = ["Hoodies", "T-Shirts"];

const collections = [
  "7 Hours Debugging",
  "Following Tutorial Code",
  "In Case of Fire",
  "It's a Feature",
  "Learn Python in 5 Min",
  "Localhost vs. Production",
  "Merging Branches",
  "Programming is Easy",
  "RAM Then vs. Now",
  "Sad Code Cat",
];

const generateCheckbox = (filter) => {
  return filter ? <Checkbox checked /> : <Checkbox />;
};

export default function ProductsSideBar({
  sort,
  setSort,
  categoryFilter,
  setCategoryFilter,
  collectionFilter,
  setCollectionFilter,
}) {
  const handleChangeSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <FormControl>
        <FormLabel
          id="demo-radio-buttons-group-label"
          style={{ fontFamily: "Merriweather", fontWeight: "900" }}
        >
          Sort By
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={sort}
          name="radio-buttons-group"
          onChange={handleChangeSort}
        >
          <FormControlLabel
            value="latest"
            control={<Radio />}
            label="Latest Arrival"
          />
          <FormControlLabel
            value="highest-price"
            control={<Radio />}
            label="Highest Price"
          />
          <FormControlLabel
            value="lowest-price"
            control={<Radio />}
            label="Lowest Price"
          />
          <FormControlLabel
            value="a-z"
            control={<Radio />}
            label="Name (A-Z)"
          />
          <FormControlLabel
            value="z-a"
            control={<Radio />}
            label="Name (Z-A)"
          />
        </RadioGroup>
      </FormControl>
      <br />
      <br />
      <br />
      <FormControl>
        <FormLabel
          id="demo-radio-buttons-group-label"
          style={{ fontFamily: "Merriweather", fontWeight: "900" }}
        >
          Filter By
        </FormLabel>
        <FormGroup>
          <FormLabel
            id="demo-radio-buttons-group-label"
            style={{ fontFamily: "Merriweather" }}
          >
            Category
          </FormLabel>
          {categories.map((category, idx) => (
            <FormControlLabel
              key={`category-${idx}`}
              control={generateCheckbox(categoryFilter[category])}
              label={category}
              onChange={() => {
                const newFilter = { ...categoryFilter };
                newFilter[category] = !categoryFilter[category];
                setCategoryFilter(newFilter);
              }}
            />
          ))}
          <br />
          <FormLabel
            id="demo-radio-buttons-group-label"
            style={{ fontFamily: "Merriweather" }}
          >
            Collection
          </FormLabel>
          {collections.map((collection, idx) => (
            <FormControlLabel
              key={`collection-${idx}`}
              control={generateCheckbox(collectionFilter[collection])}
              label={collection}
              onChange={() => {
                const newFilter = { ...collectionFilter };
                newFilter[collection] = !collectionFilter[collection];
                setCollectionFilter(newFilter);
              }}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
