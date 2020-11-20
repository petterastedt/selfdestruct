import React from 'react'
import Form from './../components/Form/Form'
import Footer from './../components/Footer/Footer'
import './../main.css'

const Home = () => (
  <div className="container">
    <div className="pageWrapper centerComponent centerComponentVertically">
      <h1>selfdestructth.is</h1>
      <h4>share self-destructing messages anonymously</h4>
      <Form />
      <Footer footerMessage={["This message was brought to you by ", <a href="/" className="link-styled">selfdestructth.is</a>]} />
    </div>
  </div>
)

export default Home