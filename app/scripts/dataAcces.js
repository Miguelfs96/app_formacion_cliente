const getDataFromCandidatures = async() => {
  return await fetch('/data/candidatures.json')
    .then(async(response) => {
      return response.json()
    }).catch(error => console.error(error))
}

const getDataFormOffer = () => {
  fetch('/data/offer.json')
    .then(response => response.json())

}

export {getDataFromCandidatures};