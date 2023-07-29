// Initialize the Firebase Admin SDK
import dbConfig from "../../firebase/firebase";
import axios from 'axios';
import { collectionRef } from "../../firebase/firebase";
const baseUrl="https://spotify-scraper.p.rapidapi.com/v1/track/search"
const songsDB = [];
const songsFinalDB = [];
const spotScrapperApiKey = process.env.REACT_APP_SPOT_SCRAPPER_API_KEY;
const spotScrapper=process.env.REACT_APP_SPOT_SCRAPPER;

const deStructure = (data,song_url) => {
  if (!data) {
    return { status: false };
  }
  
  const { name, album, durationText, artists } = data;
  const song_name = name;
  const album_name = album.name;
  const artists_names = artists.map((artist) => artist.name);
  const song_duration = durationText;
  const album_photo = album.cover[2].url;


  return {
    song_name,
    album_name,
    artists_names,
    song_duration,
    album_photo,
    song_url:song_url,
    status: true
  };
};

//ADding  songs to the FireStore
const addSongsToFireStore=(songsFinalDB)=>{
  // Reference to the Firestore collection
// Append songsFinalDB to the collection
songsFinalDB.forEach((song) => {
  if(song.status){
  collectionRef.add(song)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
}});
}


// Helper function to introduce a delay
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const fetchMusicsData = async () => {
  try {
    // Get the documents from the 'Musics' collection
    const snapshot = await dbConfig.collection('Musics').get();
    
    // Iterate over the documents and update the "checked" field to false
    const updatePromises = [];
    snapshot.forEach((doc) => {
   
      if (!doc.data().checked) {

        const updatePromise = doc.ref.update({ checked: true });
        updatePromises.push(updatePromise);
        songsDB.push(doc.data());
       
      }
    });

    // Wait for all update operations to complete
    await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error fetching Musics:', error);
  }
};


const fetchAllSongsInfo = async () => {
  try {
    await fetchMusicsData(); // Wait for fetchMusicsData to complete before proceeding
    const promises = songsDB.map(async (ele, index) => {
      
      await delay(index * 6000); // Wait for 6 seconds multiplied by the index
      return fetchSongsInfo(ele.title, ele.artist,ele.song_url);
      
    });

    const results = await Promise.all(promises);
    songsFinalDB.push(...results);
  } catch (error) {
    console.error('Error fetching song info:', error);
    
  }
};

const fetchSongsInfo = async (title, artist,song_url) => {
 
  const options = {
    method: 'GET',
    url: baseUrl,
    params: {
      name: `${title} ${artist}`
    },
    headers: {
      'X-RapidAPI-Key': spotScrapperApiKey,
      'X-RapidAPI-Host': spotScrapper
    }
  };

  try {
    const response = await axios.request(options);
    return deStructure(response.data,song_url);
  } catch (error) {
    console.error('Error fetching song info:', error);

    return null;
  }
};

// Wrap the code in an async function to use await
const runCode = async () => {
  await fetchAllSongsInfo();
  
  addSongsToFireStore(songsFinalDB);

};


console.log("songs final DB",songsFinalDB);


export {songsDB,runCode};
export default songsFinalDB;