function stepper() {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("stepperxxx");
        $("#smartwizard-arrows-primary").smartWizard({
            theme: "arrows",
            showStepURLhash: false
        });
    });
}