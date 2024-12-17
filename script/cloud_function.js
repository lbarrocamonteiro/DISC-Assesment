
async function submitForm(natural_scores, adaptado_scores) {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (!userData.name) {
        console.error("User data is missing.");
        return;
    }

    const jsonData = {
        Name: userData.name,
        Surname: userData.surname,
        Email: userData.email,
        Date: userData.date,
        ...Object.fromEntries(
            Object.entries(natural_scores).map(([key, value]) => [`${key} Natural`, value])
        ),
        ...Object.fromEntries(
            Object.entries(adaptado_scores).map(([key, value]) => [`${key} Adaptado`, value])
        )
    };

    try {
        const response = await fetch("https://europe-west9-luis-disc-form.cloudfunctions.net/export_to_gs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData)
        });

        if (response.ok) {
            console.log("Form submitted successfully!");
        } else {
            console.error("Error submitting form:", await response.text());
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
}

export { submitForm }