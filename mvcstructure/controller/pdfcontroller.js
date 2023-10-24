const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const user = require('../model/userModels');
const catdata1 = require('../model/catModel');

const getPDF = async (req, res) => {
  const doc = new PDFDocument();
  let data = await user.find();
  let catdata = await catdata1.find();

  // Set the content type to PDF for the response
  res.setHeader('Content-Type', 'application/pdf');

  // Set the Content-Disposition header to force download
  res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');

  // Pipe the PDF content to the response
  doc.pipe(res);

  // Add User Data to the PDF
  doc.fontSize(18).fillColor('blue').text('User Data:', 100, 150);

  data.forEach((userData, index) => {
    doc
      .fontSize(12)
      .fillColor('black')
      .text(`User ${index + 1}:`, 100, doc.y)
      .text(`Name: ${userData.name}`, 120, doc.y)
      .text(`Email: ${userData.email}`, 120, doc.y)
      .moveDown(); // Move down to create space between users
  });

  // Add a separator line
  doc.addPage();

  // Add Category Data to the PDF
  doc.fontSize(18).fillColor('blue').text(`Categories added by ${data[0].name}:`, 100, 150);

  catdata.forEach((data, index) => {
    doc
      .fontSize(12)
      .fillColor('green')
      .text(`Category ${index + 1}:`, 100, doc.y)
      .text(`Name: ${data.name}`, 120, doc.y)
      .moveDown(); // Move down to create space between categories
  });

  // End the PDF document
  doc.end();
};

module.exports = getPDF;
