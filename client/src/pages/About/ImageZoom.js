import React from 'react'

function ImageZoom({ zoom, src, alt, background }) {
  const zoomRef = React.useRef(zoom.clone({ background }))

  function attachZoom(image) {
    zoomRef.current.attach(image)
  }

  return <img src={src} alt={alt} ref={attachZoom} style={styles} />
}

export default ImageZoom

const styles = {
  textAlign: 'center',
  cursor: 'pointer',
  width: 600,
}
