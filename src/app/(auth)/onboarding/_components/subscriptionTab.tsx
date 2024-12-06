import {
   Button,
   Checkbox,
   Layer,
   Tab,
   TabList,
   TabPanel,
   TabPanels,
   Tabs,
   TextInput,
} from "@carbon/react"

import React from "react"

function SubscriptionTab() {
   return (
    <div style={{width: '100%', height: "20rem"}}>
      <p>should show tab view</p>
    <Tabs>
    <TabList aria-label="List of tabs">
      <Tab>Dashboard</Tab>
      <Tab>Monitoring</Tab>
      <Tab>Activity</Tab>
      <Tab disabled>Settings</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>
        <form style={{
        margin: '2em'
      }}>
          <legend className={`cds--label`}>Validation example</legend>
          <Checkbox id="cb" labelText="Accept privacy policy" />
          <Button style={{
          marginTop: '1rem',
          marginBottom: '1rem'
        }} type="submit">
            Submit
          </Button>
          <TextInput type="text" labelText="Text input label" helperText="Optional help text" id="text-input-1" />
        </form>
      </TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
    </TabPanels>
  </Tabs>
  </div>
   )
}

export default SubscriptionTab
