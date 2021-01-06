import React from 'react'
import Header from './../components/Header/Header'
import Form from './../components/Form/Form'
import Footer from './../components/Footer/Footer'
import './../main.css'

const Home = () => (
  <div className="container home-page">
    <div className="pageWrapper centerComponent centerComponentVertically">
      <Header />
      <Form />
      <Footer footerMessage={[<div><span className="footer-explaination">How does this work? Find out --> <a href="/about" aria-label="Find out more about this project">here</a></span></div> ]} />
    </div>
  </div>
)

export default Home