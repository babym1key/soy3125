// 나에게 맞는 지원 찾기: 한 화면에 질문 하나씩, 예/아니요로 답하기

function initFinder() {
  var box = document.getElementById("finder");
  var results = document.getElementById("finder-results");
  var step = 0;
  var answers = {};

  function renderQuestion() {
    var q = FINDER_QUESTIONS[step];
    var percent = Math.round((step + 1) / FINDER_QUESTIONS.length * 100);
    box.innerHTML =
      '<div class="card">' +
        '<p class="q-step">질문 ' + (step + 1) + " / " + FINDER_QUESTIONS.length + "</p>" +
        '<div class="progress-bar"><span style="width:' + percent + '%;background:var(--blue)"></span></div>' +
        '<p class="q-text">' + safeText(q.text) + "</p>" +
        (q.help ? '<p class="q-help">' + safeText(q.help) + "</p>" : '<p class="q-help"></p>') +
        '<div class="yn"><button class="yes" data-answer="yes">예</button><button data-answer="no">아니요</button></div>' +
        '<div class="finder-nav">' +
          (step > 0 ? '<button class="btn gray" id="prev">← 이전 질문</button>' : "<span></span>") +
          '<button class="btn gray" id="restart">처음부터</button>' +
        "</div>" +
      "</div>";
    results.innerHTML = "";
  }

  function renderResults() {
    var tags = ["all"];
    FINDER_QUESTIONS.forEach(function (q) { if (answers[q.tag]) tags.push(q.tag); });
    var matched = SUPPORT.filter(function (s) {
      return s.tags.some(function (t) { return tags.indexOf(t) > -1; });
    });
    var yesList = FINDER_QUESTIONS.filter(function (q) { return answers[q.tag]; })
      .map(function (q) { return "<li>" + safeText(q.text) + " → 예</li>"; }).join("");

    box.innerHTML =
      '<div class="card">' +
        '<p class="q-step">결과</p>' +
        '<p class="q-text">받을 수 있는 지원이 ' + matched.length + "개 있어요</p>" +
        '<p class="q-help">아래 내용을 인쇄해서 시·군청이나 행정복지센터에 가져가 보세요.</p>' +
        (yesList ? "<ul>" + yesList + "</ul>" : "<p>해당하는 항목이 없어 모든 주민 대상 지원만 보여 드려요.</p>") +
        '<div class="finder-nav no-print">' +
          '<button class="btn" id="print-results">🖨 결과 인쇄하기</button>' +
          '<button class="btn gray" id="restart">처음부터 다시</button>' +
        "</div>" +
      "</div>";
    results.innerHTML = matched.map(supportCard).join("");
  }

  box.addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (!t) return;
    if (t.hasAttribute("data-answer")) {
      answers[FINDER_QUESTIONS[step].tag] = t.getAttribute("data-answer") === "yes";
      step++;
      if (step < FINDER_QUESTIONS.length) renderQuestion(); else renderResults();
      box.scrollIntoView({ block: "start" });
    } else if (t.id === "prev") {
      step--; renderQuestion();
    } else if (t.id === "restart") {
      step = 0; answers = {}; renderQuestion();
    } else if (t.id === "print-results") {
      window.print();
    }
  });

  renderQuestion();
}
