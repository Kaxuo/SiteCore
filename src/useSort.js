

  // Custom Hooks //

  export const sortByName = (array) => {
    let sortedByName = [...array]
    sortedByName.sort((a, b) => {
      let nameA = a.name.toUpperCase();
      let nameB = b.name.toUpperCase();
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0
    })
    return sortedByName
  }

   export const sortById = (array) => {
    let sortedById = [...array]
    sortedById.sort((a, b) => {
      return a.id - b.id
    })
    return sortedById
  }

