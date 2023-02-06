import React from 'react'

export interface HomePageProps {}

const HomePage: React.FC = (props: HomePageProps) => {
  return (
    <div>
      <h1>
        Home Page
      </h1>
      <p>Som content</p>
    </div>
  )
}

export default HomePage