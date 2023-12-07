const path = require('path');
const puppeteer = require('puppeteer');


//fills in html file with our mock data
function fillOutTemplate(htmlTemplate, mockData) {
  try {
    return htmlTemplate.replace(/{{(.*?)}}/g, (match, p1) =>
    mockData[p1.trim()] || match
  );
  }  catch (error) {
    console.error('Error filling out template:', error);
    throw error; // rethrow the error for better debugging
  }
}


const getPDF = async (req, res) => {
    
    try {

      const mockData = {
        invoiceNo: 'INV-001',
        date: '2023-12-15',
        reference: 'REF-123',
        employee: 'John Doe',
        hours: 10,
        rate: 25,
        total: 250,
        salesTax: 21.25,
        totalInvoice: 271.25,
      };

        //create function that will take HTML template and convert to PDF and send PDF to front
      
        //constains HTML template
        const htmlFile=path.join(__dirname, '../sample.html');

        //puppeter actions
        const browser=await puppeteer.launch();
        const page=await browser.newPage();

        //read html file
        const htmlContent=require('fs').readFileSync(htmlFile,'utf8');
        console.log(htmlContent)

        // Optionally fill out the HTML template with mock data
    const filledHtmlContent = fillOutTemplate(htmlContent, mockData);

        //set file to the page
        await page.setContent(filledHtmlContent);

        //create pdf (A1-6? different paper sizes)
        const pdf=await page.pdf({ format: 'A4',
        scale: 0.4,}) 

        //close puppeter
        await browser.close()
        
  
        // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=sample.pdf');

    // Send pdf -> client
    res.status(200).send(pdf);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };

  module.exports={getPDF}