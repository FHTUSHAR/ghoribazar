import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const FAQ = () => {

    return (
        <div className='p-9 divide-y divide-red-600  mt-16'>
            <div><h2 className='text-4xl font-semibold text-blue-500 mb-5 py-3'>FAQ</h2></div>
            <div className='shadow-lg shadow-red-700  p-6 '>
                <Accordion>
                    <AccordionItem className='bg-red-700'>
                        <AccordionItemHeading >
                            <AccordionItemButton className='bg-black text-white'>
                                Is there money back gurranty?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p className='text-yellow-400'>
                                No.There is no money back gurrenty
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem className='bg-red-700'>
                        <AccordionItemHeading>
                            <AccordionItemButton className='bg-black text-white'>
                                Can we get 24 hour service?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p className='text-yellow-400'>
                                Yes
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem className='bg-red-700'>
                        <AccordionItemHeading>
                            <AccordionItemButton className='bg-black text-white'>
                                Do you provide customer privacy ?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p className='text-yellow-400'>
                                Yes.We provide customers privacy
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>

        </div>
    );
};

export default FAQ;