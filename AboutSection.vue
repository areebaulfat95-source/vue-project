<template>

<div class="about-container">

    <!-- Left -->

    <div class="about-content">

        <span class="tag">
            AI Powered
        </span>

        <h1>
            Sign Language Translation System
        </h1>

        <p>
            This AI-powered web application helps translate sign language
            gestures into readable text using computer vision and machine
            learning. It improves communication between deaf or mute
            individuals and people who do not understand sign language.
        </p>

        <div class="features">

            <div class="feature">
                <i class="bi bi-camera-video"></i>
                <span>Live Camera Detection</span>
            </div>

            <div class="feature">
                <i class="bi bi-cpu"></i>
                <span>AI Gesture Recognition</span>
            </div>

            <div class="feature">
                <i class="bi bi-chat-dots"></i>
                <span>Real-time Translation</span>
            </div>

            <div class="feature">
                <i class="bi bi-clock-history"></i>
                <span>Translation History</span>
            </div>

        </div>

    </div>

    <!-- Right -->

    <div class="about-card">

        <h3>Project Details</h3>

        <div class="detail">
            <span>Project Type</span>
            <strong>Final Semester Project</strong>
        </div>

        <div class="detail">
            <span>Framework</span>
            <strong>Vue 3</strong>
        </div>

        <div class="detail">
            <span>Frontend</span>
            <strong>HTML • CSS • JavaScript</strong>
        </div>

        <div class="detail">
            <span>Backend</span>
            <strong>Python / Flask (Future)</strong>
        </div>

        <div class="detail">
            <span>AI Model</span>
            <strong>MediaPipe + TensorFlow</strong>
        </div>

    </div>

</div>

</template>

<style scoped>

.about-container{

display:grid;
grid-template-columns:2fr 1fr;
gap:30px;

}

.about-content,
.about-card{

background:#fff;
padding:35px;
border-radius:20px;
box-shadow:0 10px 30px rgba(0,0,0,.08);

}

.tag{

background:#2563eb;
color:white;
padding:8px 18px;
border-radius:30px;
font-size:14px;

}

h1{

margin:20px 0;
font-size:42px;
font-weight:700;

}

p{

color:#6b7280;
line-height:1.8;

}

.features{

margin-top:30px;
display:grid;
grid-template-columns:repeat(2,1fr);
gap:20px;

}

.feature{

display:flex;
align-items:center;
gap:15px;
padding:18px;
background:#f8fafc;
border-radius:12px;

}

.feature i{

font-size:25px;
color:#2563eb;

}

.about-card h3{
  margin-bottom:25px;
}

.detail{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:16px 0;
  border-bottom:1px solid #eee;
}

.detail:last-child{
  border-bottom:none;
}

.detail span{
  color:#6b7280;
}

.detail strong{
  color:#111827;
  font-weight:700;
}

@media(max-width:992px){
  .about-container{
    grid-template-columns:1fr;
  }

  .features{
    grid-template-columns:1fr;
  }
}

</style>