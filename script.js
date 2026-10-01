document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = form.querySelector('[name="name"]').value.trim();
        const userId = form.querySelector('[name="user_id"]').value.trim();
        const age = form.querySelector('[name="age"]').value;
        const weight = form.querySelector('[name="weight"]').value;
        const goal = form.querySelector('[name="goal"]').value;
        const intensity = form.querySelector('[name="intensity"]').value;

        if (!name || !userId || !age || !weight || !goal || !intensity) {
            alert("Please fill all the details.");
            return;
        }

        const userData = {
            name: name,
            user_id: userId,
            age: age,
            weight: weight,
            goal: goal,
            intensity: intensity
        };

        localStorage.setItem(
            "fitbuddy_user",
            JSON.stringify(userData)
        );

        const button = form.querySelector("button");

        if (button) {
            button.disabled = true;
            button.innerHTML = "Creating your personalized plan...";
        }

        setTimeout(function () {
            window.location.href = "result.html";
        }, 800);

    });

});
