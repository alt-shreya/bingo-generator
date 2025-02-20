import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const suggestions = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "This is a test to check rendering",
  "Item 7",
  "Item 8",
  "Item 9",
  "Item 10",
  "Item 11",
  "Item 12",
  "Item 13",
  "Item 14",
  "Item 15",
  "Item 16",
  "Item 17",
  "Item 18",
  "Item 19",
  "Item 20",
  "Item 21",
  "Item 22",
  "Item 23",
  "Item 24",
  "Item 25",
];

function BingoGenerator() {
  const [grid1, setGrid1] = useState(shuffleArray([...suggestions]));
  const [grid2, setGrid2] = useState(shuffleArray([...suggestions]));

  // Shuffle function
  function shuffleArray(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  // Shuffle both grids
  function shuffleGrids() {
    setGrid1(shuffleArray([...suggestions]));
    setGrid2(shuffleArray([...suggestions]));
  }

  // Download both grids as PDF
  function downloadGridsAsPDF() {
    const input = document.getElementById("bingo-grids"); // Select the container with both grids
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4", // Set the PDF to A4 size
      });

      // Add margins for the PDF (20px margins on all sides)
      const margin = 20;
      const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin; // Subtracting margin
      const pageHeight = pdf.internal.pageSize.getHeight() - 2 * margin;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      // Add the image to the PDF with margins
      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
      pdf.save("bingo_grids_with_heading.pdf");
    });
  }

  return (
    <div className="bingo-container">
      <h1>Bingo Generator</h1>
      <div id="bingo-grids" className="grids">
        <h2>Grid 1</h2>
        <div className="grid">
          {grid1.map((item, index) => (
            <div key={index} className="grid-item">
              {item}
            </div>
          ))}
        </div>
        <h2>Grid 2</h2>
        <div className="grid">
          {grid2.map((item, index) => (
            <div key={index} className="grid-item">
              {item}
            </div>
          ))}
        </div>
      </div>
      <button onClick={shuffleGrids}>Shuffle Both Grids</button>
      <button onClick={downloadGridsAsPDF}>Download as PDF</button>

      <style>{`
        .bingo-container {
          text-align: center;
          font-family: Arial, sans-serif;
          padding: 20px; /* Add padding to the container */
        }
        .grids {
          display: flex;
          flex-direction: column;
          gap: 30px; /* Add space between the two grids */
          margin: 20px auto; /* Add margin around the grids */
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin: 0 auto;
          width: 600px; /* Set a reasonable width for the grid */
        }
        h2 {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .grid-item {
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          padding: 15px;
          text-align: center;
          font-size: 14px;
          word-wrap: break-word; /* Ensure long text breaks into multiple lines */
        }
        button {
          margin: 10px;
          padding: 12px 20px;
          font-size: 14px;
          cursor: pointer;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}

export default BingoGenerator;
