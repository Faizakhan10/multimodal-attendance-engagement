const seedStudents = [
  {id:1,name:"Aanya Sharma",roll:"01",status:"Present",score:92},
  {id:2,name:"Aarav Patel",roll:"02",status:"Present",score:84},
  {id:3,name:"Anaya Gupta",roll:"03",status:"Late",score:76},
  {id:4,name:"Arjun Mehta",roll:"04",status:"Present",score:88},
  {id:5,name:"Diya Verma",roll:"05",status:"Absent",score:61},
  {id:6,name:"Ishaan Singh",roll:"06",status:"Present",score:95},
  {id:7,name:"Kabir Khan",roll:"07",status:"Present",score:73},
  {id:8,name:"Myra Joshi",roll:"08",status:"Present",score:89},
  {id:9,name:"Reyansh Rao",roll:"09",status:"Late",score:68},
  {id:10,name:"Saanvi Jain",roll:"10",status:"Present",score:91},
  {id:11,name:"Vivaan Das",roll:"11",status:"Absent",score:58},
  {id:12,name:"Zoya Ali",roll:"12",status:"Present",score:81}
];
const STORE_KEY = "attendly-students-v1";
let students = loadStudents();
let currentView = "overview";
const $ = id => document.getElementById(id);
function loadStudents(){try{const saved=localStorage.getItem(STORE_KEY);return saved?JSON.parse(saved):seedStudents.map(s=>({...s}));}catch{return seedStudents.map(s=>({...s}));}}
function save(){localStorage.setItem(STORE_KEY,JSON.stringify(students));}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function initials(name){return name.trim().split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase();}
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove("show"),2400);}
function stats(){const total=students.length;const present=students.filter(s=>s.status==="Present").length;const absent=students.filter(s=>s.status==="Absent").length;const late=students.filter(s=>s.status==="Late").length;const avg=total?Math.round(students.reduce((n,s)=>n+Number(s.score),0)/total):0;return{total,present,absent,late,avg,rate:total?Math.round(present/total*100):0};}
function renderStats(){const s=stats();$("total-students").textContent=s.total;$("present-count").textContent=s.present;$("absent-count").textContent=s.absent;$("present-percent").textContent=s.rate+"%";$("avg-engagement").textContent=s.avg;$("donut-rate").textContent=s.rate+"%";$("engagement-big").textContent=s.avg;$("legend-present").textContent=s.present;$("legend-absent").textContent=s.absent;$("legend-late").textContent=s.late;const presentDeg=s.total?s.present/s.total*100:0;const absentDeg=s.total?(s.present+s.absent)/s.total*100:presentDeg;$("donut").style.background=`conic-gradient(var(--purple) 0 ${presentDeg}%, #f2a2a4 ${presentDeg}% ${absentDeg}%, #f6c77d ${absentDeg}% 100%)`;
const bars=$("engagement-bars").querySelectorAll(".bar");const avg=s.avg;[avg,Math.max(0,avg-8),Math.min(100,avg+6),Math.max(0,avg-14),Math.min(100,avg-2)].forEach((v,i)=>{if(bars[i])bars[i].style.height=v+"%";});}
function renderTable(){const q=$("search-students").value.trim().toLowerCase();let list=students.filter(s=>`${s.name} ${s.roll} ${s.status}`.toLowerCase().includes(q));if(currentView==="attendance")list=list.sort((a,b)=>a.status.localeCompare(b.status));if(currentView==="engagement")list=list.sort((a,b)=>b.score-a.score);$("student-table").innerHTML=list.length?list.map(s=>`<tr>
<td><div class="student-cell"><span class="student-avatar ${s.score<70?"orange":Number(s.id)%2===0?"alt":""}">${escapeHtml(initials(s.name))}</span>${escapeHtml(s.name)}</div></td>
<td>#${escapeHtml(s.roll)}</td>
<td><div class="score-cell"><span class="score-line"><span style="width:${s.status==="Present"?100:s.status==="Late"?65:0}%;background:${s.status==="Present"?"var(--green)":s.status==="Late"?"var(--orange)":"#e77b83"}"></span></span>${s.status==="Present"?"100%":s.status==="Late"?"65%":"0%"}</div></td>
<td><div class="score-cell"><span class="score-line"><span style="width:${Number(s.score)}%"></span></span><strong>${Number(s.score)}</strong></div></td>
<td><span class="status ${s.status.toLowerCase()}">${escapeHtml(s.status)}</span></td>
<td><button class="row-actions" data-edit="${s.id}" aria-label="Edit ${escapeHtml(s.name)}" title="Edit student">⋯</button></td>
</tr>`).join(""):`<tr><td colspan="6"><div class="empty-state">No students found. Try another search or add a student.</div></td></tr>`;$("table-count").textContent=`Showing ${list.length} of ${students.length} students`;}
function render(){renderStats();renderTable();}
function openDialog(student=null){$("student-form").reset();$("form-error").textContent="";$("student-id").value=student?student.id:"";$("dialog-title").textContent=student?"Edit student":"Add student";$("student-name").value=student?student.name:"";$("student-roll").value=student?student.roll:"";$("student-score").value=student?student.score:80;$("student-status").value=student?student.status:"Present";$("student-dialog").showModal();}
function closeDialog(){$("student-dialog").close();}
$("student-form").addEventListener("submit",e=>{e.preventDefault();const id=$("student-id").value;const name=$("student-name").value.trim();const roll=$("student-roll").value.trim();const score=Number($("student-score").value);if(!name||!roll){$("form-error").textContent="Please enter a name and roll number.";return;}if(students.some(s=>s.roll.toLowerCase()===roll.toLowerCase()&&String(s.id)!==id)){$("form-error").textContent="That roll number already exists.";return;}const record={id:id?Number(id):Date.now(),name,roll,status:$("student-status").value,score};if(id){students=students.map(s=>s.id===Number(id)?record:s);showToast("Student record updated.");}else{students.push(record);showToast("Student added successfully.");}save();render();closeDialog();});
$("quick-add").addEventListener("click",()=>openDialog());$("close-dialog").addEventListener("click",closeDialog);$("cancel-dialog").addEventListener("click",closeDialog);$("search-students").addEventListener("input",renderTable);
$("student-table").addEventListener("click",e=>{const b=e.target.closest("[data-edit]");if(!b)return;const student=students.find(s=>s.id===Number(b.dataset.edit));if(student)openDialog(student);});
$("export-csv").addEventListener("click",()=>{const rows=[["Name","Roll Number","Attendance Status","Engagement Score"],...students.map(s=>[s.name,s.roll,s.status,s.score])];const csv=rows.map(row=>row.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\r\n");const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));const a=document.createElement("a");a.href=url;a.download="attendly-student-report.csv";a.click();URL.revokeObjectURL(url);showToast("CSV report exported.");});
document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>{currentView=b.dataset.view;document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n===b));const titles={overview:"Overview",students:"Students",attendance:"Attendance",engagement:"Engagement"};$("page-title").textContent=titles[currentView];$("table-title").textContent={overview:"Student overview",students:"Student records",attendance:"Attendance register",engagement:"Engagement scores"}[currentView];$("student-panel").scrollIntoView({behavior:"smooth",block:"start"});renderTable();}));
$("today-label").textContent=new Intl.DateTimeFormat("en-IN",{day:"numeric",month:"short",year:"numeric"}).format(new Date());
render();
