import { collection, writeBatch, doc } from "firebase/firestore";
import db from "../../util/Firebase";

const designNames = [
  "Localhost vs. Production",
  "Following Tutorial Code",
  "7 Hours Debugging",
  "Merging Branches",
  "RAM Then vs. Now",
  "Learn Python in 5 Min",
  "Programming is Easy",
  "In Case of Fire",
  "Sad Code Cat",
  "It's a Feature",
];

const photoUrlFront =
  "https://firebasestorage.googleapis.com/v0/b/just-jk-commerce.appspot.com/o/";
const photoUrls = {
  tshirts: [
    `${photoUrlFront}tshirts%2Ft1.png?alt=media&token=3b47125b-2e2a-4760-ba13-93f437e15715`,
    `${photoUrlFront}tshirts%2Ft2.png?alt=media&token=91ee244f-f18a-4e28-8bb4-03bbc0efb8aa`,
    `${photoUrlFront}tshirts%2Ft3.png?alt=media&token=a3fa58bc-bb05-4de3-876f-3df772cd36fe`,
    `${photoUrlFront}tshirts%2Ft4.png?alt=media&token=bba00982-aff4-449b-83bc-9ad154438767`,
    `${photoUrlFront}tshirts%2Ft5.png?alt=media&token=43ed4828-e83b-4d2b-9b4b-6dcc45353e7a`,
    `${photoUrlFront}tshirts%2Ft6.png?alt=media&token=1fa8edba-7a2c-49b0-80f2-66dc05038d0e`,
    `${photoUrlFront}tshirts%2Ft7.png?alt=media&token=588689f4-0279-4018-bcd0-3d17eb846f11`,
    `${photoUrlFront}tshirts%2Ft8.png?alt=media&token=c7cb5b47-c60f-4c2d-96f6-db33990204e4`,
    `${photoUrlFront}tshirts%2Ft9.png?alt=media&token=35a449fa-ab53-4905-85d3-80f526448413`,
    `${photoUrlFront}tshirts%2Ft10.png?alt=media&token=de536694-fc09-4f00-a656-48892530d9c3`,
  ],
  hoodies: [
    `${photoUrlFront}hoodies%2Fh1.png?alt=media&token=627e7cd5-f40a-4dd1-ae2e-c3c0cb216128`,
    `${photoUrlFront}hoodies%2Fh2.png?alt=media&token=afd3dd4e-bc91-42cc-a731-20db50094a0f`,
    `${photoUrlFront}hoodies%2Fh3.png?alt=media&token=ae4700c9-7668-4c9e-84bd-1a12dbd0a642`,
    `${photoUrlFront}hoodies%2Fh4.png?alt=media&token=650564d2-a41a-4359-a832-8124e7a8ef49`,
    `${photoUrlFront}hoodies%2Fh5.png?alt=media&token=76fad6aa-e0ed-4dae-bf7a-086ad0204f6a`,
    `${photoUrlFront}hoodies%2Fh6.png?alt=media&token=a85da446-316d-46eb-bfa6-ceeda61231c9`,
    `${photoUrlFront}hoodies%2Fh7.png?alt=media&token=48b838a0-11e0-45ca-892a-168d9423cfd5`,
    `${photoUrlFront}hoodies%2Fh8.png?alt=media&token=f487aa53-7dce-4c57-a0dd-067ab4713149`,
    `${photoUrlFront}hoodies%2Fh9.png?alt=media&token=8881f22b-42fc-477e-9f55-b99eff53ee24`,
    `${photoUrlFront}hoodies%2Fh10.png?alt=media&token=69252cdb-36b6-4b37-aa81-53adb8243bcf`,
  ],
};

const getRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const getProductsArray = () => {
  const products = [];
  for (let i = 0; i < 10; i += 1) {
    products.push({
      name: `${designNames[i]} T-Shirt`,
      price: 17.9,
      description: `This is a ${designNames[i]} T-Shirt`,
      photo: `${photoUrls.tshirts[i]}`,
      tags: [designNames[i], "T-Shirts"],
      dateCreated: getRandomDate(new Date(2022, 5, 1), new Date()),
    });
  }
  for (let i = 0; i < 10; i += 1) {
    products.push({
      name: `${designNames[i]} Hoodie`,
      price: 14.9,
      description: `This is a ${designNames[i]} Hoodie`,
      photo: `${photoUrls.hoodies[i]}`,
      tags: [designNames[i], "Hoodies"],
      dateCreated: getRandomDate(new Date(2022, 5, 1), new Date()),
    });
  }
  return products;
};

const seedData = async () => {
  const batch = writeBatch(db);

  getProductsArray().forEach((product) => {
    const productsRef = doc(collection(db, "products"));
    batch.set(productsRef, product);
  });

  try {
    await batch.commit();
    console.log("committed batch write");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default seedData;
