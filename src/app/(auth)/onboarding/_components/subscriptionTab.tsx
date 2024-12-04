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
      <Tabs>
         <TabList aria-label="List of tabs" contained fullWidth>
            <Tab>TLS</Tab>
            <Tab>Origin</Tab>
         </TabList>
         <TabPanels>
            <TabPanel>Tab Panel 1</TabPanel>
            <TabPanel>
               <Layer>
                  <form
                     style={{
                        margin: "2em",
                     }}
                  >
                     <legend className={`cds--label`}>Validation example</legend>
                     <Checkbox id="cb" labelText="Accept privacy policy" />
                     <Button
                        style={{
                           marginTop: "1rem",
                           marginBottom: "1rem",
                        }}
                        type="submit"
                     >
                        Submit
                     </Button>
                     <TextInput
                        type="text"
                        labelText="Text input label"
                        helperText="Optional help text"
                        id={""}
                     />
                  </form>
               </Layer>
            </TabPanel>
            <TabPanel>Tab Panel 3</TabPanel>
            <TabPanel>Tab Panel 4</TabPanel>
         </TabPanels>
      </Tabs>
   )
}

export default SubscriptionTab
