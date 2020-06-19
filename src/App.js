import React, { useState, useEffect } from 'react';
import { getCollectionsAsync, getAssetByIdAsync, getAssetsByCollectionAsync } from './data/data'
import Collections from './components/Collections'
import Assets from './components/Assets'
import Dropdown from './components/Dropdown'
import Particle from './components/Particle'
import {sortByName, sortById} from "./useSort"
import './App.css';


function App() {


  const [loading, setloading] = useState(true)
  const [itemloading, setitemloading] = useState(true)
  const [collections, setcollections] = useState([])
  const [thumbnail, setthumbnail] = useState([])
  const [assetsByCollections, setassetsByCollections] = useState([])
  const [state, setstate] = useState("name")

  // HandleChange function for the Dropdown //

  const handleChange = (event) => {
    event.preventDefault()
    let value = event.target.value
    setstate(value)
  }


  // Getting all the collections // the thumbnail // the single asset linked to the collection (by MasterID) // 

  const runCollections = async () => {
    let fetchCollection = await getCollectionsAsync()
    fetchCollection = await Promise.all(fetchCollection.map(async (collection) => ({ ...collection, asset: await getAssetByIdAsync(collection.masterAssetId) })))
    setcollections(fetchCollection)
    let temp = []
    temp = fetchCollection.map(item => {
      return item.asset.path
    })
    setthumbnail(temp)
  }

  // Getting the assets depending on the collection //

  const runAssetsByCollectionsId = async (id) => {
    simulateLoadingItem()
    const fetchCollectionById = await getAssetsByCollectionAsync(id)
    // Sort by name by default //
    const sortedByName = sortByName(fetchCollectionById)
    setassetsByCollections(sortedByName)
    setstate("name")
    setitemloading(false)
  }

  // Simulate Loading time according to setTimeOut in data.js //

  const simulateloadingTime = () => {
    setTimeout(() => {
      setitemloading(false)
      setloading(false)
    }, 1800);
  }

  const simulateLoadingItem = () => {
    setitemloading(true)
  }

  // Make Master button //

  const change = (asset) => {
    let items = [...thumbnail]
    let item = items[asset.collectionId - 1]
    item = asset.path
    items[asset.collectionId - 1] = item
    setthumbnail(items)
  }

  useEffect(() => {
    simulateloadingTime()
    runCollections()
  }, []);

  return (
    <div className="App">
      <Particle />
      <Collections
        assetsByCollections={assetsByCollections}
        itemloading={itemloading}
        thumbnail={thumbnail}
        loading={loading}
        collections={collections}
        runAssetsByCollectionsId={runAssetsByCollectionsId} />
      <Dropdown loading={loading}
        sortById={array => setassetsByCollections(sortById(array))}
        sortByName={array => setassetsByCollections(sortByName(array))}
        itemloading={itemloading}
        state={state}
        assetsByCollections={assetsByCollections}
        handleChange={handleChange} />
      <Assets
        thumbnail={thumbnail}
        assetsByCollections={assetsByCollections}
        change={change}
        itemloading={itemloading} />
    </div>
  );
}

export default App;
