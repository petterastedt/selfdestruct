import React from 'react'

const CustomLink = (props) => {
  const isImage = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)

  return (
    <>
      {isImage(props.href) ? (
        <img
          alt="attached file"
          className="customLink-image"
          decoding="async"
          loading="lazy"
          src={props.href}
        />
      ) : (
        <a {...props} />
      )}
    </>
  )
}

export default CustomLink
