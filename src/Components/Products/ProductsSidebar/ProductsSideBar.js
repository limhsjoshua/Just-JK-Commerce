import * as React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

const categories = ["Hoodies", "T-Shirts", "Mugs", "Cards"];

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
            label={<span style={{ fontSize: "0.9em" }}>Latest Arrival</span>}
          />
          <FormControlLabel
            value="highest-price"
            control={<Radio />}
            label={<span style={{ fontSize: "0.9em" }}>Highest Price</span>}
          />
          <FormControlLabel
            value="lowest-price"
            control={<Radio />}
            label={<span style={{ fontSize: "0.9em" }}>Lowest Price</span>}
          />
          <FormControlLabel
            value="a-z"
            control={<Radio />}
            label={<span style={{ fontSize: "0.9em" }}>Name (A-Z)</span>}
          />
          <FormControlLabel
            value="z-a"
            control={<Radio />}
            label={<span style={{ fontSize: "0.9em" }}>Name (Z-A)</span>}
          />
        </RadioGroup>
      </FormControl>
      <br />
      <br />
      <br />
      <FormControl>
        <FormLabel
          id="demo-radio-buttons-group-label"
          style={{
            fontFamily: "Merriweather",
            fontWeight: "900",
            marginBottom: 10,
          }}
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
              label={<span style={{ fontSize: "0.9em" }}>{`${category}`}</span>}
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
              label={
                <span style={{ fontSize: "0.9em" }}>{`${collection}`}</span>
              }
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
