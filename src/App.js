import React, { useState, useEffect } from 'react';
import { getCollectionsAsync, getAssetByIdAsync, getAssetsByCollectionAsync } from './data/data'
import Collections from './components/Collections'
import Assets from './components/Assets'
import Dropdown from './components/Dropdown'
import Particle from './components/Particle'
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

  // Getting all the collections AND the thumbnail AND the single asset linked to the collection (by MasterID) // 

  const runCollections = async () => {
    let fetchCollection = await getCollectionsAsync()
    fetchCollection = await Promise.all(fetchCollection.map(async (collection) => ({ ...collection, asset: await getAssetByIdAsync(collection.masterAssetId) })))
    setcollections(fetchCollection)
    let temp = []
    fetchCollection.map(item => {
      temp.splice(temp.length, 0, item.asset.path)
      return temp
    })
    setthumbnail(temp)
  }

  // Getting the assets depending on the collection //

  const runAssetsByCollectionsId = async (id) => {
    simulateLoadingItem()
    const fetchCollectionById = await getAssetsByCollectionAsync(id)
    // Sort by name by default //
    fetchCollectionById.sort((a, b) => {
      let nameA = a.name.toUpperCase();
      let nameB = b.name.toUpperCase();
      setassetsByCollections(fetchCollectionById)
      setstate("name")
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0
    })
    setitemloading(false)
  }

  // Simuate Loading time according to setTimeOut in data.js //

  const simulateloadingTime = () => {
    setTimeout(() => {
      setitemloading(false)
      setloading(false)
    }, 1600);
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


  // Sorting Functionality //

  const sortByName = () => {
    let sortedByName = [...assetsByCollections]
    sortedByName.sort((a, b) => {
      let nameA = a.name.toUpperCase();
      let nameB = b.name.toUpperCase();
      setassetsByCollections(sortedByName)
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0
    })
  }

  const sortById = () => {
    let sortedById = [...assetsByCollections]
    sortedById.sort((a, b) => {
      setassetsByCollections(sortedById)
      return a.id - b.id
    })
  }

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
        itemloading={itemloading}
        state={state}
        assetsByCollections={assetsByCollections}
        handleChange={handleChange}
        sortByName={sortByName}
        sortById={sortById} />
      <Assets
        thumbnail={thumbnail}
        assetsByCollections={assetsByCollections}
        change={change}
        itemloading={itemloading} />
    </div>
  );
}

export default App;
