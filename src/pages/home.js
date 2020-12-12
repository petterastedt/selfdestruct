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
      <Footer footerMessage={[" 💻 Created by ", <a href="https://www.petterastedt.com" className="link-styled" target="_blank" rel="noreferrer noopener">Petter Åstedt.</a>, " Learn more about this project --> ", <strike>here</strike>]} />
    </div>
  </div>
)

export default Home