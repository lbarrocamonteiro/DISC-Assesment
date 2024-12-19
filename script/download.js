// import * as XLSX from "sheetjs-style";

// Function to generate the PDF without splitting HTML elements
async function downloadPdf() {
    const reportSection = document.getElementById("report");
    const downloadPdfButton = document.getElementById("downloadPdfBtn");
    const downloadExcelButton = document.getElementById("downloadExcelBtn");

    // Hide buttons during processing
    downloadPdfButton.classList.add("hidden");
    downloadExcelButton.classList.add("hidden");

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth()-10;
    const pdfHeight = pdf.internal.pageSize.getHeight()-10;

    // Use html2canvas to capture elements
    const elements = Array.from(reportSection.children); // Get all child elements
    let currentHeight = 20; // Start margin from the top

    for (const element of elements) {
        // Use html2canvas to capture the current element
        const canvas = await html2canvas(element, {
            scale: 3, // High resolution
            useCORS: true, // Allow loading external images
        });

        const imgData = canvas.toDataURL("image/png"); // Convert to PNG
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        if (currentHeight + imgHeight + 20 > pdfHeight) {
            // If the element doesn't fit, add a new page
            pdf.addPage();
            currentHeight = 20; // Reset margin for the new page
        }

        pdf.addImage(imgData, "PNG", 20, currentHeight, imgWidth-20, imgHeight);
        currentHeight += imgHeight + 10; // Add spacing between elements
    }

    const userData = JSON.parse(localStorage.getItem("userData"))

    // Save the PDF
    pdf.save("relatorio-disc_"+userData.name+" "+userData.surname+".pdf");
    downloadPdfButton.classList.remove("hidden");
    downloadExcelButton.classList.remove("hidden");
}


// data.push([...Object.keys(natural_scores).map((key) => `${key} Natural`)]);
// data.push([...Object.values(natural_scores)])
// data.push([])

// data.push([...Object.keys(adaptado_scores).map((key) => `${key} Adaptado`)]);
// data.push([...Object.values(adaptado_scores)])
// data.push([])


async function downloadExcel(natural_scores, adaptado_scores) {
    const downloadPdfButton = document.getElementById("downloadPdfBtn");
    const downloadExcelButton = document.getElementById("downloadExcelBtn");

    // Hide buttons during processing
    downloadPdfButton.classList.add("hidden");
    downloadExcelButton.classList.add("hidden");

    try {
        // Collect data from the report section
        const data = [];
        
        // Add user details
        const userDetails = {
            Name: document.getElementById("userName").innerText,
            Surname: document.getElementById("userSurname").innerText,
            Email: document.getElementById("userEmail").innerText,
            Date: document.getElementById("userDate").innerText,
        };
        data.push(["Name", userDetails.Name]);
        data.push(["Surname", userDetails.Surname]);
        data.push(["Email", userDetails.Email]);
        data.push(["Date", userDetails.Date]);
        data.push([])

        // Add natural and adapted scores
        data.push(["Dimension", "Natural Score", "Adapted Score"]);
        Object.keys(natural_scores).forEach((key) => {
            data.push([key, natural_scores[key], adaptado_scores[key]]);
        });
        data.push([]);

        // Add profile summary
        const profileSummary = document.getElementById("profileSummary").innerText;
        data.push(["Resumo do Perfil"]);
        data.push([profileSummary]);
        data.push([]);

        // Add motivators
        const motivators = Array.from(document.getElementById("motivators").querySelectorAll("li")).map((li) => li.innerText);
        data.push(["Motivadores"]);
        motivators.forEach((motivator) => data.push([motivator]));
        data.push([]);

        // Add demotivators
        const demotivators = Array.from(document.getElementById("demotivators").querySelectorAll("li")).map((li) => li.innerText);
        data.push(["Desmotivadores"]);
        demotivators.forEach((demotivator) => data.push([demotivator]));
        data.push([]);

        // Add ideal work environment
        const idealEnvironment = Array.from(document.getElementById("idealWorkEnvironment").querySelectorAll("li")).map((li) => li.innerText);
        data.push(["Ambiente Ideal de Trabalho"]);
        idealEnvironment.forEach((env) => data.push([env]));
        data.push([]);

        // Add development suggestions
        const developmentSuggestions = Array.from(document.getElementById("developmentSuggestions").querySelectorAll("li")).map((li) => li.innerText);
        data.push(["Sugestões de Desenvolvimento"]);
        developmentSuggestions.forEach((suggestion) => data.push([suggestion]));
        data.push([]);

        for (let i = 0; i < data.length; i++) {
            if (Array.isArray(data[i])) {
                data[i].unshift(""); // Add an empty string at the start of the row
            }
        }

        // Create a workbook and sheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);

        worksheet["!cols"] = [
            { wch: 10 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 10 }
        ];

        worksheet["!merges"] = []
        for(let i = 11; i < 39; i++) {
            worksheet["!merges"].push({ s: { r: i, c: 1 }, e: { r: i, c: 3 } })
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório DISC");

        // Download the Excel file
        XLSX.writeFile(workbook, "relatorio-disc_"+userDetails.Name+" "+userDetails.Surname+".xlsx");
    } catch (error) {
        console.error("Error generating Excel:", error);
    } finally {
        // Show buttons again after processing
        downloadPdfButton.classList.remove("hidden");
        downloadExcelButton.classList.remove("hidden");
    }
}

export { downloadPdf, downloadExcel };
