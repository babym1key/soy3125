// 메인 페이지: 시기별 회복 체크리스트
// 체크한 항목은 이 브라우저에 저장되어, 다시 열어도 남아 있습니다.

function initChecklist() {
  var tabs = document.getElementById("period-tabs");
  var list = document.getElementById("check-list");
  var intro = document.getElementById("period-intro");
  var bar = document.getElementById("progress-bar");
  var text = document.getElementById("progress-text");
  var current = store.get("period") || CHECKLIST[0].id;

  tabs.innerHTML = CHECKLIST.map(function (p) {
    return '<button class="tab" role="tab" data-period="' + p.id + '">' + p.label + "</button>";
  }).join("");

  function findPeriod(id) {
    for (var i = 0; i < CHECKLIST.length; i++) if (CHECKLIST[i].id === id) return CHECKLIST[i];
    return CHECKLIST[0];
  }

  function updateProgress() {
    var boxes = list.querySelectorAll("input[type=checkbox]");
    var done = 0;
    for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++;
    bar.style.width = (boxes.length ? Math.round(done / boxes.length * 100) : 0) + "%";
    text.textContent = done + " / " + boxes.length + " 완료";
  }

  function show(id) {
    var period = findPeriod(id);
    current = period.id;
    store.set("period", current);
    intro.textContent = period.intro;

    list.innerHTML = period.items.map(function (it) {
      var checked = store.get("check-" + it.id) === "1";
      var more = it.link ? ' <a href="' + it.link + '">자세히 보기 →</a>' : "";
      return '<li class="check-item' + (checked ? " done" : "") + '">' +
        '<input type="checkbox" id="c-' + it.id + '" data-id="' + it.id + '"' + (checked ? " checked" : "") + ">" +
        '<div><label for="c-' + it.id + '">' + safeText(it.title) + "</label>" +
        '<p class="desc">' + safeText(it.desc) + more + "</p></div></li>";
    }).join("");

    var buttons = tabs.querySelectorAll(".tab");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-selected", buttons[i].getAttribute("data-period") === current ? "true" : "false");
    }
    updateProgress();
  }

  tabs.addEventListener("click", function (e) {
    var b = e.target.closest(".tab");
    if (b) show(b.getAttribute("data-period"));
  });

  list.addEventListener("change", function (e) {
    var box = e.target;
    if (box.type !== "checkbox") return;
    store.set("check-" + box.getAttribute("data-id"), box.checked ? "1" : "0");
    box.closest(".check-item").classList.toggle("done", box.checked);
    updateProgress();
  });

  show(current);
}
