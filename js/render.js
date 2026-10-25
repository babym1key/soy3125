// data 폴더의 내용을 카드로 그려 주는 함수들

function categoryLabel(id) {
  for (var i = 0; i < SUPPORT_CATEGORIES.length; i++) {
    if (SUPPORT_CATEGORIES[i].id === id) return SUPPORT_CATEGORIES[i].label;
  }
  return "";
}

// 지원 제도 카드 한 장
function supportCard(item) {
  var docs = (item.documents || []).map(function (d) { return "<li>" + safeText(d) + "</li>"; }).join("");
  return '<article class="card">' +
    '<span class="badge">' + safeText(categoryLabel(item.category)) + "</span>" +
    "<h3>" + safeText(item.name) + "</h3>" +
    "<p>" + safeText(item.summary) + "</p>" +
    '<table class="info-table">' +
      "<tr><th>대상</th><td>" + safeText(item.target) + "</td></tr>" +
      "<tr><th>지원 내용</th><td>" + safeText(item.amount) + "</td></tr>" +
      "<tr><th>신청 장소</th><td>" + safeText(item.place) + "</td></tr>" +
      "<tr><th>필요 서류</th><td><ul>" + docs + "</ul></td></tr>" +
      "<tr><th>문의 전화</th><td><span class=\"phone-big\">" + safeText(item.phone) + "</span><br>" +
        safeText(item.phoneName) + "</td></tr>" +
    "</table>" +
    metaLine(item.source) +
  "</article>";
}

// 기관 카드의 한 칸 (제목은 위, 내용은 아래). 내용이 없으면 빈 칸으로 자리만 지킴
function placeRow(label, value) {
  if (!value) return '<div class="pc-row pc-empty"></div>';
  return '<div class="pc-row"><span class="pc-label">' + label + "</span>" + value + "</div>";
}

// 기관(창구, 상담 기관) 카드 한 장. featured면 테두리 강조
// 항상 6줄(이름, 하는 일, 전화, 운영, 위치, 출처)이라 .place-grid 안에서 옆 카드와 줄이 맞음
function placeCard(item, featured) {
  var isNumber = /^[\d-]+$/.test(item.phone);
  var phone = isNumber ? '<span class="phone-big">' + safeText(item.phone) + "</span>" : safeText(item.phone);
  return '<article class="card place-card' + (featured ? " featured" : "") + '">' +
    "<h3>" + safeText(item.name) + "</h3>" +
    placeRow("하는 일", safeText(item.role)) +
    placeRow("전화", phone) +
    placeRow("운영", safeText(item.hours || "")) +
    placeRow("위치", safeText(item.place || "")) +
    (metaLine(item.source) || '<p class="meta"></p>') +
  "</article>";
}

// 자주 묻는 질문 한 개
function faqItem(item) {
  return '<details class="faq"><summary>' + safeText(item.q) + "</summary>" +
    '<div class="answer"><p>' + safeText(item.a) + "</p>" +
    metaLine(item.source) + "</div></details>";
}

// 지원 제도 페이지: 분야 버튼으로 걸러 보기 (support.html#housing 처럼 바로 열기 가능)
function initSupportPage() {
  var tabs = document.getElementById("support-tabs");
  var list = document.getElementById("support-list");
  var all = [{ id: "all", label: "전체" }].concat(SUPPORT_CATEGORIES);

  tabs.innerHTML = all.map(function (c) {
    return '<button class="tab" role="tab" data-cat="' + c.id + '">' + c.label + "</button>";
  }).join("");

  function show(cat) {
    var items = SUPPORT.filter(function (s) { return cat === "all" || s.category === cat; });
    list.innerHTML = items.map(supportCard).join("");
    var buttons = tabs.querySelectorAll(".tab");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-selected", buttons[i].getAttribute("data-cat") === cat ? "true" : "false");
    }
  }

  tabs.addEventListener("click", function (e) {
    var b = e.target.closest(".tab");
    if (!b) return;
    var cat = b.getAttribute("data-cat");
    show(cat);
    history.replaceState(null, "", cat === "all" ? location.pathname : "#" + cat);
  });

  var start = location.hash.replace("#", "");
  show(categoryLabel(start) ? start : "all");
}
