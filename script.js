/* =====================================================
   FITBUDDY
   Frontend-only version
===================================================== */


/* =====================================================
   FORM
===================================================== */

const fitnessForm =
    document.getElementById("fitnessForm");


if (fitnessForm) {

    fitnessForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name")
                .value
                .trim();

            const userId =
                document.getElementById("userId")
                .value
                .trim();

            const age =
                Number(
                    document.getElementById("age").value
                );

            const weight =
                Number(
                    document.getElementById("weight").value
                );

            const goal =
                document.getElementById("goal").value;

            const intensity =
                document.getElementById("intensity").value;


            if (!name || !userId || !age || !weight ||
                !goal || !intensity) {

                alert("Please fill all the details.");

                return;
            }


            if (name.length < 2) {

                alert("Name must contain at least 2 characters.");

                return;
            }


            if (age < 13 || age > 100) {

                alert("Age must be between 13 and 100.");

                return;
            }


            if (weight <= 20 || weight > 500) {

                alert("Please enter a valid weight.");

                return;
            }


            if (!/^[A-Za-z0-9_-]+$/.test(userId)) {

                alert(
                    "User ID can contain only letters, numbers, _ and -."
                );

                return;
            }


            const user = {

                name,
                userId,
                age,
                weight,
                goal,
                intensity

            };


            const plan =
                createPlan(user);


            localStorage.setItem(
                "fitbuddyUser",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "fitbuddyPlan",
                JSON.stringify(plan)
            );


            const button =
                document.getElementById(
                    "generateButton"
                );


            button.disabled = true;

            button.innerHTML =
                "Creating your personalized plan...";


            setTimeout(
                function () {

                    window.location.href =
                        "result.html";

                },
                700
            );

        }
    );
}


/* =====================================================
   CREATE PLAN
===================================================== */

function createPlan(user) {

    const goal = user.goal;

    const intensity = user.intensity;


    let overview;


    if (goal === "muscle gain") {

        overview =
            `A 7-day ${intensity} muscle-gain workout plan designed for ${user.name}, aged ${user.age}, focusing on progressive overload with adequate recovery.`;

    } else if (goal === "weight loss") {

        overview =
            `A 7-day ${intensity} weight-loss workout plan designed for ${user.name}, combining strength training, cardio and active recovery.`;

    } else if (goal === "endurance") {

        overview =
            `A 7-day ${intensity} endurance workout plan designed for ${user.name}, focusing on cardiovascular fitness and progressive conditioning.`;

    } else if (goal === "flexibility") {

        overview =
            `A 7-day ${intensity} flexibility plan designed for ${user.name}, focusing on mobility, stretching and controlled movement.`;

    } else {

        overview =
            `A 7-day ${intensity} general wellness workout plan designed for ${user.name}, combining strength, mobility, cardio and recovery.`;

    }


    return {

        overview,

        safety:
            "Please consult a healthcare professional or certified trainer before starting any new fitness program, especially if you have pre-existing injuries or health conditions.",

        nutrition: {

            tip:
                goal === "muscle gain"
                    ? "Eat balanced meals with enough protein and vegetables."
                    : goal === "weight loss"
                    ? "Focus on balanced portions with protein, vegetables and whole foods."
                    : "Eat balanced meals with protein, vegetables, fruits and whole grains.",

            hydration:
                "Drink water regularly throughout the day.",

            recovery:
                "Prioritize good sleep and recovery."

        },

        days: createDays(user)

    };
}


/* =====================================================
   DAYS
===================================================== */

function createDays(user) {

    const intensity =
        user.intensity;


    const restTime =
        intensity === "high"
            ? "90 seconds"
            : intensity === "medium"
            ? "60 seconds"
            : "45 seconds";


    return [

        {
            day: "Day 1",
            focus: "Upper Body - Push",

            warmup:
                "5 minutes of arm circles and light shoulder mobility exercises",

            exercises: [

                exercise(
                    "Push-ups",
                    "3",
                    "10-12 reps",
                    restTime,
                    "Keep core tight and lower chest to the floor."
                ),

                exercise(
                    "Dumbbell Overhead Press",
                    "3",
                    "8-10 reps",
                    "90 seconds",
                    "Use a moderate weight to maintain good posture."
                ),

                exercise(
                    "Dumbbell Lateral Raises",
                    "3",
                    "12 reps",
                    "60 seconds",
                    "Control the descent of the weights."
                )

            ],

            cooldown:
                "5 minutes of full body stretching"

        },


        {
            day: "Day 2",
            focus: "Lower Body - Strength",

            warmup:
                "5 minutes of light walking and dynamic leg movements",

            exercises: [

                exercise(
                    "Bodyweight Squats",
                    "3",
                    "12-15 reps",
                    restTime,
                    "Keep knees aligned with your toes."
                ),

                exercise(
                    "Reverse Lunges",
                    "3",
                    "10 reps each leg",
                    restTime,
                    "Maintain an upright posture."
                ),

                exercise(
                    "Glute Bridges",
                    "3",
                    "15 reps",
                    "45 seconds",
                    "Squeeze your glutes at the top."
                )

            ],

            cooldown:
                "5 minutes of lower-body stretching"

        },


        {
            day: "Day 3",
            focus: "Back & Pull",

            warmup:
                "5 minutes of shoulder and upper-back mobility",

            exercises: [

                exercise(
                    "Dumbbell Rows",
                    "3",
                    "10-12 reps",
                    restTime,
                    "Keep your back flat."
                ),

                exercise(
                    "Resistance Band Rows",
                    "3",
                    "12 reps",
                    "60 seconds",
                    "Pull toward your waist."
                ),

                exercise(
                    "Bicep Curls",
                    "3",
                    "12 reps",
                    "60 seconds",
                    "Avoid swinging the weights."
                )

            ],

            cooldown:
                "5 minutes of upper-body stretching"

        },


        {
            day: "Day 4",
            focus: "Active Recovery",

            warmup:
                "5 minutes of easy walking",

            exercises: [

                exercise(
                    "Brisk Walking",
                    "1",
                    "20 minutes",
                    "None",
                    "Maintain a comfortable pace."
                ),

                exercise(
                    "Cat-Cow Stretch",
                    "2",
                    "10 reps",
                    "30 seconds",
                    "Move slowly with your breathing."
                ),

                exercise(
                    "Hip Flexor Stretch",
                    "2",
                    "30 seconds each side",
                    "30 seconds",
                    "Keep your posture upright."
                )

            ],

            cooldown:
                "Gentle full-body stretching"

        },


        {
            day: "Day 5",
            focus: "Full Body Strength",

            warmup:
                "5 minutes of light cardio and mobility",

            exercises: [

                exercise(
                    "Goblet Squats",
                    "3",
                    "10-12 reps",
                    restTime,
                    "Keep your chest upright."
                ),

                exercise(
                    "Push-ups",
                    "3",
                    "10-12 reps",
                    restTime,
                    "Maintain a straight body line."
                ),

                exercise(
                    "Dumbbell Rows",
                    "3",
                    "10 reps",
                    "60 seconds",
                    "Control each repetition."
                ),

                exercise(
                    "Plank",
                    "3",
                    "30-45 seconds",
                    "45 seconds",
                    "Keep your core tight."
                )

            ],

            cooldown:
                "5 minutes of full-body stretching"

        },


        {
            day: "Day 6",
            focus: "Cardio & Core",

            warmup:
                "5 minutes of light cardio",

            exercises: [

                exercise(
                    "Jumping Jacks",
                    "3",
                    "30 seconds",
                    "30 seconds",
                    "Land softly."
                ),

                exercise(
                    "Mountain Climbers",
                    "3",
                    "20 reps",
                    "45 seconds",
                    "Maintain a steady rhythm."
                ),

                exercise(
                    "Bicycle Crunches",
                    "3",
                    "15 reps",
                    "45 seconds",
                    "Move with control."
                ),

                exercise(
                    "Plank",
                    "3",
                    "40 seconds",
                    "45 seconds",
                    "Maintain a neutral spine."
                )

            ],

            cooldown:
                "5 minutes of gentle stretching"

        },


        {
            day: "Day 7",
            focus: "Rest and Recovery",

            warmup:
                "None",

            exercises: [

                exercise(
                    "Total Rest",
                    "1",
                    "Full Day",
                    "None",
                    "Focus on hydration, nutrition, and good sleep."
                )

            ],

            cooldown:
                "None"

        }

    ];
}


/* =====================================================
   EXERCISE HELPER
===================================================== */

function exercise(
    name,
    sets,
    reps,
    rest,
    notes
) {

    return {
        name,
        sets,
        reps,
        rest,
        notes
    };

}


/* =====================================================
   RESULT PAGE
===================================================== */

const resultRoot =
    document.getElementById("resultRoot");


if (resultRoot) {

    const user =
        JSON.parse(
            localStorage.getItem("fitbuddyUser")
        );

    const plan =
        JSON.parse(
            localStorage.getItem("fitbuddyPlan")
        );


    if (!user || !plan) {

        window.location.href =
            "index.html";

    } else {

        renderResult(
            user,
            plan
        );

    }

}


/* =====================================================
   RENDER RESULT
===================================================== */

function renderResult(user, plan) {

    resultRoot.innerHTML = `

        <section class="result-hero">

            <div class="result-hero-content">

                <div class="result-eyebrow">
                    PERSONALIZED AI FITNESS PLAN
                </div>

                <h1>
                    Hey, ${safe(user.name)} 👋
                </h1>

                <p class="result-description">
                    Your personalized 7-day workout plan is ready.
                    Built around your fitness goal and preferred intensity.
                </p>


                <div class="hero-tags">

                    <span class="hero-tag">
                        🎯 ${safe(capitalize(user.goal))}
                    </span>

                    <span class="hero-tag">
                        ⚡ ${safe(capitalize(user.intensity))}
                    </span>

                    <span class="hero-tag">
                        ▣ 7 Days
                    </span>

                </div>

            </div>


            <div class="hero-stat-boxes">

                <div class="hero-stat">
                    <strong>${user.age}</strong>
                    <span>Age</span>
                </div>

                <div class="hero-stat">
                    <strong>${user.weight}</strong>
                    <span>kg</span>
                </div>

                <div class="hero-stat">
                    <strong>7</strong>
                    <span>Days</span>
                </div>

            </div>

        </section>


        <div class="result-layout">

            <div>

                <section class="info-card">

                    <div class="card-title-row">

                        <div class="card-icon">
                            ▣
                        </div>

                        <div>

                            <h2>
                                Plan Overview
                            </h2>

                            <div class="card-subtitle">
                                Your personalized fitness strategy
                            </div>

                        </div>

                    </div>

                    <p class="card-text">
                        ${safe(plan.overview)}
                    </p>

                </section>


                <section class="info-card safety-card">

                    <div class="card-title-row">

                        <div class="card-icon">
                            ⚠
                        </div>

                        <div>

                            <h2>
                                Safety Note
                            </h2>

                            <div class="card-subtitle">
                                Important guidance before starting
                            </div>

                        </div>

                    </div>

                    <p class="card-text">
                        ${safe(plan.safety)}
                    </p>

                </section>

            </div>


            <aside>

                <section class="info-card nutrition-card">

                    <div class="card-title-row">

                        <div class="card-icon">
                            🥗
                        </div>

                        <div>

                            <h2>
                                Nutrition & Recovery
                            </h2>

                            <div class="card-subtitle">
                                Support your workout journey
                            </div>

                        </div>

                    </div>


                    <div class="nutrition-item">

                        <div class="nutrition-item-head">

                            <div class="nutrition-icon">
                                💡
                            </div>

                            <strong>Tip</strong>

                        </div>

                        <p>
                            ${safe(plan.nutrition.tip)}
                        </p>

                    </div>


                    <div class="nutrition-item">

                        <div class="nutrition-item-head">

                            <div class="nutrition-icon">
                                💧
                            </div>

                            <strong>Hydration</strong>

                        </div>

                        <p>
                            ${safe(plan.nutrition.hydration)}
                        </p>

                    </div>


                    <div class="nutrition-item">

                        <div class="nutrition-item-head">

                            <div class="nutrition-icon">
                                😴
                            </div>

                            <strong>Recovery</strong>

                        </div>

                        <p>
                            ${safe(plan.nutrition.recovery)}
                        </p>

                    </div>

                </section>

            </aside>

        </div>


        <section class="program-section">

            <div class="program-heading">

                <div class="program-heading-left">

                    <div class="program-label">
                        YOUR PROGRAM
                    </div>

                    <h2>
                        7-Day Workout Plan
                    </h2>

                </div>

                <div class="ai-generated">
                    🤖 AI Generated
                </div>

            </div>


            <div class="workout-layout">

                <div>

                    ${renderDays(plan.days)}

                </div>


                <aside>

                    <div class="refine-card">

                        <div class="refine-heading">

                            <div class="refine-heading-icon">
                                💬
                            </div>

                            <div>

                                <h3>
                                    Refine Your Plan
                                </h3>

                                <p>
                                    Tell FitBuddy what to change
                                </p>

                            </div>

                        </div>


                        <p class="refine-description">
                            Want more cardio, another rest day,
                            or different exercises? Tell FitBuddy.
                        </p>


                        <textarea
                            id="refineInput"
                            class="refine-textarea"
                            placeholder="Example: Add more cardio exercises."
                        ></textarea>


                        <button
                            class="update-button"
                            onclick="updatePlan()"
                        >
                            Update Plan →
                        </button>


                        <div
                            id="updateMessage"
                            class="update-message"
                        >
                            Your plan has been updated.
                        </div>

                    </div>


                    <a
                        href="index.html"
                        class="new-plan-button"
                    >
                        ← Create Another Plan
                    </a>

                </aside>

            </div>

        </section>

    `;

}


/* =====================================================
   RENDER DAYS
===================================================== */

function renderDays(days) {

    return days.map(
        (day, dayIndex) => `

        <article class="day-card">

            <div class="day-header">

                <div class="day-number">
                    ${String(dayIndex + 1).padStart(2, "0")}
                </div>

                <div>

                    <h3>
                        ${safe(day.day)}
                    </h3>

                    <div class="day-focus">
                        ${safe(day.focus)}
                    </div>

                </div>

            </div>


            <div class="exercise-block">

                <div class="exercise-block-title">
                    🔥 Warm-up
                </div>

                <div class="warmup-box">
                    ${safe(day.warmup)}
                </div>

            </div>


            <div class="exercise-block">

                <div class="exercise-block-title">
                    💪 Exercises
                </div>


                ${day.exercises.map(
                    (item, index) => `

                    <div class="exercise-item">

                        <div class="exercise-number">
                            ${index + 1}
                        </div>

                        <div class="exercise-content">

                            <div class="exercise-name">
                                ${safe(item.name)}
                            </div>

                            <div class="exercise-meta">

                                <span>
                                    Sets: ${safe(item.sets)}
                                </span>

                                <span>
                                    Reps: ${safe(item.reps)}
                                </span>

                                <span>
                                    Rest: ${safe(item.rest)}
                                </span>

                            </div>

                            <div class="exercise-note">
                                ${safe(item.notes)}
                            </div>

                        </div>

                    </div>

                    `
                ).join("")}

            </div>


            <div class="exercise-block">

                <div class="exercise-block-title">
                    ❄️ Cooldown
                </div>

                <div class="cooldown-box">
                    ${safe(day.cooldown)}
                </div>

            </div>

        </article>

    `
    ).join("");

}


/* =====================================================
   REFINE PLAN
===================================================== */

function updatePlan() {

    const input =
        document.getElementById(
            "refineInput"
        );

    const message =
        document.getElementById(
            "updateMessage"
        );


    const feedback =
        input.value.trim();


    if (!feedback) {

        alert(
            "Please tell FitBuddy what you want to change."
        );

        return;
    }


    localStorage.setItem(
        "fitbuddyFeedback",
        feedback
    );


    const plan =
        JSON.parse(
            localStorage.getItem(
                "fitbuddyPlan"
            )
        );


    const lower =
        feedback.toLowerCase();


    /*
       Simple frontend refinement.
    */

    if (
        lower.includes("rest") ||
        lower.includes("recovery")
    ) {

        plan.days[6] = {

            day: "Day 7",

            focus: "Rest and Recovery",

            warmup: "None",

            exercises: [

                exercise(
                    "Total Rest",
                    "1",
                    "Full Day",
                    "None",
                    "Focus on hydration, nutrition, and good sleep."
                )

            ],

            cooldown: "None"

        };

    }


    if (
        lower.includes("cardio")
    ) {

        plan.days[5].exercises.push(

            exercise(
                "Brisk Walking",
                "1",
                "15 minutes",
                "None",
                "Maintain a comfortable but active pace."
            )

        );

    }


    if (
        lower.includes("easy") ||
        lower.includes("less intense")
    ) {

        plan.days.forEach(
            day => {

                day.exercises.forEach(
                    item => {

                        if (
                            item.sets > 1
                        ) {

                            item.sets =
                                Math.max(
                                    1,
                                    item.sets - 1
                                );

                        }

                    }
                );

            }
        );

    }


    localStorage.setItem(
        "fitbuddyPlan",
        JSON.stringify(plan)
    );


    message.style.display =
        "block";


    input.value = "";


    setTimeout(
        function () {

            location.reload();

        },
        900
    );

}


/* =====================================================
   HELPERS
===================================================== */

function capitalize(text) {

    return text
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );

}


function safe(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
