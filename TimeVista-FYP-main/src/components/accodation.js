import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function Accodation() {
  return (
    <>
      <div className="p-16">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <p className="text-4xl">Frequently Asked Questions</p>
          <p className="mx-0 my-4 mb-0">
            You may have questions, we have the answers.
          </p>
        </div>
        <div className="flex_box">
          <Accordion allowToggle style={{ width: "50%" }}>
            <AccordionItem className="p-3 acc-item">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    What is TimeVista?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="p-3 text-base">
                TimeVista is a web application designed to provide stakeholders,
                from the general public to farm owners, with agricultural and
                air quality forecasts. It utilizes deep learning to combine
                agricultural weather prediction, crop yield forecasting, and
                smog prediction through dynamic map interfaces and interactive
                infographics.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem className="p-3 acc-item">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    How does TimeVista help stakeholders?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="p-3 text-base">
                TimeVista helps stakeholders in better planning and
                implementation by providing historical insights, using machine
                learning techniques for forecasting, and offering interactive
                visualizations of agricultural and air quality data.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem className="p-3 acc-item">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    What data does TimeVista use for forecasting?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="p-3 text-base">
                TimeVista utilizes over 40 years of climate data to predict the
                yield of Pakistan's top 5 crops in the future. It incorporates
                agricultural climate variables to present comprehensive
                forecasts.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem className="p-3 acc-item">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    What role does deep learning play in TimeVista?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="p-3 text-base">
                Deep learning is the core technology used in TimeVista for data
                analysis and forecasting. It powers the prediction models for
                agricultural weather, crop yield, and smog, enabling accurate
                and timely forecasts.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem className="p-3 acc-item">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    What technologies are used in TimeVista?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="p-3 text-base">
                TimeVista utilizes deep learning for data analysis and
                forecasting. It integrates agricultural weather prediction, crop
                yield forecasting, and smog prediction using dynamic map
                interfaces and interactive infographics.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Accordion allowToggle style={{ width: "50%" }}>
            <AccordionItem className="p-3 acc-item">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    How accurate are the forecasts provided by TimeVista?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="p-3 text-base">
                TimeVista leverages advanced machine learning techniques to
                provide accurate forecasts based on historical data and
                real-time inputs. However, the accuracy may vary depending on
                the complexity of the underlying factors and the quality of
                available data.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem className="p-3 acc-item">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    How does TimeVista address climate change?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="p-3 text-base">
                TimeVista addresses climate change by integrating historical
                climate data and insights to inform stakeholders and inspire
                action towards a sustainable future. By providing actionable
                information, it aims to support informed decision-making and
                mitigate the impacts of climate change.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem className="p-3 acc-item">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Can TimeVista predict smog trends?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="p-3 text-base">
                Yes, TimeVista can predict smog trends over time using deep
                learning models. It offers forecasts that assist policymakers in
                implementing targeted interventions to combat air pollution.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem className="p-3 acc-item">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    How can users explore a specific region of interest in
                    TimeVista?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="p-3 text-base">
                Users can explore a specific region of interest in TimeVista by
                using the interactive map interface. They can simply click on
                the map to select their desired region and access relevant data
                and forecasts.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem className="p-3 acc-item">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Who is behind the development of TimeVista?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="p-3 text-base">
                TimeVista is developed by a team of Ali Amir Khawaja, Nirmal Rai
                and Hashim Mahmood, under the supervision and guidance of
                advisors Dr. Shah Khalid and Dr. Bilal Ali.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
