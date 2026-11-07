const tracks = [
  {title:"Midnight City",artist:"M83",album:"Hurry Up, We're Dreaming",src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",cover:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=85"},
  {title:"Dreams",artist:"The Midnight",album:"Endless Summer",src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",cover:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=85"},
  {title:"Night Drive",artist:"Chromatics",album:"Night Drive",src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",cover:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85"}
];
const audio=document.querySelector("#audio"),playBtn=document.querySelector("#play"),progress=document.querySelector("#progress"),volume=document.querySelector("#volume"),playlist=document.querySelector("#playlist"),titleEl=document.querySelector("#title"),artistEl=document.querySelector("#artist"),cover=document.querySelector("#cover"),currentTimeEl=document.querySelector("#currentTime"),durationEl=document.querySelector("#duration"),visualizer=document.querySelector(".visualizer");
let current=0,isPlaying=false,shuffle=false,repeat=false;
const fmt=s=>{if(!Number.isFinite(s))return "0:00";const m=Math.floor(s/60),sec=Math.floor(s%60);return `${m}:${String(sec).padStart(2,"0")}`};
function renderPlaylist(){playlist.innerHTML="";tracks.forEach((t,i)=>{const row=document.createElement("div");row.className="track"+(i===current?" active":"");row.innerHTML=`<span class="track-number">${i===current&&isPlaying?"♫":String(i+1).padStart(2,"0")}</span><img class="track-art" src="${t.cover}" alt=""><span class="track-text"><strong>${t.title}</strong><small>${t.artist}</small></span><span class="track-duration">${i===current?fmt(audio.duration):"MP3"}</span>`;row.addEventListener("click",()=>loadTrack(i,true));playlist.appendChild(row)})}
function loadTrack(index,autoplay=false){current=(index+tracks.length)%tracks.length;const t=tracks[current];audio.src=t.src;titleEl.textContent=t.title;artistEl.textContent=`${t.artist} · ${t.album}`;cover.src=t.cover;progress.value=0;currentTimeEl.textContent="0:00";durationEl.textContent="0:00";renderPlaylist();if(autoplay)playAudio();else pauseAudio()}
function playAudio(){audio.play().then(()=>{isPlaying=true;playBtn.textContent="Ⅱ";playBtn.title="Pause";visualizer.classList.add("playing");renderPlaylist()}).catch(()=>{isPlaying=false;playBtn.textContent="▶";alert("Audio could not start. Check your internet connection and try again.")})}
function pauseAudio(){audio.pause();isPlaying=false;playBtn.textContent="▶";playBtn.title="Play";visualizer.classList.remove("playing");renderPlaylist()}
playBtn.addEventListener("click",()=>isPlaying?pauseAudio():playAudio());
document.querySelector("#next").addEventListener("click",()=>loadTrack(shuffle?Math.floor(Math.random()*tracks.length):current+1,true));
document.querySelector("#prev").addEventListener("click",()=>{if(audio.currentTime>3)audio.currentTime=0;else loadTrack(current-1,true)});
document.querySelector("#shuffle").addEventListener("click",e=>{shuffle=!shuffle;e.currentTarget.classList.toggle("active",shuffle)});
document.querySelector("#repeat").addEventListener("click",e=>{repeat=!repeat;e.currentTarget.classList.toggle("active",repeat);audio.loop=repeat});
audio.addEventListener("loadedmetadata",()=>durationEl.textContent=fmt(audio.duration));
audio.addEventListener("timeupdate",()=>{if(audio.duration){progress.value=audio.currentTime/audio.duration*100;currentTimeEl.textContent=fmt(audio.currentTime)}});
progress.addEventListener("input",()=>{if(audio.duration)audio.currentTime=progress.value/100*audio.duration});
volume.addEventListener("input",()=>audio.volume=volume.value);
audio.addEventListener("ended",()=>{if(!repeat)loadTrack(shuffle?Math.floor(Math.random()*tracks.length):current+1,true)});
audio.volume=volume.value;document.querySelector("#trackCount").textContent=`${tracks.length} TRACKS`;loadTrack(0);
