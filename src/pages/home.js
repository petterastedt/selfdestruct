import React from 'react'
import Header from './../components/Header/Header'
import Form from './../components/Form/Form'
import Footer from './../components/Footer/Footer'

const Home = () => (
  <>
    <div className="home-page pageWrapper centerComponentVertically">
      <Header />
      <Form />
    </div>
    <Footer
      footerText="Learn more about this project --> "
      footerUrl="/about"
      footerUrlText="here"
    />
  </>
)

export default Home
