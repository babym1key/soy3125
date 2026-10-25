// 모든 페이지 공통: 머리말, 메뉴, 글씨 크기, 인쇄, 꼬리말
// 각 페이지의 <body data-page="..."> 값으로 화면 모양과 현재 메뉴를 정합니다.
//   landing  : 첫 화면 (슬로건 + 두 갈래 상자만)
//   together : '따뜻한 손길 내밀기' (이재민 메뉴 없이 따로)
//   그 밖     : 이재민 안내 페이지 (위쪽 메뉴 + 휴대폰 하단 메뉴)

// 이재민 안내 메뉴
var MENU = [
  { id: "home", href: "home.html", ico: "✅", label: "할 일 확인" },
  { id: "find", href: "find.html", ico: "🔍", label: "지원 찾기" },
  { id: "support", href: "support.html", ico: "📄", label: "지원 제도" },
  { id: "mind", href: "mind.html", ico: "💚", label: "마음 회복" },
  { id: "contact", href: "contact.html", ico: "🏢", label: "지원 창구" },
  { id: "faq", href: "faq.html", ico: "❓", label: "자주 묻는 질문" }
];

// 휴대폰 하단 메뉴에 바로 보이는 4개 (나머지는 '전체 메뉴')
var BOTTOM_MENU = ["home", "find", "support", "contact"];

// 브라우저 저장소 (사생활 보호 모드 등에서 막혀 있어도 사이트는 정상 동작)
var store = {
  get: function (key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  },
  set: function (key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* 저장 안 돼도 무시 */ }
  }
};

// 글자에 섞인 HTML을 안전하게 바꾸고, [확인 필요]는 형광펜으로 표시
function safeText(text) {
  var s = String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return s.replace(/\[확인 필요\]/g, '<mark class="need">[확인 필요]</mark>');
}

// 출처 한 줄
function metaLine(source) {
  return source ? '<p class="meta">출처: ' + safeText(source) + "</p>" : "";
}

function applyFontSize(size) {
  var root = document.documentElement;
  root.classList.remove("fs-small", "fs-large");
  if (size === "small") root.classList.add("fs-small");
  if (size === "large") root.classList.add("fs-large");
  var buttons = document.querySelectorAll("[data-fs]");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute("aria-pressed", buttons[i].getAttribute("data-fs") === size ? "true" : "false");
  }
  store.set("fontSize", size);
}

// 화면 그리기 전에 저장된 글씨 크기부터 적용 (깜빡임 방지)
applyFontSize(store.get("fontSize") || "normal");

function buildLayout() {
  var page = document.body.getAttribute("data-page");
  var current = function (id) { return id === page ? ' aria-current="page"' : ""; };

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="wrap">' +
      (page === "together"
        ? '<a class="logo" href="index.html" aria-label="다시 피어나는 강원, 처음 화면으로">' +
            '<img class="logo-emblem" src="img/emblem.svg" alt="">' +
            '<span class="logo-brand"><span class="lb-1">다시 피어나는</span><span class="lb-2">강원</span></span></a>'
        : '<a class="logo" href="index.html"><span class="logo-mark" aria-hidden="true">🌱</span>산불 이후 회복 안내</a>') +
      '<div class="tools" role="group" aria-label="화면 도구">' +
        '<span class="label">글씨</span>' +
        '<button class="tool-btn" data-fs="small">작게</button>' +
        '<button class="tool-btn" data-fs="normal">보통</button>' +
        '<button class="tool-btn" data-fs="large">크게</button>' +
        '<button class="tool-btn" id="print-btn">🖨 인쇄</button>' +
      "</div>" +
    "</div>";

  var navItems = MENU.map(function (m) {
    return '<li><a href="' + m.href + '"' + current(m.id) + '><span class="ico" aria-hidden="true">' +
      m.ico + "</span>" + m.label + "</a></li>";
  }).join("");
  var nav = document.createElement("nav");
  nav.className = "main-nav";
  nav.setAttribute("aria-label", "주 메뉴");
  nav.innerHTML = "<ul>" + navItems + "</ul>";

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="footer-notice"><div class="wrap"><span aria-hidden="true">⚠️</span>' +
      "정확한 내용은 관할 시·군청에 확인하세요</div></div>" +
    '<div class="footer-info"><div class="wrap">' +
      "불이 꺼진 후, 다시 피어나는 강원 · 강원대학교와 함께하는 회복 (아이디어 공모전 시제품)" +
    "</div></div>";

  // 첫 화면: 머리말·메뉴 없이 꼬리말만
  if (page === "landing") {
    document.body.appendChild(footer);
    return;
  }

  // 따뜻한 손길 내밀기: 이재민 메뉴 대신 '처음 화면으로' 한 줄
  if (page === "together") {
    var back = document.createElement("div");
    back.className = "back-bar";
    back.innerHTML = '<div class="wrap"><a href="index.html">← 처음 화면으로</a>' +
      '<a href="home.html">산불 이재민 안내 보기 →</a></div>';
    document.body.insertBefore(back, document.body.firstChild);
    document.body.insertBefore(header, document.body.firstChild);
    document.body.appendChild(footer);
    bindTools();
    return;
  }

  var bottomItems = MENU.filter(function (m) { return BOTTOM_MENU.indexOf(m.id) > -1; }).map(function (m) {
    return '<a href="' + m.href + '"' + current(m.id) + '><span class="ico" aria-hidden="true">' +
      m.ico + "</span>" + m.label + "</a>";
  }).join("");
  var bottom = document.createElement("nav");
  bottom.className = "bottom-nav";
  bottom.setAttribute("aria-label", "아래 메뉴");
  bottom.innerHTML = bottomItems +
    '<button id="open-menu"' + (BOTTOM_MENU.indexOf(page) > -1 ? "" : ' aria-current="page"') +
    '><span class="ico" aria-hidden="true">☰</span>전체 메뉴</button>';

  var sheet = document.createElement("div");
  sheet.className = "menu-sheet";
  sheet.innerHTML =
    '<div class="sheet" role="dialog" aria-label="전체 메뉴">' +
      "<h2>전체 메뉴</h2>" +
      '<div class="sheet-grid">' +
        MENU.map(function (m) {
          return '<a href="' + m.href + '"' + current(m.id) + '><span aria-hidden="true">' + m.ico + "</span>" + m.label + "</a>";
        }).join("") +
      "</div>" +
      '<button class="close" id="close-menu">닫기</button>' +
    "</div>";

  document.body.insertBefore(nav, document.body.firstChild);
  document.body.insertBefore(header, document.body.firstChild);
  document.body.appendChild(footer);
  document.body.appendChild(bottom);
  document.body.appendChild(sheet);

  bindTools();
  document.getElementById("open-menu").addEventListener("click", function () { sheet.classList.add("open"); });
  document.getElementById("close-menu").addEventListener("click", function () { sheet.classList.remove("open"); });
  sheet.addEventListener("click", function (e) { if (e.target === sheet) sheet.classList.remove("open"); });
}

// 글씨 크기·인쇄 버튼 연결
function bindTools() {
  applyFontSize(store.get("fontSize") || "normal");
  var fsButtons = document.querySelectorAll("[data-fs]");
  for (var i = 0; i < fsButtons.length; i++) {
    fsButtons[i].addEventListener("click", function () {
      applyFontSize(this.getAttribute("data-fs"));
    });
  }
  document.getElementById("print-btn").addEventListener("click", function () { window.print(); });
}

document.addEventListener("DOMContentLoaded", buildLayout);
