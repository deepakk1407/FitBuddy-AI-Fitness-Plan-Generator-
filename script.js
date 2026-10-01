/* =========================================
   FITBUDDY - FRONTEND JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("fitness-form");
    const button = document.getElementById("generate-btn");
    const buttonText = document.getElementById("button-text");
    const loading = document.getElementById("loading");
    const errorBox = document.getElementById("error-message");


    if (!form) {
        console.error("FitBuddy form not found.");
        return;
    }


    /* =========================================
       FORM SUBMIT
       ========================================= */

    form.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* Clear previous error */

        hideError();


        /* Get form values */

        const formData = new FormData(form);

        const data = {
            name: formData.get("name"),
            user_id: formData.get("user_id"),
            age: Number(formData.get("age")),
            weight: Number(formData.get("weight")),
            goal: formData.get("goal"),
            intensity: formData.get("intensity")
        };


        /* =========================================
           BASIC VALIDATION
           ========================================= */

        if (!data.name || !data.user_id) {

            showError(
                "Please enter your name and User ID."
            );

            return;
        }


        if (!data.age || data.age < 13 || data.age > 100) {

            showError(
                "Please enter a valid age between 13 and 100."
            );

            return;
        }


        if (!data.weight || data.weight < 20) {

            showError(
                "Please enter a valid weight."
            );

            return;
        }


        if (!data.goal) {

            showError(
                "Please select your fitness goal."
            );

            return;
        }


        if (!data.intensity) {

            showError(
                "Please select your workout intensity."
            );

            return;
        }


        /* =========================================
           START LOADING
           ========================================= */

        setLoading(true);


        try {

            /*
             * Send data to FastAPI backend.
             *
             * Change this URL only if your backend
             * is hosted on a different domain.
             */

            const response = await fetch(
                "/api/v1/plans",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );


            /* =========================================
               HANDLE HTTP ERROR
               ========================================= */

            if (!response.ok) {

                let errorMessage =
                    "Could not generate your plan.";

                try {

                    const errorData =
                        await response.json();

                    if (errorData.detail) {

                        errorMessage =
                            typeof errorData.detail === "string"
                                ? errorData.detail
                                : JSON.stringify(
                                    errorData.detail
                                );

                    }

                } catch (error) {

                    console.error(
                        "Could not read error response:",
                        error
                    );

                }

                throw new Error(errorMessage);
            }


            /* =========================================
               READ SUCCESS RESPONSE
               ========================================= */

            const result =
                await response.json();


            /*
             * Store the generated plan temporarily.
             *
             * sessionStorage is used so that the result
             * page can display the plan.
             */

            sessionStorage.setItem(
                "fitbuddy_result",
                JSON.stringify(result)
            );


            /*
             * Also store user information separately.
             */

            sessionStorage.setItem(
                "fitbuddy_user",
                JSON.stringify(data)
            );


            /* =========================================
               GO TO RESULT PAGE
               ========================================= */

            window.location.href =
                "result.html";


        } catch (error) {

            console.error(
                "FitBuddy request failed:",
                error
            );


            showError(
                error.message ||
                "Something went wrong. Please try again."
            );


        } finally {

            setLoading(false);

        }

    });


    /* =========================================
       LOADING STATE
       ========================================= */

    function setLoading(isLoading) {

        if (!button) {
            return;
        }


        if (isLoading) {

            button.disabled = true;

            if (buttonText) {

                buttonText.textContent =
                    "Creating Your Plan...";

            }

            if (loading) {

                loading.classList.remove(
                    "hidden"
                );

            }

        } else {

            button.disabled = false;

            if (buttonText) {

                buttonText.textContent =
                    "Generate My 7-Day Plan";

            }

            if (loading) {

                loading.classList.add(
                    "hidden"
                );

            }

        }

    }


    /* =========================================
       SHOW ERROR
       ========================================= */

    function showError(message) {

        if (!errorBox) {
            alert(message);
            return;
        }


        errorBox.textContent =
            message;


        errorBox.classList.remove(
            "hidden"
        );


        errorBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* =========================================
       HIDE ERROR
       ========================================= */

    function hideError() {

        if (!errorBox) {
            return;
        }


        errorBox.textContent = "";


        errorBox.classList.add(
            "hidden"
        );

    }

});
