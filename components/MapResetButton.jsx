import { useMap } from 'react-leaflet'

const MapResetButton = ({ center }) => {
  const map = useMap()
  const handleReset = () => {
    map.setView([center.y, center.x])
    return null
  }
  return (
    <button
      onClick={() => handleReset()}
      style={{
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: 'white',
      }}>
      ăȘă»ăă
    </button>
  )
}

export default MapResetButton
