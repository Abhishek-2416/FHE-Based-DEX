import React from 'react'
import Cards from '@/components/common/cards'
import Swap from '@/components/home/swap'

type Props = {}

const Home = (props: Props) => {
  return (
    <section className="px-12 py-32">
      <div className="grid grid-cols-3 gap-4 my-3">
        <Cards title="Swap Component" component={<Swap />} />
      </div>
    </section>
  )
}

export default Home