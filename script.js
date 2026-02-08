const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const card = document.getElementById("main-card");
const celebration = document.getElementById("celebration");
const restartBtn = document.getElementById("restartBtn");

let mouse = {x:0,y:0};
document.addEventListener("mousemove", e=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});


// ❤️ YES CLICK
yesBtn.onclick = ()=>{
    card.style.transform="translate(-50%,-60%) scale(.7)";
    card.style.opacity="0";
    celebration.classList.add("show");
    confettiExplosion();
};


// 🏃‍♂️ SUPER DRAMATIC NO BUTTON AI
let velocity = {x:0,y:0};
function animateNoButton(){
    const rect = noBtn.getBoundingClientRect();

    const dx = rect.left + rect.width/2 - mouse.x;
    const dy = rect.top + rect.height/2 - mouse.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < 220){
        velocity.x += dx/dist * 2.5;
        velocity.y += dy/dist * 2.5;

        // squish stretch animation 😄
        noBtn.style.transform = "scale(1.2,.8)";
        setTimeout(()=>noBtn.style.transform="scale(1)",100);
    }

    velocity.x *= .92;
    velocity.y *= .92;

    noBtn.style.left = (noBtn.offsetLeft + velocity.x) + "px";
    noBtn.style.top = (noBtn.offsetTop + velocity.y) + "px";

    requestAnimationFrame(animateNoButton);
}
animateNoButton();


// 😈 TAUNT TEXT
const taunts=["No","Are you sure?","Really?","Think again","Don't do it"];
setInterval(()=>{
    noBtn.textContent = taunts[Math.floor(Math.random()*taunts.length)];
},2000);


// 💀 IF NO IS CLICKED = YES APOCALYPSE
noBtn.onclick = ()=>{
    for(let i=0;i<120;i++){
        spawnYes();
    }
};

function spawnYes(){
    const b=document.createElement("button");
    b.innerText="YES ❤️";
    b.className="yes-btn";
    b.style.position="absolute";
    b.style.left=Math.random()*window.innerWidth+"px";
    b.style.top=Math.random()*window.innerHeight+"px";
    b.onclick=()=>yesBtn.click();
    document.body.appendChild(b);
}


// 🎉 CONFETTI
function confettiExplosion(){
    for(let i=0;i<120;i++){
        const c=document.createElement("div");
        c.style.position="absolute";
        c.style.left="50%";
        c.style.top="50%";
        c.style.width="8px";
        c.style.height="8px";
        c.style.background=`hsl(${Math.random()*360},100%,60%)`;
        c.style.borderRadius="50%";
        document.body.appendChild(c);

        const angle=Math.random()*2*Math.PI;
        const dist= Math.random()*600;

        c.animate([
            {transform:"translate(-50%,-50%)"},
            {transform:`translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px)`}
        ],{duration:1400, easing:"cubic-bezier(.2,.8,.2,1)"});
    }
}

restartBtn.onclick=()=>location.reload();

