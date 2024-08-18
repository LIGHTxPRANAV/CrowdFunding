import React, { useEffect, useContext, useState } from 'react'

import { CrowdFundingContext } from '@/Context/CrowdFunding'
import { Hero, Card, PopUp } from '../Components'

const Index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext)

  const [allCampaign, setAllCampaign] = useState([])
  const [userCampaign, setUserCampaign] = useState([])
  const [openModel, setOpenModel] = useState(false)
  const [donateCampaign, setDonateCampaign] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getCampaigns()
      const userData = await getUserCampaigns()
      setAllCampaign(allData)
      setUserCampaign(userData)
    }

    fetchData()
  }, [getCampaigns, getUserCampaigns]) // Add dependencies to avoid stale closures

  console.log(donateCampaign)

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />
      <Card
        title="All listed Campaigns"
        allCampaign={allCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />
      <Card
        title="Your Created Campaigns"
        allCampaign={userCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />
      {openModel && (
        <PopUp
          setOpenModel={setOpenModel}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  )
}

export default Index
