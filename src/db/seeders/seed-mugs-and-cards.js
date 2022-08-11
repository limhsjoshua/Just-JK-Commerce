import { collection, writeBatch, doc } from "firebase/firestore";
import { db } from "../../util/Firebase";

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
  cards: [
    `${photoUrlFront}cards%2Fc1.png?alt=media&token=74b80726-a752-4761-8cdb-5dafd788111d`,
    `${photoUrlFront}cards%2Fc2.png?alt=media&token=72d286bc-2f61-46b4-9bd0-f50d9b7ff061`,
    `${photoUrlFront}cards%2Fc3.png?alt=media&token=079add54-20af-4caa-8854-c2e42ccfbe8f`,
    `${photoUrlFront}cards%2Fc4.png?alt=media&token=c35384de-754b-4bba-8add-6ac35f3ff274`,
    `${photoUrlFront}cards%2Fc5.png?alt=media&token=803407f9-0d1b-48e3-a02c-df34fb42c5b9`,
    `${photoUrlFront}cards%2Fc6.png?alt=media&token=daebf75b-49c6-46b7-93cf-9715f5663c1b`,
    `${photoUrlFront}cards%2Fc7.png?alt=media&token=de8a4469-a93d-4b65-8fa8-5427b9b9ba93`,
    `${photoUrlFront}cards%2Fc8.png?alt=media&token=26571cc1-dc92-4646-902c-4ea7d575ad59`,
    `${photoUrlFront}cards%2Fc9.png?alt=media&token=8786512b-6605-42f7-ad62-7cb1df3fa43f`,
    `${photoUrlFront}cards%2Fc10.png?alt=media&token=e0054f6a-e271-49a1-9060-9df43f0a14a8`,
  ],
  mugs: [
    `${photoUrlFront}mugs%2Fm1.png?alt=media&token=dca8f802-0294-4bcb-afba-d2df412e4f7d`,
    `${photoUrlFront}mugs%2Fm2.png?alt=media&token=fff00825-a886-4126-a763-2e3bb1e7a169`,
    `${photoUrlFront}mugs%2Fm3.png?alt=media&token=4057a5a1-32cb-4a5b-bf5b-e86edd735c13`,
    `${photoUrlFront}mugs%2Fm4.png?alt=media&token=22a51344-9c3a-4946-8945-aaf0388eca07`,
    `${photoUrlFront}mugs%2Fm5.png?alt=media&token=5edd3414-5039-4a49-8458-ecd6d62e0e5d`,
    `${photoUrlFront}mugs%2Fm6.png?alt=media&token=2c82a816-afd6-487c-bc9d-9ca95470d348`,
    `${photoUrlFront}mugs%2Fm7.png?alt=media&token=662d7b10-a5ee-4fba-9c2d-858221ee32b6`,
    `${photoUrlFront}mugs%2Fm8.png?alt=media&token=ea81334d-6544-4e82-b835-7946e11a2ef1`,
    `${photoUrlFront}mugs%2Fm9.png?alt=media&token=46f2c66d-38aa-43c8-a733-2ce279883496`,
    `${photoUrlFront}mugs%2Fm10.png?alt=media&token=6f652608-5637-4d76-a49c-a69e766355a9`,
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
      name: `${designNames[i]} Card`,
      price: 2.9,
      description: `This is a ${designNames[i]} Card`,
      photo: `${photoUrls.cards[i]}`,
      category: "Cards",
      collection: designNames[i],
      dateCreated: getRandomDate(new Date(2022, 5, 1), new Date()),
    });
  }
  for (let i = 0; i < 10; i += 1) {
    products.push({
      name: `${designNames[i]} Mug`,
      price: 9.9,
      description: `This is a ${designNames[i]} Mug`,
      photo: `${photoUrls.mugs[i]}`,
      category: "Mugs",
      collection: designNames[i],
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
